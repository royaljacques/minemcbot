import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import { getVote } from "../../util/request/topGg";

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
    if(vote) {
      const user = getUser
      command.reply("Vous avez déjà voté pour le bot");
    } else {
        command.reply("Vous n'avez pas encore voté pour le bot");
    }
  }
}
/**
 * 
const item = await prisma.tools.create({
      data: {
        type: ToolType.PICKAXE
      }
    })
 */