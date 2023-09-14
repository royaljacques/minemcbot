import { Client as DiscordClient, GatewayIntentBits, Guild, IntentsBitField, Partials, TextChannel } from "discord.js";
import CommandLoader from "./commands/commandLoader";
import { getStringEnv } from "./util/env-variable";
import EventManager from "./events/EventManager";
import { PrismaClient } from "@prisma/client";
import "./util/langs/EN_en.json"
import { TopGg, getVote } from './util/request/topGg';
import { generateImage } from "./util/function";
import Profil from "./minemc/profil";
import ButtonLoader from "./commands/buttonLoader";
export const prisma = new PrismaClient();
export default class Index extends DiscordClient {

  public static instance: Index;
  public static startBotTime: number;
  public readonly eventManager: EventManager;
  public readonly commandManager: CommandLoader;
  public readonly buttonsManager: ButtonLoader;
  public readonly profil: Profil;
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
    
   this.user?.setStatus("invisible");
    Index.startBotTime = Date.parse(new Date().toString()) / 1000;
    Index.instance = this;
    this.commandManager = new CommandLoader();
    this.buttonsManager = new ButtonLoader();
    this.profil = new Profil();
    this.eventManager = new EventManager();
    this.login(getStringEnv("BOT_TOKEN")).then(() => {
      TopGg.init();
    });
   
  }
  public async getGuild(): Promise<Guild> {
    return await this.guilds.fetch("732251741999071303");
  }

  public async getLoggerChannel(): Promise<TextChannel> {
    return await this.channels.fetch("1112920322824474704") as TextChannel;
  }

  public async getVoteChannel(): Promise<TextChannel> {

    return await this.channels.fetch("1150828396750839970") as TextChannel;
  }

  public getProfils(): Profil {
    return this.profil;
  }
  
}

new Index();
