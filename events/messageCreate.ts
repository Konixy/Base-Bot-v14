import { Client, Message } from "discord.js";
import { ClientType } from "../Types";
import {colors} from "colors.ts";

export default {
    name: "messageCreate",
    async execute(client: Client, Client: ClientType, message: Message) {
        if (message.channel.isDMBased() || message.author.bot) return;
        if (!message.content.startsWith(Client.config.prefix)) return;

        // ANALYSEUR DE COMMANDES
        const args = message.content.slice(Client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // check commande
        const command = Client.commands.get(commandName) || Client.commands.find(command => command.aliases && command.aliases.includes(commandName));
        if (!command) return;

        // check permissions
        if (command.permissions) {
            if (command.botOwnerOnly) {
                if (!Client.config.owners.includes(message.author.id)) return;
            }

            if (command.guildOwnerOnly) {
                if (message.guild.ownerId != message.author.id && !Client.config.owners.includes(message.author.id)) return message.reply("Vous devez être le propriétaire du serveur pour exécuter cette commande.").catch(() => {});
            }

            const authorPerms = message.channel.permissionsFor(message.author);
            if ((!authorPerms || !authorPerms.has(command.permissions)) && !Client.config.owners.includes(message.author.id)) return message.reply("Vous n'avez pas les permissions nécessaires pour exécuter cette commande.").catch(() => {});
        }

        command.execute(client, Client, message, args);
        console.log(colors("brightBlue", `[CMD]`) + ` ${message.guild.name} | ${message.channel.name} | ${message.author.tag} | ${command.name}`);
    }
}