export default class User {
    constructor(
        public discordId: string,
        public pseudo: string,
        public language: string,
        public mana: number,
        public manaMax: number,
        public xp: number,
        public xpMax: number,
        public level: number,
        public health: number,
        public healthMax: number,
        public power: number,
        public maxPower: number,
        public itemInHand: number | null,
        public manaTimer: Date
    ) {
    }
    
    public getDiscordId(): string {
        return this.discordId;
    }

    public getPseudo(): string {
        return this.pseudo;
    }

    public getLanguage(): string {
        return this.language;
    }

    public getMana(): number {
        return this.mana;
    }

    public getManaMax(): number {
        return this.manaMax;
    }

    public getXp(): number {
        return this.xp;
    }

    public getXpMax(): number {
        return this.xpMax;
    }

    public getLevel(): number {
        return this.level;
    }

    public getHealth(): number {
        return this.health;
    }

    public getHealthMax(): number {
        return this.healthMax;
    }

    public getPower(): number {
        return this.power;
    }

    public getMaxPower(): number {
        return this.maxPower;
    }

    public getItemInHand(): number | null {
        return this.itemInHand;
    }

    public getManaTimer(): Date {
        return this.manaTimer;
    }
}
