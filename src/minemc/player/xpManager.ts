export default class XpManager {
  protected level: number;
  protected xp: number;
  constructor(level: number, xp: number) {
    this.level = level;
    this.xp = xp;
  }

  levelUp() {
    this.level++;
  }

  gainXP(amount: number): number {
    const xp = this.xp += amount;
    const xpToNextLevel = this.calculateXPToNextLevel();
    if (this.xp >= xpToNextLevel) {
      this.levelUp();
    }
    return xp;
  }

  calculateXPToNextLevel() {
    const baseXP = 800; 
    const exponent = 1.1;
    const xpToNextLevel = Math.floor(baseXP * Math.pow(this.level, exponent));
    return xpToNextLevel;
  }

  getXp(): number {
    return this.xp;
  }
  
  getLevel(): number {
    return this.level
  }
}