import { prisma } from "../..";
type ChestType = "vote" | "common" | "rare" | "epic" | "legendary" | "mythic" | "special";
export type ChestCount = Record<ChestType, number>;
export class Chest {
  chests: { [key: string]: number } = {};


  constructor(public discordId: string) {
    
  }

  public async initChests(): Promise<void> {
    let chest = await prisma.chest.findUnique({
      where: {
        discordId: this.discordId
      },
      select: {
        discordId: false,
        vote: true,
        common: true,
        rare: true,
        epic: true,
        legendary: true,
        mythic: true,

      }
    });
    if (chest === null) {
      chest = await prisma.chest.create({
        data: {
          discordId: this.discordId
        }
      });
    } else {
      this.chests = chest;
    }
    console.log("chest mis à jour");
  }

  getChest(type: ChestType): number {
    return this.chests[type];
  }
  addChest(type: ChestType, amount: number): void {
    console.log(this.getChest(type))
    this.chests[type] = this.getChest(type) + amount;
    console.log(this.chests)
  }

  async saveChest(): Promise<void> {
    console.log(this.chests)
    await prisma.chest.update({
      where: {
        discordId: this.discordId
      },
      data: {
        ...this.chests
      }
    });
  }

}