import { log } from "console";
import { getStringEnv } from "../env-variable";

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