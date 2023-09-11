import Index, { prisma } from '../minemc';
import User from './user/user';
export default class Profil {
    public user: User[] = [];
    constructor(){
        this.databaseLoader();
    }
    public async databaseLoader(): Promise<void> {
        const prismaRequest = await prisma.player.findMany();
        prismaRequest.forEach((user) => {
            this.user.push(new User(
                user.pseudo, 
                user.discordId, 
                user.language, 
                user.mana, 
                user.manaMax, 
                user.xp, 
                user.xpMax, 
                user.level, 
                user.health, 
                user.healthMax, 
                user.power, 
                user.maxPower, 
                user.itemInHand, 
                user.manaTimer
                ));
        })
    }
    getUser(id: string): User  | undefined{
        return this.user.find((user) => user.getDiscordId() === id);
    }
}