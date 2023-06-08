import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import { getVote } from "../../util/request/topGg";

export default class Ping extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("vote")
    .setDescription("vote for the server");

  public readonly help = {
    "name": "vote",
    "description": "vote for the server",
    "category": CommandsType.MISC
  }
  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    const vote = await getVote(command.user.id)
    if(vote){
      await command.reply({content: "You have already voted today"})
    }else{
      await command.reply({content: "You can vote here: https://top.gg/bot/1112497189458038907"})
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