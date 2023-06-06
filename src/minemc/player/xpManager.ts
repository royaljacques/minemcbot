export default class XpManager{
  protected level: number;
  protected xp: number;

  constructor(level: number, xp: number) {
    this.level = level;
    this.xp = xp;
  }

  levelUp() {
    this.level++;
    console.log(`Félicitations, vous êtes passé au niveau ${this.level} !`);
  }

  gainXP(amount: number): boolean{
    this.xp += amount;
    console.log(`Vous avez gagné ${amount} points d'expérience.`);
    // Vérifier si le joueur doit level up
    const xpToNextLevel = this.calculateXPToNextLevel();
    if (this.xp >= xpToNextLevel) {
      this.levelUp();
      return true;
    }
    return false;

  }

  calculateXPToNextLevel() {
    // Calculer le nombre d'XP nécessaire pour passer au niveau suivant (exemple complexe)
    const baseXP = 100; // XP de base pour chaque niveau
    const levelMultiplier = 1.2; // Multiplicateur d'XP par niveau
    const xpToNextLevel = Math.floor(baseXP * (Math.pow(levelMultiplier, this.level)));
    return xpToNextLevel;
  }
  getXp(): number{
    return this.xp;
  }
  getLevel(): number{
    return this.level
  }
}