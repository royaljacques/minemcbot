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
    xp: number = 0;
    level: number = 0;
    enchantments: Enchantments = {};
    constructor(name: string, type: number, id: number){
        this.name = name;
        this.type = type;
        this.id = id;
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