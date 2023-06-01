export default class Profil {
    discordId: string;
    mana: number;
    manaMax: number;
    xp: number;
    level: number;
    //pv for attack boss
    pv: number;
    //power for attack boss
    power: number;
    maxPower: number;
    language: string;

    constructor(discordId: string, mana: number, manaMax: number, xp: number, level: number, pv: number, power: number, maxPower: number, language: string){
        this.discordId = discordId;
        this.mana = mana;
        this.manaMax = manaMax;
        this.xp = xp;
        this.level = level;
        this.pv = pv;
        this.power = power;
        this.maxPower = maxPower;
        this.language = language;
    }
}