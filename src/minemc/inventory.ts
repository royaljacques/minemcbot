import { prisma } from "..";

export class Inventory{
 constructor(public discordID: string){
   
  }
  async initInventory(){
    const prismaInventory = await prisma.inventory.findUnique({
      where: {
        discordID: this.discordID
      }
    })
    if (prismaInventory == null) {
      return null;
    }
    return prismaInventory;
  }
}