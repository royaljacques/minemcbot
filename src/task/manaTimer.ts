import { prisma } from "..";

export async function updateMana() {
    console.log("Updating mana...")
    const players = await prisma.player.findMany();
  
    for (const player of players) {
      const { discordId, mana, manaTimer, manaMax } = player;
  
      const now = new Date();
      const timeDiff = now.getTime() - manaTimer.getTime();
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  
      if (minutesDiff >= 3) {
        let newMana = mana + 1;
        if (newMana > manaMax) {
            newMana = manaMax;
        }
        await prisma.player.update({
          where: { discordId },
          data: { mana: newMana, manaTimer: now },
        });
      }
    }
  }