import {MutableRefObject, useEffect, useRef} from 'react'
import * as PIXI from 'pixi.js'
import {UseGame} from '../types/useGame.ts'
import {updateGraphicsAndText} from '../helpers'

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

    const handlePointerDown = () => {
        // Adjust y positions
        if (button1Ref.current) button1Ref.current!.y += 10;
        if (button2Ref.current) button2Ref.current!.y += 10;
        textYRef.current += 10
    };

    const handlePointerUp = () => {
        // Adjust y positions back for button animations
        if (button1Ref.current) button1Ref.current!.y -= 10;
        if (button2Ref.current) button2Ref.current!.y -= 10;
        textYRef.current -= 10;

        // Toggle button text and color using refs directly
        buttonTextRef.current = buttonTextRef.current === 'START' ? 'CASH OUT' : 'START';
        button1ColorRef.current = button1ColorRef.current === 0x802c16 ? 0x316433 : 0x802c16;
        button2ColorRef.current = button2ColorRef.current === 0xd75e27 ? 0x72a639 : 0xd75e27;

        // Update Text and Graphics directly to avoid re-rendering
        updateGraphicsAndText(startButtonTextRef, buttonTextRef, button1Ref, button2Ref, button1ColorRef, button2ColorRef)

        // When "CASH OUT" is pressed, add scoreRef to coinBalanceRef
        if (buttonTextRef.current === 'START' && scoreRef.current > 0) {
            coinBalanceRef.current += scoreRef.current; // Add score to coin balance
            scoreRef.current = 0; // Reset score

            // Update the text for the coin balance directly
            if (coinBalanceTextRef.current) {
                coinBalanceTextRef.current!.text = `${coinBalanceRef.current}`;
            }

            // Hide the score text for scoreRef
            if (coinNumberRef.current) {
                coinNumberRef.current!.visible = false;
            }
        }

        // Reset positions and visibility if "CASH OUT" is pressed
        if (buttonTextRef.current === 'START') {
            // Reset relevant element positions and visibility
            iceCubeRef.current!.x = 5000;
            iceCubeRef.current!.visible = false;
            hasStartedRef.current = false;
            hasPlayedDestroyAnimation.current = false;
            scoreUpdated.current = false;
            sparklePlayingRef.current = false; // Reset sparkle animation flag

            // Reset animations and visibility for specific elements
            if (destroyCubeRef.current) destroyCubeRef.current!.visible = false;
            if (coinRef.current) coinRef.current!.visible = false;
            if (steadyCoinRef.current) steadyCoinRef.current!.visible = false;
            if (coinBackgroundRef.current) coinBackgroundRef.current!.visible = false;

            // Hide broken cubes
            if (brokenCube1Ref.current) brokenCube1Ref.current!.visible = false;
            if (brokenCube2Ref.current) brokenCube2Ref.current!.visible = false;

            // Reset dragon animations
            if (dragonFlyRef.current) {
                dragonFlyRef.current!.visible = true;
                dragonFlyRef.current!.gotoAndPlay(0);
            }
            if (dragonAttackRef.current) dragonAttackRef.current!.visible = false;
            if (dragonDeathRef.current) dragonDeathRef.current!.visible = false;

            // Reset fire animation
            if (fireRef.current) fireRef.current!.visible = false;

            // Reset sparkle and lightning animations
            if (sparkleRef.current) sparkleRef.current!.visible = false;
            if (lightningRef.current) lightningRef.current!.visible = false;
        }

        // Set hasStartedRef to true if "START" button was pressed again
        hasStartedRef.current = buttonTextRef.current === 'CASH OUT';
    };


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
        sparklePlayingRef,
        handlePointerDown,
        handlePointerUp
    }

}

export default useGame
