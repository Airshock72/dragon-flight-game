import {MutableRefObject} from 'react'
import * as PIXI from 'pixi.js'
import {AnimatedSprite} from '@pixi/react'
import LightningAnimation from './animations/LightningAnimation.tsx'
import FireThrowAnimation from './animations/FireThrowAnimation.tsx'
import useDragon from '../hooks/useDragon.ts'

interface DragonProps {
    dragonFlyRef: MutableRefObject<PIXI.AnimatedSprite | null>
    dragonAttackRef: MutableRefObject<PIXI.AnimatedSprite | null>
    dragonDeathRef: MutableRefObject<PIXI.AnimatedSprite | null>
    lightningRef: MutableRefObject<PIXI.AnimatedSprite | null>
    fireRef: MutableRefObject<PIXI.AnimatedSprite | null>
}

const Dragon = (props: DragonProps) => {
    const {
        dragonFlyTextures,
        dragonAttackTextures,
        dragonDeathTextures
    } = useDragon()

    const {
        dragonFlyRef,
        dragonAttackRef,
        dragonDeathRef,
        fireRef,
        lightningRef
    } = props

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
