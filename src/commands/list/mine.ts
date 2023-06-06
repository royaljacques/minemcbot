import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import BaseCommand, { CommandsType } from "../baseCommands";
import { prisma } from "../..";
import { EmbedErrorLogger, createPickaxe, getUser } from "../../util/function";
export default class Mine extends BaseCommand {
    public readonly help = {
        "name": "mine",
        "description": "mining in the mine ",
        "category": CommandsType.GAMEPLAY
    }
    public readonly slashCommand = new SlashCommandBuilder()
        .setName("mine")
        .setDescription("mining in the mine");

    async execute(command: ChatInputCommandInteraction): Promise<void> {
        let player = await getUser(command.user.id);
        await command.reply('commands on loading');
        if (player === null) {
            await command.editReply("You are not registered in the database, please use /start");
            return;
        }
        const itemInHand = player.getItemInHand();
        let pickaxe;
        if (itemInHand === null) {
            pickaxe = await createPickaxe(command.user.id);
            player.setItemInHand(pickaxe.id);
            player = await player.save()
        } else {
            pickaxe = await prisma.item.findUnique({
                where: {
                    id: itemInHand
                }
            })
            if (!pickaxe) {
                await command.editReply("You have not a pickaxe in your hand");
                return;
            }
        }
        const multipl = this.getMultiplieRecolt(pickaxe.level);
        if (multipl === undefined) {
            EmbedErrorLogger("Error in getMultiplieRecolt function, undefined value by level");
            command.editReply("Error contact the developper (/info)");
            return;
        }
        const recolt = Math.floor(Math.random() * (multipl * 5 - 1) + 1);
        const mine = this.mine(recolt, pickaxe.level);
        const xpManager = player.getXpManager().gainXP(mine.xp);
        const result = Object.entries(mine.contents).map(([key, value]) => `${key}: ${value}`).join("\n");
        
        const embed = new EmbedBuilder()
            .setTitle("Mine")
            .setDescription(`You have mined ${recolt} blocks\nYou've gained ${mine.xp} XP.` + xpManager ? "": "")
            .addFields({ name: "Result", value: result });

        try{
            player.save();
        }catch(e){
            console.log(e);
        }
        await command.channel?.send({ embeds: [embed] })
        await command.editReply("the bot is not yet finished, please wait for the next update")

    }

    getMultiplieRecolt(toolLevel: number): number | undefined {
        if (toolLevel >= 0 && toolLevel <= 10) return 1;
        if (toolLevel > 10 && toolLevel <= 20) return 2;
        if (toolLevel > 20 && toolLevel <= 30) return 3;
        if (toolLevel > 30 && toolLevel <= 40) return 4;
        if (toolLevel > 40 && toolLevel <= 50) return 5;
        if (toolLevel > 50 && toolLevel <= 60) return 6;
    }

    mine(recoltSize: number, level: number) {
        let xp = 0;
        let stone = 0;
        let dirt = 0;
        let coal = 0;
        for (let i = 0; i < recoltSize; i++) {
            const random = Math.floor(Math.random() * (100 - 1) + 1);
            if (level >= 0 && level <= 10) {
                if (random >= 1 && random <= 5) {
                    coal++;
                } else if (random > 5 && random <= 20) {
                    stone++;
                } else {
                    dirt++;
                }
                xp++;
            }

        }
        return {
            xp: xp,
            contents: {
                stone: stone,
                dirt: dirt,
                coal: coal
            }
        }
    }
}