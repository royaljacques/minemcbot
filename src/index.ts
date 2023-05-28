import { Client as DiscordClient, GatewayIntentBits, Guild, Partials} from "discord.js";
import CommandLoader from "./commands/commandLoader";
import { getStringEnv } from "./util/env-variable";
import EventManager from "./events/EventManager";
export default class Index extends DiscordClient {

  public static instance: Index;

  // Events and commands managers :
  public readonly eventManager: EventManager;

  public readonly commandManager: CommandLoader;

  //public readonly taskManager: TaskManager;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildBans
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    });

    // Create bot instance and login it :
    Index.instance = this;
    this.login(getStringEnv("BOT_TOKEN"));
    this.commandManager = new CommandLoader();

    // Load events, commands and tasks managers :
    this.eventManager = new EventManager();
  
    //this.taskManager = new TaskManager();
  }

  public async getGuild(): Promise<Guild> {
    return await this.guilds.fetch("1112068413322428499");
  }
}

new Index();
