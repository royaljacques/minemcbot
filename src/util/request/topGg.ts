
import { getStringEnv } from "../env-variable";
import {Webhook} from "@top-gg/sdk"
import express from "express"
import Index from "../../minemc";
import { DiscordAPIError, GuildMember } from "discord.js";
import { getuserById, ErrorMessages } from '../function';


const baseUrl = 'https://top.gg/api'
export const getVote  = async (discordId: string): Promise<boolean>=> {
  const request = await fetch(`${baseUrl}/bots/1112497189458038907/check?userId=${discordId}`, {
    method: 'GET',
    headers: {
      'Authorization': getStringEnv('TOP_GG_TOKEN')
    }
  });
  const response = await request.json();
  return response.voted;
}

export class TopGg {
  static init() {
    const app = express()
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    const webhook = new Webhook(getStringEnv('TOP_GG_TOKEN'))
    app.post('/dblwebhook', webhook.listener(async (vote) => {
      console.log(vote)
      getuserById(vote.user).then(async (user: GuildMember | null) => {
        const channel = await Index.instance.getVoteChannel();
        if(user) {
          
          channel.send(`User <@${vote.user}> just voted!`)
          try{
            user.send("Thanks for voting! You can vote again in 12 hours here: https://top.gg/bot/1112497189458038907/vote")
          }
          catch(e: DiscordAPIError | any) {
            const channel = await Index.instance.getLoggerChannel();
            channel.send(e.message)
            console.log(e.message)
          }
        }else{
          channel.send(`User <@${vote.user}> just voted!`)
        }
      })      
    }))
    app.listen(3005)
    console.log("top.gg webhook started")
  }
}