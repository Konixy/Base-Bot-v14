import { ActivitiesOptions, Client, Collection, CommandInteraction, Message, PermissionResolvable, SlashCommandBuilder } from "discord.js";

export interface Config {
  prefix: string;
  owners: string[];
}

export interface ClientParams {
  config: Config;
  token: string;
  status: ActivitiesOptions;
}

export interface ClientType {
  config: Config;
  status: ActivitiesOptions;
  token: string;
  client: Client<boolean>;
  commands: Collection<string, Command>;
}

export interface Command {
  name: string,
  description: string,
  aliases: string[],
  permissions: PermissionResolvable,
  guildOwnerOnly: boolean,
  botOwnerOnly: boolean,
  execute: (client: Client, Client: ClientType, message: Message, args: string[]) => void,
  executeSlash: (client: Client, Client: ClientType, interaction: CommandInteraction) => void,
  data: SlashCommandBuilder
}