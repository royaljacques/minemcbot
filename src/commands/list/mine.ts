import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import BaseCommand, { CommandsType } from "../baseCommands";
import { prisma } from "../..";
export default class Mine extends BaseCommand{
    public readonly help = {
        "name": "mine",
        "description": "mining in the mine ", 
        "category": CommandsType.GAMEPLAY
      }
    public readonly slashCommand = new SlashCommandBuilder()
        .setName("mine")
        .setDescription("mining in the mine");

    async execute(command: ChatInputCommandInteraction): Promise<void> {
        //get if user exist in prismadb

        const player = await prisma.player.findUnique({
            where: {
                discordId: command.user.id
            }
        })
        if(player === null){
            await command.reply("You are not registered in the database, please use /start");
            return;
        }
        await command.reply("Pong !")
    }
}