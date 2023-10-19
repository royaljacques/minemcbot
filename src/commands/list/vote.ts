import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import { getVote } from "../../util/request/topGg";
import Index, { prisma } from "../../minemc";
import Chest from '../../minemc/blocks/chest';
import { ChestType } from "../../minemc/types/chestType";

export default class Ping extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("vote")
    .setDescription("voter pour le bot");

  public readonly help = {
    "name": "vote",
    "description": "voter pour le bo",
    "category": CommandsType.MISC
  }
  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    const vote = await getVote(command.user.id);
    const user = Index.instance.getProfils().getUser(command.user.id.toString());
    if (user === undefined) {
      command.reply("vous n'êtes pas encore enregistré avec la commande /start");
      return;
    }
    if (vote) {
      const checkDailyVote = await prisma.dailyReward.findUnique({ where: { discordId: command.user.id.toString() } });
      if (!checkDailyVote) {
        user.getChestInventory().addChest(ChestType.Vote, 1);
        await prisma.dailyReward.create({ data: { discordId: command.user.id.toString(), date: new Date() } });
        command.reply("Ty for voting for the bot, you received a vote chest use /openchest to open it");
      } else {
        const day = new Date();
        if (checkDailyVote.date.getDate() === day.getDate()) {
          command.reply("you have already voted today");
          return;
        } else {
          if (user === undefined) {
            command.reply("you are not registered with the /start command");
          } else {
            user.getChestInventory().addChest(ChestType.Vote, 1);
            await prisma.dailyReward.update({ where: { discordId: command.user.id.toString() }, data: { date: day } });
            command.reply("Ty for voting for the bot, you received a vote chest use /openchest to open it");
          }
        }
      }
    } else {
      command.reply("you have not voted for the bot");

    }
  }
}
/**
R4 D4 * 
const item = await prisma.tools.create({
      data: {
        type: ToolType.PICKAXE
      }
    })
 */