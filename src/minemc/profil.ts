
import { prisma } from "..";
import { Inventory } from "./inventory";

export default class Profil {
    discordId: string;
    mana: number;
    manaMax: number;
    xp: number;
    level: number;
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
            hand: number | null = null
        ){
        this.discordId = discordId;
        this.mana = mana;
        this.manaMax = manaMax;
        this.xp = xp;
        this.level = level;
        this.pv = pv;
        this.power = power;
        this.maxPower = maxPower;
        this.language = language;
        this.Inventory = new Inventory(discordId);
        this.hand = hand;
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
        const update = await prisma.player.update({
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
        const update = await prisma.player.update({
            where: {
                discordId: this.discordId
            },
            data: {
                mana: this.mana,
                manaMax: this.manaMax,
                xp: this.xp,
                level: this.level,
                health: this.pv,
                power: this.power,
                maxPower: this.maxPower,
                language: this.language,
                itemInHand: this.hand
            }
        })
        return this;
    }
}