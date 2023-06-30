import { Guild, TextChannel } from "discord.js";
import Event from "../Event";
import { generateImage } from "../../util/function";
import Index from "../../minemc";
export default class Ready extends Event {
    public readonly name = "guildCreate";
    async execute(guild: Guild) : Promise<void> {
      const members = (await (guild.members.fetch())).filter(member => !member.user.bot).size;
      const image = await generateImage((await guild.fetchOwner()).user.username,guild.name, members);
      const channel = await Index.instance.channels.fetch("1115606253603926046") as TextChannel
      channel.send({files: [{ attachment: image, name: 'newServer.png' }]});    
    }
}

/*
  const totalUsersEachGuild = guild.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
      const bots = guild.members.cache.filter((member: GuildMember )=> member).size;
      */