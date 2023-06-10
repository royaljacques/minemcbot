import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import { getVote } from "../../util/request/topGg";
import { EmbedErrorLogger, generateRandomNumber, getUser } from "../../util/function";

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
    if (vote) {
      command.reply({ content: "on loading" })
      const user =  await getUser(command.user.id);
      if (user === null) {
        EmbedErrorLogger("Player not found in vote command")
        command.editReply({ content: "you have voted for the bot but i have a problem with your db . have you started the game ? (/start)" })
        return;
      }
      if (!user.hasVoted) {
        await user?.getChestManager().initChests();
        if (user === null) {
          EmbedErrorLogger("Player not found in vote command")
          command.editReply({ content: "you have voted for the bot but i have a problem with your db . have you started the game ? (/start)" })
          return;
        }
        const wonChests: string[] = [];
        await user.getChestManager().addChest("vote", 1);

        wonChests.push("vote");
        const rand = generateRandomNumber(1, 600);

        if (rand > 0 && rand < 50) {
          user.getChestManager().addChest("common", 1);
          wonChests.push("common")
        }
        if (rand > 50 && rand < 60) {
          user.getChestManager().addChest("rare", 1);
          wonChests.push("rare")
        }

        let chestMessage = "";
        user.hasVoted = true;
        if (wonChests.length === 1) {
          chestMessage = `You have won a chest of type "${wonChests[0]}"!`;
        } else {
          const joinedChests = wonChests.join('", "');
          chestMessage = `You have won the following chests: "${joinedChests}"!`;
        }
        await user.save();
        await command.editReply({ content: "You have voted today," + chestMessage + ". You can open it with /chest open vote" })
      } else {
        await command.editReply({ content: "You have already voted today, you can vote again in 12h" })
      }
    } else {
      await command.reply({ content: "You can vote here: https://top.gg/bot/1112497189458038907/vote" })
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