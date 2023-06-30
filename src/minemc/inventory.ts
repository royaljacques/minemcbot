import { prisma } from "../minemc";
import { EmbedErrorLogger } from "../util/function";

export class Inventory{

  private ressources: {
    [key: string]: number;
  };
  constructor(public discordID: string){
    this.ressources = {};
    this.initInventory();
  }
  async initInventory(): Promise<boolean>{
    try{
      const prismaInventory= await prisma.ressource.findUnique({
        where: {
          discordId: this.discordID
        }
      })
      if (prismaInventory == null) {
        await prisma.ressource.create({
          data: {
            discordId: this.discordID
          }
        })
        return true;
      }
      Object.entries(prismaInventory).forEach(([key, value]) => {
        if(key === "discordId") return;
        this.ressources[key] = <number>value;
      })
      return true;
    }catch(e){
      console.log(e)
      EmbedErrorLogger("Error in initInventory function");
      return false;
    }
  
  }
  getRessources(): object{
    return this.ressources;
  }
  addRessource(ressource: string, amount: number): void{
    if(this.ressources[ressource] === undefined){
      this.ressources[ressource] = amount;
    }else{
      this.ressources[ressource] += amount;
    }
  }
  
  async saveInventory(): Promise<boolean> {
    delete this.ressources["discordId"];
    await prisma.ressource.update({
      where: {
        discordId: this.discordID
      },
      data: {
        ...this.ressources
      }
    })
    return true;
  }
}