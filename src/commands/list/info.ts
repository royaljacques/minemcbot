import BaseCommand from "../baseCommands";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandsType } from "../baseCommands";
import { getUser } from "../../util/function";
import { getLanguage } from "../../util/language";
import Index from "../../minemc";
import { Guild } from "discord.js";
export default class Ping extends BaseCommand {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("info")
    .setDescription("bot info");
  
  public readonly help = {
    "name": "info",
    "description": "bot info", 
    "category": CommandsType.MISC
  }
  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    console.log(command)
    const user = await getUser(command.user.id);
    const guilds = await command.client.guilds.fetch();
    //get all users
    const guildsSize = guilds.size;
    const memberCount = Index.instance.guilds.cache.map((guild: Guild) => guild.memberCount).reduce((a, b) => a + b, 0);
    const embed = new EmbedBuilder()
      .setTitle(user === null ? getLanguage("info_embed_title", "EN_en"): getLanguage("info_embed_title", user.language))
      .addFields(
        {name: getLanguage("info_embed_field_creator", user === null ? "EN_en": user.language), value: "<@883693434693619732>", inline: true},
        {name: getLanguage("info_embed_field_total_guilds", user === null ? "EN_en": user.language), value: guildsSize.toString(), inline: true},
        {name: getLanguage("info_embed_field_total_users", user === null ? "EN_en": user.language), value: memberCount.toString(), inline: true},
        {name: getLanguage("info_embed_field_version", user === null ? "EN_en": user.language), value: "0.0.1", inline: true},
        {name: getLanguage("info_embed_field_dev_language", user === null ? "EN_en": user.language), value: "TypeScript", inline: true},
        {name: getLanguage("info_embed_field_api", user === null ? "EN_en": user.language), value: "discord.js", inline: true},
        {name: getLanguage("info_embed_field_discordserver", user === null ? "EN_en": user.language), value: "[click](https://discord.gg/HJJrq5d5eU)", inline: true},
        {name: getLanguage("info_embed_field_uptime", user === null ? "EN_en": user.language), value: "<t:"+Index.startBotTime+":R>", inline: true},
        {name: getLanguage("info_embed_field_invite", user === null ? "EN_en": user.language), value: "[click](https://top.gg/fr/bot/1112497189458038907)", inline: true},
      );
    await command.reply({embeds: [embed]});
  }
}

