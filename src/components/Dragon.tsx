import {MutableRefObject} from 'react'
import * as PIXI from 'pixi.js'
import {AnimatedSprite} from '@pixi/react'
import LightningAnimation from './LightningAnimation.tsx'
import FireThrowAnimation from './FireThrowAnimation.tsx'

interface DragonProps {
    dragonFlyRef: MutableRefObject<PIXI.AnimatedSprite | null>
    dragonAttackRef: MutableRefObject<PIXI.AnimatedSprite | null>
    dragonDeathRef: MutableRefObject<PIXI.AnimatedSprite | null>
    lightningRef: MutableRefObject<PIXI.AnimatedSprite | null>
    fireRef: MutableRefObject<PIXI.AnimatedSprite | null>
}

const Dragon = (props: DragonProps) => {
    const {
        dragonFlyRef,
        dragonAttackRef,
        dragonDeathRef,
        fireRef,
        lightningRef
    } = props

    const dragonFlyTextures = Array.from({ length: 31 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            PIXI.BaseTexture.from('/assets/dragon_animation/Dragon_Fly.png'),
            new PIXI.Rectangle(col * (5840 / 4), row * (5944 / 8), 5840 / 4, 5944 / 8)
        );
    })

    const dragonAttackTextures = Array.from({ length: 30 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            PIXI.BaseTexture.from('/assets/dragon_animation/Attack.png'),
            new PIXI.Rectangle(col * (6656 / 4), row * (8864 / 8), 6656 / 4, 8864 / 8)
        );
    })

    const dragonDeathTextures = Array.from({ length: 32 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            PIXI.BaseTexture.from('/assets/dragon_animation/Dragon_Death.png'),
            new PIXI.Rectangle(col * (6080 / 4), row * (7536 / 8), 6080 / 4, 7536 / 8)
        );
    })

    return (
       <>
           <AnimatedSprite
               ref={dragonFlyRef}
               textures={dragonFlyTextures}
               isPlaying={true}
               initialFrame={0}
               animationSpeed={0.8}
               x={0}
               y={1500}
               width={(5840 / 4) * 0.5}
               height={(5944 / 8) * 0.5}
               loop={true}
               visible={true}
           />
           <AnimatedSprite
               ref={dragonAttackRef}
               textures={dragonAttackTextures}
               isPlaying={false}
               initialFrame={0}
               animationSpeed={0.5}
               x={-10}
               y={1370}
               width={(6656 / 4) * 0.5}
               height={(8864 / 8) * 0.5}
               loop={false}
               visible={false}
           />
           <AnimatedSprite
               ref={dragonDeathRef}
               textures={dragonDeathTextures}
               isPlaying={true}
               initialFrame={0}
               animationSpeed={0.5}
               x={5}
               y={1500}
               width={(6080 / 4) * 0.5}
               height={(7536 / 8) * 0.5}
               loop={false}
               visible={false}
           />
           <LightningAnimation lightningRef={lightningRef} />
           <FireThrowAnimation fireRef={fireRef} />
       </>
    )
}

export default Dragon
