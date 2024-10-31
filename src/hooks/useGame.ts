import {MutableRefObject, useEffect, useRef} from 'react'
import * as PIXI from 'pixi.js'
import {UseGame} from '../types/useGame.ts'

const useGame = (): UseGame => {
    const scoreRef = useRef(0); // Initialize score as a ref
    const scoreUpdated = useRef(false); // Flag to prevent repeated increment
    const iceSpriteRefs = useRef<(MutableRefObject<PIXI.Sprite | null>)[]>([useRef(null), useRef(null), useRef(null)])
    const iceCubeRef = useRef<PIXI.Sprite | null>(null)
    const destroyCubeRef = useRef<PIXI.AnimatedSprite | null>(null)
    const cubeDestroyEffectRef = useRef<PIXI.AnimatedSprite | null>(null)
    const iceSprite1Ref = useRef<PIXI.Sprite | null>(null)
    const iceSprite2Ref = useRef<PIXI.Sprite | null>(null)
    const waySprite1Ref = useRef<PIXI.Sprite | null>(null)
    const waySprite2Ref = useRef<PIXI.Sprite | null>(null)
    const brokenCube1Ref = useRef<PIXI.Sprite | null>(null)
    const brokenCube2Ref = useRef<PIXI.Sprite | null>(null)
    const dragonFlyRef = useRef<PIXI.AnimatedSprite | null>(null)
    const dragonAttackRef = useRef<PIXI.AnimatedSprite | null>(null)
    const hasPlayedDestroyAnimation = useRef(false)
    const isAttacking = useRef(false)
    const fireRef = useRef<PIXI.AnimatedSprite | null>(null);
    const coinRef = useRef<PIXI.Sprite | null>(null); // New ref for Coin.png
    const steadyCoinRef = useRef<PIXI.Sprite | null>(null); // New ref for Coin.png
    const coinBackgroundRef = useRef<PIXI.Graphics | null>(null); // Ref for the gray background
    const coinVisibleRef = useRef(false); // Ref to control visibility without causing re-render
    const coinNumberRef = useRef<PIXI.Text | null>(null);
    const sparkleRef = useRef<PIXI.AnimatedSprite | null>(null);
    const lightningRef = useRef<PIXI.AnimatedSprite | null>(null);
    const dragonDeathRef = useRef<PIXI.AnimatedSprite | null>(null);
    const coinBalanceRef = useRef(500);
    const flashBalanceRef = useRef(1200); // Use ref instead of state
    const flashBalanceTextRef = useRef<PIXI.Text | null>(null); // Ref for the Text component
    const button1Ref = useRef<PIXI.Graphics | null>(null);
    const button2Ref = useRef<PIXI.Graphics | null>(null);
    const textYRef = useRef(3480); // Initial y position for the Text component
    const startButtonTextRef = useRef<PIXI.Text | null>(null); // Reference to the Text component
    const buttonTextRef = useRef("START"); // Ref to hold button text
    const button1ColorRef = useRef(0x802c16);
    const button2ColorRef = useRef(0xd75e27);
    const hasStartedRef = useRef(false); // Track if START button was pressed
    const coinBalanceTextRef = useRef<PIXI.Text | null>(null); // Ref for the coin balance text
    const sparklePlayingRef = useRef(false); // Track if SparklesAnimation is playing

    useEffect(() => {
        const loadFont = async () => {
            try {
                const font = new FontFace('Keons', `url('/assets/font/Keons.240827-1105.otf')`)
                await font.load()
                document.fonts.add(font)
            } catch (error) {
                console.error('Font loading failed:', error)
            }
        }
        loadFont().then()
    }, [])

    return {
        scoreRef,
        iceSpriteRefs,
        scoreUpdated,
        iceCubeRef,
        destroyCubeRef,
        cubeDestroyEffectRef,
        iceSprite1Ref,
        iceSprite2Ref,
        waySprite1Ref,
        waySprite2Ref,
        brokenCube1Ref,
        brokenCube2Ref,
        dragonFlyRef,
        dragonAttackRef,
        hasPlayedDestroyAnimation,
        isAttacking,
        fireRef,
        coinRef,
        steadyCoinRef,
        coinBackgroundRef,
        coinVisibleRef,
        coinNumberRef,
        sparkleRef,
        lightningRef,
        dragonDeathRef,
        button1Ref,
        button2Ref,
        coinBalanceRef,
        flashBalanceRef,
        flashBalanceTextRef,
        textYRef,
        buttonTextRef,
        button1ColorRef,
        button2ColorRef,
        hasStartedRef,
        startButtonTextRef,
        coinBalanceTextRef,
        sparklePlayingRef
    }

}

export default useGame
