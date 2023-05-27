type Enchantments = {
    [id: number]: {
      name: string;
      level: number;
    };
  };
export abstract class BaseTool {
    name: string;
    type: number;
    id: number;
    xp: number;
    level: number ;
    enchantments: Enchantments = {};
    constructor(name: string, type: number, id: number){
        this.name = name;
        this.type = type;
        this.id = id;
        this.xp = 0;
        this.level = 1;
    }
    setXp(xp: number): void {
        this.xp = xp;
    }
    addXp(xp: number): void {
        this.xp += xp;
    }
    getXp(): number {
        return this.xp;
    }
    setLevel(level: number): void {
        this.level = level;
    }
    getLevel(): number {
        return this.level;
    }
    addLevel(level: number): void {
        this.level += level;
    }
    setEnchantments(enchantments: Enchantments): void {
        this.enchantments = enchantments;
    }
    getEnchantments(): Enchantments {
        return this.enchantments;
    }

}