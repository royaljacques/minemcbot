import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import BaseCommand, { CommandsType } from "../baseCommands";
import { prisma } from "../..";
import { EmbedErrorLogger, createPickaxe, getUser, replaceAll } from "../../util/function";
import { getLanguage } from "../../util/language";
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
        await command.reply( { ephemeral: true , content: 'commands on loading'});
        if (player === null) {
            await command.editReply({content: "You are not registered in the database, please use /start"});
            return;
        }
        const language = player.language;
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
                await command.editReply(getLanguage("mine_no_pickaxe", language));
                return;
            }
        }
        const multipl = this.getMultiplieRecolt(pickaxe.level);
        if (multipl === undefined) {
            EmbedErrorLogger("Error in getMultiplieRecolt function, undefined value by level");
            command.editReply(getLanguage("mine_error", language));
            return;
        }
        const recolt = Math.floor(Math.random() * (multipl * 5 - 1) + 1);
        const mine = this.mine(recolt, pickaxe.level);
        
        const xpManager = player.getXpManager().gainXP(mine.xp);
        
        const result = Object.entries(mine.contents).map(([key, value]) => {
            if(player === null) return;
            player.getInventory().addRessource(key.toString(), value);
            return  this.addEmoji(key)+`${key}: ${value}`
        }).join("\n");
        const embed = new EmbedBuilder()
            .setTitle("Mine - " + mine.xp + "xp")
            .setDescription(replaceAll(getLanguage("mine_recolt_message", language), ["{xp}", "{recolt}", "{totalxp}"], [mine.xp.toString(), recolt.toString(), xpManager.toString()]))
            .addFields({ name: "Result", value: result });
        try{
            player.save();
        }catch(e){
            console.log(e);
        }
        await command.editReply({ embeds: [embed] })
    }

    addEmoji(type: string): string {
        switch(type){
            case "stone":
                return "<:stone:1113011409169682503>";
            case "dirt":
                return "<a:dirt:1115627917637079060>";
            case "coal":
                return "<a:coal:1115633073694986260>";
            default:
                return "";
        }
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
    //fonction repplace all balise of this texte by value 
    //exemple: replaceAll("hello {name} {names}", ["{name}", {names}], ["world", "royal"]) => "hello world royal"
   
}