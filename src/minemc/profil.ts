
import { prisma } from "..";
import { Inventory } from "./inventory";
import XpManager from "./player/xpManager";

export default class Profil {
    discordId: string;
    mana: number;
    manaMax: number;
    private xpManager: XpManager;
    pv: number;
    power: number;
    maxPower: number;
    language: string;
    Inventory: Inventory;
    hand: number | null;
    constructor(
            discordId: string, 
            mana: number, 
            manaMax: number, 
            xp: number,
            level: number, 
            pv: number, 
            power: number, 
            maxPower: number, 
            language: string,
            hand: number | null = null,
            private pseudo: string,
            private health: number,
            private healthMax: number
        ){
        this.discordId = discordId;
        this.mana = mana;
        this.manaMax = manaMax;
        this.pv = pv;
        this.power = power;
        this.maxPower = maxPower;
        this.language = language;
        this.Inventory = new Inventory(discordId);
        this.xpManager = new XpManager(level, xp);
        this.hand = hand;
    }

    getMaxHealth(): number{
        return this.healthMax;
    }
    getHealth(): number{
        return this.health
    }
    getPseudo(): string{
        return this.pseudo;
    }
    getXpManager(): XpManager {
        return this.xpManager;
    }
    getInventory(): Inventory{
        return this.Inventory;
    }

    //getter of item in hand for using mine / chop / dig / attack / farme
    getItemInHand(): number | null{
        return this.hand;
    }

    async setItemInHand(id: number): Promise<Profil>{
        this.hand = id;
        await prisma.player.update({
            where: {
                discordId: this.discordId
            },
            data: {
                itemInHand: id
            }
        })
        return this;
    }
    async save(): Promise<Profil>{
        await prisma.player.update({
            where: {
                discordId: this.discordId
            },
            data: {
                mana: this.mana,
                manaMax: this.manaMax,
                xp: this.getXpManager().getXp(),
                level: this.getXpManager().getLevel(),
                health: this.pv,
                power: this.power,
                maxPower: this.maxPower,
                language: this.language,
                itemInHand: this.hand
            }
        })
        await this.Inventory.saveInventory();
        return this;
    }


}