
import { getStringEnv } from "../env-variable";
import {Webhook} from "@top-gg/sdk"
import express from "express"
import Index from "../..";


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
      const channel = await Index.instance.getLoggerChannel()
      channel.send(`User ${vote.user} just voted!`)
    }))
    app.listen(3000)
    console.log("top.gg webhook started")
  }
}