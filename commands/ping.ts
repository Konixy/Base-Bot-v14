import { SlashCommandBuilder, PermissionsBitField } from "discord.js";
import { Command } from "../Types";

const command: Command = {
  name: "ping",
  description: "Afficher le ping du bot.",
  aliases: [],
  permissions: [PermissionsBitField.Flags.ViewChannel],
  guildOwnerOnly: false,
  botOwnerOnly: false,
  async execute(client, Client, message, args) {
    message
      .reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms.`)
      .catch(() => {});
  },
  async executeSlash(client, Client, interaction) {
    interaction
      .reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms.`)
      .catch(() => {});
  },
  get data(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  },
};

export default command;