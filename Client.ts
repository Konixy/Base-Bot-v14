import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivitiesOptions,
} from "discord.js";
import { ClientType, ClientParams, Config, Command } from "./Types";

export default class CreateClient implements ClientType {
  constructor(params: ClientParams) {
    this.config = params.config;
    this.client = undefined;
    this.status = params.status;
    this.token = params.token
  }
  config: Config;
  status: ActivitiesOptions;
  token: string;
  client: Client<boolean>;
  commands: Collection<string, Command>;
  async init() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ],
      failIfNotExists: false,
      presence: {
        activities: [this.status],
        status: "online",
      },
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
      },
    });
    await this.client.login(this.token);
  }
}
