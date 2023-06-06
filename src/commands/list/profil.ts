import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import { prisma } from "../..";
import { getLanguage } from "../../util/language";
import { getUser } from "../../util/function";

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
    const player = await getUser(command.user.id);
    if(player === null){
        await command.reply("You are not registered in the database, please use /start");
        return;
    }
    const overWorldRessources = player.getInventory();
    console.log(overWorldRessources)
    const embeds = new EmbedBuilder()
        .setTitle(getLanguage("profil_embed_title", player.language) + " " + command.user.username)
        .addFields(
          {name: "<:pseudo:1112978208577572904> Pseudo", value: "" +player.getPseudo()},
          {name: "<:mana:1112981058774904842> Mana", value: "" + player.mana + "/" + player.manaMax +"         t", inline: true},
          {name: "<a:hearth:1112982072609488957> Pv", value: "" + player.getHealth() + "/" + player.getMaxHealth(), inline: true},
          {name: "<a:lightning:1112982744759287888> Power", value: "" +player.power, inline: true},
          {name: "<a:xp:1112989019744247868> Levelsdferbt", value: `**${player.getXpManager().getLevel()}**\u200b [${player.getXpManager().getXp()}Xp/${player.getXpManager().calculateXPToNextLevel()}]`, inline: true},
          {name: "<a:diamond:1112990251032522752> Ressources overworld", value: "0", inline: true},
          {name: "<a:diamond:1112990251032522752> Ressources wood cutter", value: "1", inline: true}
          )
    await command.reply({embeds: [embeds]})
  }
}
/*

            {name: "<a:xp:1112989019744247868> Level", value: `**${player.level}**\u200b [${player.xp}Xp/${player.xpMax}]`, inline: true},
*/