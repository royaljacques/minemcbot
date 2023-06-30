import { Client as DiscordClient, GatewayIntentBits, Guild, Partials, TextChannel } from "discord.js";
import CommandLoader from "./commands/commandLoader";
import { getStringEnv } from "./util/env-variable";
import EventManager from "./events/EventManager";
import { PrismaClient } from "@prisma/client";
import "./util/langs/EN_en.json"
import { TopGg } from "./util/request/topGg";
import { updateMana } from "./task/manaTimer";
export const prisma = new PrismaClient();
export default class Index extends DiscordClient {

  public static instance: Index;
  public static startBotTime: number;

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
        GatewayIntentBits.GuildMembers
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    });
    
    Index.startBotTime = Date.parse(new Date().toString()) / 1000;
    // Create bot instance and login it :
    Index.instance = this;
    this.commandManager = new CommandLoader();
    // Load events, commands and tasks managers :
    this.eventManager = new EventManager();
    //this.taskManager = new TaskManager();
   setInterval(updateMana, 1000 * 60 * 3);
    this.login(getStringEnv("BOT_TOKEN")).then(() => {
      TopGg.init();
    });
  }

  public async getGuild(): Promise<Guild> {
    return await this.guilds.fetch("1112068413322428499");
  }

  public async getLoggerChannel(): Promise<TextChannel> {
    return await this.channels.fetch("1112920322824474704") as TextChannel;
  }

  
}

new Index();
