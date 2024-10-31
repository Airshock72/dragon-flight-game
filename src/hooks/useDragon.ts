import * as PIXI from 'pixi.js'
import {Texture} from 'pixi.js'

interface UseDragon {
    dragonFlyTextures: Texture[]
    dragonAttackTextures: Texture[]
    dragonDeathTextures: Texture[]
}

const useDragon = (): UseDragon => {
    const dragonFlyTextures = Array.from({ length: 31 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            PIXI.BaseTexture.from('/dragon-flight-game/assets/dragon_animation/Dragon_Fly.png'),
            new PIXI.Rectangle(col * (5840 / 4), row * (5944 / 8), 5840 / 4, 5944 / 8)
        );
    })

    const dragonAttackTextures = Array.from({ length: 30 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            PIXI.BaseTexture.from('/dragon-flight-game/assets/dragon_animation/Attack.png'),
            new PIXI.Rectangle(col * (6656 / 4), row * (8864 / 8), 6656 / 4, 8864 / 8)
        );
    })

    const dragonDeathTextures = Array.from({ length: 32 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            PIXI.BaseTexture.from('/dragon-flight-game/assets/dragon_animation/Dragon_Death.png'),
            new PIXI.Rectangle(col * (6080 / 4), row * (7536 / 8), 6080 / 4, 7536 / 8)
        );
    })

    return {
        dragonFlyTextures,
        dragonAttackTextures,
        dragonDeathTextures
    }
}

export default useDragon
