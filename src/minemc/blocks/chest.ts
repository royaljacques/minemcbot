import { generateRandomNumber } from '../../util/function';
import { ChestType } from '../types/chestType';
export default class Chest {
    private ChestType: ChestType;
    private Multi: number = 1;
    private BaseXp: number = 0;
    private mana: number = 0;
    private xp: number = 0;
    private money: number = 0;
    constructor(ChestType: ChestType) {
        this.ChestType = ChestType;
        this.setMulti()
    }

    private setMulti() {

        switch (this.ChestType) {
            case ChestType.Vote:
                this.Multi = 1;
                break;
            case ChestType.Common:
                this.Multi = generateRandomNumber(1, 3);
                break;
            case ChestType.Rare:
                this.Multi = generateRandomNumber(2, 5);
                break;
            case ChestType.Mythic:
                this.Multi = generateRandomNumber(3, 7);
                break;
            case ChestType.Legendary:
                this.Multi = generateRandomNumber(4, 9);
                break;
                case ChestType.Relic:
                this.Multi = generateRandomNumber(4, 10);
                break;
            default:
                this.Multi = generateRandomNumber(5, 10);
                break;
        }
    }

    public setupBaseXp(level: number): Chest {
        this.BaseXp = 2 * (level / 10);
        return this;
    }

    private fillCHest() {
        this.mana = 1 * this.Multi;
        this.xp = this.BaseXp * this.Multi;
        this.money = 200 * this.Multi;
    }
    public create(): Chest {
        return this;
    }
    public getMana(): number {
        return this.mana;
    }
    public getXp(): number {
        return this.xp;
    }
    public getMoney(): number {
        return this.money;
    }
}