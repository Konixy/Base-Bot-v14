import {
  ActivitiesOptions,
  Client,
  Collection,
  CommandInteraction,
  Events,
  Message,
  PermissionResolvable,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import CreateClient from "./Client";

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
  name: string;
  description: string;
  aliases: string[];
  permissions: PermissionResolvable;
  guildOwnerOnly: boolean;
  botOwnerOnly: boolean;
  execute: Execute;
  executeSlash: ExecuteSlash;
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
}

export type Event = {
  name: Events;
  once?: boolean;
  execute: (client: Client, Client: CreateClient, ...args: any[]) => void;
};

export type Execute = (
  client: Client,
  Client: ClientType,
  message: Message,
  args: string[]
) => void;

export type ExecuteSlash = (
  client: Client,
  Client: ClientType,
  interaction: CommandInteraction
) => void;
