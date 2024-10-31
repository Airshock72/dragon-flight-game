import {MutableRefObject} from 'react'
import * as PIXI from 'pixi.js'

export interface UseGame {
    scoreRef: MutableRefObject<number>
    scoreUpdated: MutableRefObject<boolean>
    iceSpriteRefs: MutableRefObject<MutableRefObject<PIXI.Sprite | null>[]>
    iceCubeRef: MutableRefObject<PIXI.Sprite | null>
    destroyCubeRef: MutableRefObject<PIXI.AnimatedSprite | null>
    cubeDestroyEffectRef: MutableRefObject<PIXI.AnimatedSprite | null>
    iceSprite1Ref: MutableRefObject<PIXI.Sprite | null>
    iceSprite2Ref: MutableRefObject<PIXI.Sprite | null>
    waySprite1Ref: MutableRefObject<PIXI.Sprite | null>,
    waySprite2Ref: MutableRefObject<PIXI.Sprite | null>
    brokenCube1Ref: MutableRefObject<PIXI.Sprite | null>
    brokenCube2Ref: MutableRefObject<PIXI.Sprite | null>
    dragonFlyRef: MutableRefObject<PIXI.AnimatedSprite | null>
    dragonAttackRef: MutableRefObject<PIXI.AnimatedSprite | null>
    hasPlayedDestroyAnimation: MutableRefObject<boolean>
    isAttacking: MutableRefObject<boolean>
    fireRef: MutableRefObject<PIXI.AnimatedSprite | null>,
    coinRef: MutableRefObject<PIXI.Sprite | null>
    steadyCoinRef: MutableRefObject<PIXI.Sprite | null>
    coinBackgroundRef: MutableRefObject<PIXI.Graphics | null>
    coinVisibleRef: MutableRefObject<boolean>
    coinNumberRef: MutableRefObject<PIXI.Text | null>
    sparkleRef: MutableRefObject<PIXI.AnimatedSprite | null>
    lightningRef: MutableRefObject<PIXI.AnimatedSprite | null>
    dragonDeathRef: MutableRefObject<PIXI.AnimatedSprite | null>
    coinBalanceRef: MutableRefObject<number>
    flashBalanceRef: MutableRefObject<number>
    flashBalanceTextRef: MutableRefObject<PIXI.Text | null>
    button1Ref: MutableRefObject<PIXI.Graphics | null>
    button2Ref: MutableRefObject<PIXI.Graphics | null>
    textYRef: MutableRefObject<number>
    startButtonTextRef: MutableRefObject<PIXI.Text | null>
    buttonTextRef: MutableRefObject<string>
    button1ColorRef: MutableRefObject<number>
    button2ColorRef: MutableRefObject<number>
    hasStartedRef: MutableRefObject<boolean>
    coinBalanceTextRef: MutableRefObject<PIXI.Text | null>
    sparklePlayingRef: MutableRefObject<boolean>
}
