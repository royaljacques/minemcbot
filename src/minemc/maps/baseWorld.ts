export abstract class BaseWorld{
    abstract getBlockProperties(playerLevel: number): {[key: string]: number} | null;
}