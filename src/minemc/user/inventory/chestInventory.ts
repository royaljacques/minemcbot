import { prisma } from '../../../minemc';
import { ChestType } from '../../types/chestType';


export default class ChestInventory {
    private chests: { ChestType: ChestType, amount: number }[] = [];
    constructor(
        private discordID: string,
    ) {
        this.loadFromDatabase();
        
    }
    private async loadFromDatabase(): Promise<void> {
        //load from database
        const chests = await prisma.chest.findUnique({ where: { discordId: this.discordID } });
        //set chests
        if(chests === null) return;
        this.chests.push({ ChestType: ChestType.Vote, amount: chests.vote });
        this.chests.push({ ChestType: ChestType.Common, amount: chests.common });
        this.chests.push({ ChestType: ChestType.Rare, amount: chests.rare });
        this.chests.push({ ChestType: ChestType.Mythic, amount: chests.mythic });
        this.chests.push({ ChestType: ChestType.Legendary, amount: chests.legendary });
        this.chests.push({ ChestType: ChestType.Relic, amount: chests.relic });
    }
    public getChests(): { ChestType: ChestType, amount: number }[] {
        return this.chests;
    }
    public addChest(chestType: ChestType, amount: number): void {
        this.chests.find(chest => chest.ChestType === chestType)!.amount += amount;
        this.save();
    }
    public removeChest(chestType: ChestType, amount: number): void {
        this.chests.find(chest => chest.ChestType === chestType)!.amount -= amount;
        this.save();
    }
    
    private save(){
        prisma.chest.update({where:{discordId:this.discordID},data:{
            vote:this.chests.find(chest => chest.ChestType === ChestType.Vote)!.amount,
            common:this.chests.find(chest => chest.ChestType === ChestType.Common)!.amount,
            rare:this.chests.find(chest => chest.ChestType === ChestType.Rare)!.amount,
            mythic:this.chests.find(chest => chest.ChestType === ChestType.Mythic)!.amount,
            legendary:this.chests.find(chest => chest.ChestType === ChestType.Legendary)!.amount,
            relic:this.chests.find(chest => chest.ChestType === ChestType.Relic)!.amount,
        }}).then(() => {
            console.log("saved");
        }).catch((err) => {
            console.log(err);
        });
    }
}