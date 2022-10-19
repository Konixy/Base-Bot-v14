// ce fichier n'a pas besoin d'être convertis en TypeScript
import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import fs from 'fs';

import shadow from "./shadow.js";
const guildId = "id de serveur pour les commandes de serveur";
const clientId = "id du bot";

const commands = [];
const commandFiles = fs.readdirSync(`${process.cwd()}/commands`).filter(file => file.endsWith(".js") || file.endsWith('.ts'));
commandFiles.forEach(async commandFile => {
    const command = require(`${process.cwd()}/commands`);
    console.log(command)
    if (command.data && !command.botOwnerOnly) commands.push(command.data.toJSON());
});

const rest = new REST({ version: '10' }).setToken(shadow.token);

rest.put(
    // Routes.applicationGuildCommands(clientId, guildId), { body: commands } // Guild commands
    Routes.applicationCommands(clientId), { body: commands } // Global commands
    )
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);