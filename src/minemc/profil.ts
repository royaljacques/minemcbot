
import { prisma } from "..";
import { Inventory } from "./inventory";
import XpManager from "./player/xpManager";
import {Chest} from "./misc/chest";
import { get } from "node:http";

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
    private chestManager: Chest;
    private pseudo: string;
    private health: number;
    private healthMax: number;
    hasVoted: boolean;
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
            pseudo: string,
            health: number,
            healthMax: number,
            vote: boolean
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
        this.chestManager = new Chest(discordId)
        this.hand = hand;
        this.pseudo = pseudo;
        this.health = health;
        this.healthMax = healthMax;
        this.hasVoted = vote;
    }

    getMana(): number{
        return this.mana;
    }
    getManaMax(): number{
        return this.manaMax;
    }
    getPower(): number{
        return this.power;
    }
    setPower(power: number): void{
        this.power = power;
    }
    setMana(mana: number): void{
        this.mana = mana;
    }
    
    getChestManager(): Chest{
        return this.chestManager;
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
        await this.chestManager.saveChest();
        return this;
    }


}