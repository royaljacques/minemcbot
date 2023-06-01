import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import { prisma } from "../..";
import { getLanguage } from "../../util/language";

export default class Profil extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("profil")
    .setDescription("view profile");
  
  public readonly help = {
    "name": "profil",
    "description": "view profile", 
    "category": CommandsType.FUN
  }
  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    const player = await prisma.player.findUnique({
        where: {
            discordId: command.user.id
        }
    })
    if(player === null){
        await command.reply("You are not registered in the database, please use /start");
        return;
    }
    const embeds = new EmbedBuilder()
        .setTitle(getLanguage("profil_embed_title", player.language) + " " + command.user.username)
        .addFields(
            {name: "<:pseudo:1112978208577572904> __Pseudo__", value: "" +player.pseudo},
            {name: "<:mana:1112981058774904842> __Mana__", value: player.mana + "/" + player.manaMax +"\n<a:xp:1112989019744247868> **Level**\n" + `**${player.level}** [ ${player.xp} Xp/${player.xpMax} ] `, inline: true},
            {name: "<a:hearth:1112982072609488957> __Pv__", value: "" +player.health + "/" + player.healthMax+ "\n__<a:diamond:1112990251032522752> **Ressources**(0)__ \n<:stone:1113011409169682503> Stone: 0\n<a:perfect_prisme:1113005650922967120>prisme: ", inline: true},
            {name: "<a:lightning:1112982744759287888> __Power__", value: "" +player.power + "\n__<a:diamond:1112990251032522752> **Ressources**(1)__ \n<:iron:1113011511846256661> Iron: 0", inline: true},
            )
    await command.reply({embeds: [embeds]})
  }
}
/*

            {name: "<a:xp:1112989019744247868> Level", value: `**${player.level}**\u200b [${player.xp}Xp/${player.xpMax}]`, inline: true},
*/