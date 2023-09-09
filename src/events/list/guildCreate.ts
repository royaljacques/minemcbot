import { Guild, TextChannel } from "discord.js";
import Index from "../../minemc";
import Event from "../Event";
import { generateImage } from "../../util/function";
export default class Ready extends Event {
    public readonly name = "guildCreate";
    async execute(guild: Guild) : Promise<void> {
      const members = (await (guild.members.fetch())).filter(member => !member.user.bot).size;
      const channel = await Index.instance.channels.fetch("1115606253603926046") as TextChannel;
      generateImage(guild.name, await guild.iconURL({"extension": "png"})).then((buffer) => {
        channel.send({files: [buffer]});
      })
    }
}

/*
  const totalUsersEachGuild = guild.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
      const bots = guild.members.cache.filter((member: GuildMember )=> member).size;
      */