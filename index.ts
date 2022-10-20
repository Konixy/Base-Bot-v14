// Crée par Niridya et modifié par Konixy (pour l'adapter en TypeScript)
import {
  Collection,
  ActivityType,
} from "discord.js";
import fs from "fs";
import colors from "colors";
import config from "./config.js";
import shadow from "./shadow";
import CreateClient from "./Client";
import { Command } from "./Types.js";

const Client = new CreateClient({
  config,
  token: shadow.token,
  status: {
    name: `choisis ton statut.`,
    type: ActivityType.Streaming,
    url: "https://www.twitch.tv/niridya",
  },
});
Client.init();
const client = Client.client;

// chargement des events
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js") || file.endsWith('.ts'));
// console.log(eventFiles)
for (const file of eventFiles) {
  const event = require(`./events/${file}`).default;
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(client, Client, ...args));
  } else {
    client.on(event.name, (...args: any) => event.execute(client, Client, ...args));
  }
}

// chargement des commandes
Client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js") || file.endsWith('.ts'));
// console.log(commandFiles)
for (const file of commandFiles) {
  const command: Command = require(`./commands/${file}`).default;
  Client.commands.set(command.name, command);
}

// gestion des erreurs
process.on("unhandledRejection", (error: NodeJS.ErrnoException) => {
  if (Number(error.code) == 10062) return; // Unknown interaction
  console.log(colors.red(`[ERROR] ${error}`));
});
