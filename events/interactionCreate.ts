import { colors } from "colors.ts";
import { InteractionType, Client, Interaction } from "discord.js";
import { Config, ClientType } from "../Types";

export default {
    name: "interactionCreate",
    async execute(client: Client, Client: ClientType, interaction: Interaction) {
        if (!interaction.guild) return;

        if (interaction.type == InteractionType.ApplicationCommand) {
            const command = Client.commands.get(interaction.commandName);
            if (!command) return;

            // check permissions
            if (command.permissions) {
                if (command.botOwnerOnly) {
                    if (!Client.config.owners.includes(interaction.user.id)) return interaction.reply({ content: `:x: **Vous devez être le propriétaire du bot pour exécuter cette commande.**`, ephemeral: true }).catch(() => {});
                }

                if (command.guildOwnerOnly) {
                    if (interaction.guild.ownerId != interaction.user.id && !Client.config.owners.includes(interaction.user.id)) return interaction.reply({ content: `:x: **Vous devez être le propriétaire du serveur pour exécuter cette commande.**`, ephemeral: true }).catch(() => {});
                }

                const authorPerms = interaction.guild.channels.cache.get(interaction.channelId).permissionsFor(interaction.user);
                if ((!authorPerms || !authorPerms.has(command.permissions)) && !Client.config.owners.includes(interaction.user.id)) return interaction.reply({ content: `:x: **Vous n'avez pas les permissions nécessaires pour exécuter cette commande.**`, ephemeral: true }).catch(() => {});
            }

            command.executeSlash(client, Client, interaction);
            console.log(colors("brightBlue", `[CMD-S]`) + ` ${interaction.guild.name} | ${interaction.channel.name} | ${interaction.user.tag} | ${command.name}`);
        }
    }
}