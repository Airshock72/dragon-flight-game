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
                const font = new FontFace('Keons', `url('/dragon-flight-game/assets/font/Keons.240827-1105.otf')`)
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

    useEffect(() => {

        const ticker = new PIXI.Ticker()
        let iceCubeMovingRight = false; // Flag to track rightward movement
        let fireThrown = false; // Track if fire animation has been triggered
        const arcDuration = 30; // Adjust for arc animation speed
        let arcStep = 0;
        let dragonDeathTriggered = false; // Flag to trigger dragon death animation only once

        const coinArcDuration = 50 // Duration for coin arc animation
        let coinArcStep = 0
        let coinAnimating = false // Track if coin animation is running

        ticker.add(() => {
            // Background_Ice.png animation logic
            if (iceSprite1Ref.current && iceSprite2Ref.current) {
                (iceSprite1Ref.current as PIXI.Sprite).x -= 2;
                (iceSprite2Ref.current as PIXI.Sprite).x -= 2;

                if ((iceSprite1Ref.current as PIXI.Sprite).x <= -(iceSprite1Ref.current as PIXI.Sprite).width) {
                    (iceSprite1Ref.current as PIXI.Sprite).x = (iceSprite2Ref.current as PIXI.Sprite).x + (iceSprite2Ref.current as PIXI.Sprite).width;
                }
                if ((iceSprite2Ref.current as PIXI.Sprite).x <= -(iceSprite2Ref.current as PIXI.Sprite).width) {
                    (iceSprite2Ref.current as PIXI.Sprite).x = (iceSprite1Ref.current as PIXI.Sprite).x + (iceSprite1Ref.current as PIXI.Sprite).width;
                }
            }

            // Way.png animation logic
            if (waySprite1Ref.current && waySprite2Ref.current) {
                (waySprite1Ref.current as PIXI.Sprite).x -= 15;
                (waySprite2Ref.current as PIXI.Sprite).x -= 15;

                if ((waySprite1Ref.current as PIXI.Sprite).x <= -(waySprite1Ref.current as PIXI.Sprite).width) {
                    (waySprite1Ref.current as PIXI.Sprite).x = (waySprite2Ref.current as PIXI.Sprite).x + (waySprite2Ref.current as PIXI.Sprite).width;
                }
                if ((waySprite2Ref.current as PIXI.Sprite).x <= -(waySprite2Ref.current as PIXI.Sprite).width) {
                    (waySprite2Ref.current as PIXI.Sprite).x = (waySprite1Ref.current as PIXI.Sprite).x + (waySprite1Ref.current as PIXI.Sprite).width;
                }
            }

            // Ice_01.png, Ice_02.png, Ice_03.png animation logic
            iceSpriteRefs.current.forEach(iceRef => {
                if (iceRef.current) {
                    (iceRef.current as PIXI.Sprite).x -= 15;

                    if ((iceRef.current as PIXI.Sprite).x <= -(iceRef.current as PIXI.Sprite).width) {
                        const maxX = Math.max(...iceSpriteRefs.current.map(sprite => sprite.current?.x ?? 0));
                        (iceRef.current as PIXI.Sprite).x = maxX + (iceRef.current as PIXI.Sprite).width + 3500; // Add spacing
                    }
                }
            });

            if (!hasStartedRef.current) {
                // Do not show or update Ice_Cube.png until START is pressed
                if (iceCubeRef.current) iceCubeRef.current!.visible = false;
                return;
            }

            // Now add the rest of your ticker code, allowing Ice_Cube.png updates
            if (iceCubeRef.current) {
                iceCubeRef.current!.visible = true;
                iceCubeRef.current!.x -= 15;
                const isVisible = iceCubeRef.current!.x > 1500 - iceCubeRef.current!.width / 2;
                iceCubeRef.current!.visible = isVisible;

                if (destroyCubeRef.current) {
                    if (!isVisible && !hasPlayedDestroyAnimation.current) {
                        if (!isVisible && !hasPlayedDestroyAnimation.current) {

                            if (brokenCube1Ref.current) {
                                (brokenCube1Ref.current as PIXI.Sprite).x = (iceCubeRef.current as PIXI.Sprite).x;
                                (brokenCube1Ref.current as PIXI.Sprite).y = 2650; // Set Y position to ensure the same starting point
                                (brokenCube1Ref.current as PIXI.Sprite).visible = true;
                            }

                            if (brokenCube2Ref.current) {
                                // Position `Ice_Cube_Up_Broken.png` to the right of `Ice_Cube.png`
                                (brokenCube2Ref.current as PIXI.Sprite).x = (iceCubeRef.current as PIXI.Sprite).x + (iceCubeRef.current as PIXI.Sprite).width;
                                (brokenCube2Ref.current as PIXI.Sprite).y = 2650; // Set Y position to ensure the same starting point
                                (brokenCube2Ref.current as PIXI.Sprite).visible = true;
                            }

                            // Align the destroy animation x-position with iceCubeRef x-position
                            (destroyCubeRef.current as PIXI.Sprite).x = (iceCubeRef.current as PIXI.Sprite).x - 230;
                            (destroyCubeRef.current as PIXI.Sprite).visible = true;
                            (destroyCubeRef.current as PIXI.AnimatedSprite).gotoAndPlay(0);
                            cubeDestroyEffectRef.current!.gotoAndPlay(0);
                            hasPlayedDestroyAnimation.current = true;
                            arcStep = 0; // Reset arcStep for arc animation
                        }
                    }
                }

                if (iceCubeRef.current!.x <= -(iceCubeRef.current!.width)) {
                    iceCubeRef.current!.x = Math.max(...iceSpriteRefs.current.map(sprite => sprite.current?.x ?? 0)) + iceCubeRef.current!.width - 1000;
                    hasPlayedDestroyAnimation.current = false;
                }
            }

            if (startButtonTextRef.current) {
                startButtonTextRef.current!.y = textYRef.current;
            }

            if (dragonAttackRef.current && fireRef.current) {
                const currentFrame = dragonAttackRef.current!.currentFrame;

                // Detect frame when fire animation should start
                if (currentFrame === 14 && !fireThrown) {
                    fireThrown = true;
                    fireRef.current!.visible = true;
                    fireRef.current!.gotoAndPlay(0);

                    // Deduct 5 points from flashBalanceRef and update text directly
                    flashBalanceRef.current -= 5;

                    // Ensure text updates with the new value
                    if (flashBalanceTextRef.current) {
                        flashBalanceTextRef.current!.text = `${flashBalanceRef.current}`;
                    }
                }

                // Reset fireThrown when dragonAttack finishes
                if (currentFrame >= dragonAttackRef.current!.totalFrames - 1) {
                    fireThrown = false;
                }
            }

            if (scoreRef.current === 300 && !dragonDeathTriggered) {
                dragonDeathTriggered = true; // Prevent re-triggering

                // Set timeout for 3 seconds before playing Dragon_Death animation
                setTimeout(() => {
                    if (dragonFlyRef.current) {
                        dragonFlyRef.current!.visible = false;
                    }
                    if (dragonDeathRef.current) {
                        dragonDeathRef.current!.visible = true;
                        dragonDeathRef.current!.loop = false;
                        dragonDeathRef.current!.gotoAndPlay(0);

                        // Start LightningAnimation synchronized with Dragon_Death
                        if (lightningRef.current) {
                            lightningRef.current!.visible = true;
                            lightningRef.current!.gotoAndPlay(0);
                        }
                    }
                }, 3000);
            }

            if (coinRef.current && destroyCubeRef.current!.visible) {
                coinVisibleRef.current = true; // Set visibility to true without causing re-render
            }

            if (steadyCoinRef.current && coinBackgroundRef.current) {
                coinBackgroundRef.current!.visible = steadyCoinRef.current!.visible;
            }

            if (coinBackgroundRef.current && coinBackgroundRef.current!.visible) {
                if (coinNumberRef.current) {
                    coinNumberRef.current!.visible = true;
                }
            }
            else {
                if (coinNumberRef.current) {
                    coinNumberRef.current!.visible = false;
                }
            }

            // Trigger coin arc animation after fire throw
            if (fireThrown && !coinAnimating) {
                coinAnimating = true;
                coinArcStep = 0;
                coinRef.current!.x = 1250; // Initial position
                coinRef.current!.y = 2500;
                coinRef.current!.visible = true; // Show coinRef initially
                scoreUpdated.current = false; // Reset the score update flag for new animation
            }

            if (coinAnimating && coinArcStep <= coinArcDuration) {
                const t = coinArcStep / coinArcDuration;
                const startX = 1250;
                const startY = 2500;
                const endX = 2000; // Set upper right corner target
                const endY = 1200;

                // Calculate arc path using a quadratic Bezier curve
                const controlX = (startX + endX) / 2;
                const controlY = startY - 300; // Height of the arc (adjust as needed)

                const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
                const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;

                coinRef.current!.x = x;
                coinRef.current!.y = y;
                coinArcStep++;
            }
            if (coinAnimating && coinArcStep > coinArcDuration && !scoreUpdated.current) {
                coinAnimating = false;
                coinRef.current!.visible = false;
                steadyCoinRef.current!.visible = true;

                // Trigger SparklesAnimation here only if it is not already playing
                if (!sparklePlayingRef.current && sparkleRef.current) {
                    sparklePlayingRef.current = true; // Set flag to indicate that sparkle animation is playing
                    sparkleRef.current!.visible = true;
                    sparkleRef.current!.gotoAndPlay(0); // Start the sparkle animation

                    // Add an event listener to detect when the animation completes
                    sparkleRef.current!.onComplete = () => {
                        sparkleRef.current!.visible = false;
                        sparklePlayingRef.current = false; // Reset the flag once the animation ends
                    };
                }

                scoreRef.current += 100; // Increment score only once
                scoreUpdated.current = true; // Set the flag to prevent further increments

                if (coinNumberRef.current) {
                    coinNumberRef.current!.text = `${scoreRef.current}`; // Update the text directly
                }
            }

            if (dragonAttackRef.current && fireRef.current) {
                const currentFrame = dragonAttackRef.current!.currentFrame!;
                if (currentFrame === 14 && !fireThrown) {
                    // Trigger fire animation
                    fireRef.current!.visible = true;
                    fireRef.current!.gotoAndPlay(0);
                    fireThrown = true;
                }

                // Reset fireThrown when dragonAttack finishes
                if (currentFrame >= dragonAttackRef.current!.totalFrames - 1) {
                    fireThrown = false;
                }
            }

            if (iceCubeRef.current) {
                const iceCubeSprite = iceCubeRef.current as PIXI.Sprite;

                if (iceCubeSprite.visible && !iceCubeMovingRight) {
                    iceCubeSprite.x += 10; // Move right
                    iceCubeSprite.y -= 5; // Move up slightly
                }

                // Stop movement once reaching the right edge
                if (iceCubeSprite.x >= 2160 - iceCubeSprite.width) { // Assuming 2160 is the stage width
                    iceCubeMovingRight = true;
                }

                if ((iceCubeRef.current as PIXI.Sprite).x <= -(iceCubeRef.current as PIXI.Sprite).width) {
                    (iceCubeRef.current as PIXI.Sprite).x = Math.max(...iceSpriteRefs.current.map(sprite => sprite.current?.x ?? 0)) + (iceCubeRef.current as PIXI.Sprite).width - 1000;
                    hasPlayedDestroyAnimation.current = false;
                }
            }

            if (destroyCubeRef.current && brokenCube1Ref.current && brokenCube2Ref.current) {
                if (arcStep < arcDuration) {
                    // Arc animation logic with additional leftward movement
                    (brokenCube1Ref.current as PIXI.Sprite).x -= 15; // Leftward movement along with the arc
                    (brokenCube1Ref.current as PIXI.Sprite).x -= 4;
                    (brokenCube1Ref.current as PIXI.Sprite).y += Math.sin((arcStep / arcDuration) * Math.PI) * 11;

                    (brokenCube2Ref.current as PIXI.Sprite).x -= 5; // Leftward movement along with the arc
                    (brokenCube2Ref.current as PIXI.Sprite).y += Math.sin((arcStep / arcDuration) * Math.PI) * 6;

                    arcStep++;
                } else {
                    // Resume usual leftward movement after arc animation
                    [brokenCube1Ref, brokenCube2Ref].forEach(ref => {
                        if (ref.current) {
                            (ref.current as PIXI.Sprite).x -= 15;
                            if ((ref.current as PIXI.Sprite).x <= -(ref.current as PIXI.Sprite).width) (ref.current as PIXI.Sprite).visible = false
                        }
                    });
                }
            }

            // Move IceCubeEffectAnimation left if visible and playing
            if (cubeDestroyEffectRef.current && cubeDestroyEffectRef.current!.visible) {
                cubeDestroyEffectRef.current!.x -= 15;

                // Optional: reset or hide once off-screen
                if (cubeDestroyEffectRef.current!.x <= -cubeDestroyEffectRef.current!.width) {
                    cubeDestroyEffectRef.current!.visible = false; // Adjust logic if you want it to reappear
                }
            }

            // Reset position and play the animation when triggered
            if (!cubeDestroyEffectRef.current!.visible && hasPlayedDestroyAnimation.current!) {
                cubeDestroyEffectRef.current!.x = 1000; // Set to a default starting position
                cubeDestroyEffectRef.current!.visible = true;
                cubeDestroyEffectRef.current!.gotoAndPlay(0);
            }

            if (dragonFlyRef.current && dragonAttackRef.current) {
                // Trigger the attack animation when Ice_Cube.png reaches the middle of the screen
                if (!isAttacking.current && iceCubeRef.current && (iceCubeRef.current as PIXI.Sprite).x <= 1700 && (iceCubeRef.current as PIXI.Sprite).x > 1200) {
                    isAttacking.current = true;
                    dragonFlyRef.current!.visible = false;
                    dragonAttackRef.current!.visible = true;
                    dragonAttackRef.current!.gotoAndPlay(0);
                }

                // Switch back to flying after attack animation is complete
                if (isAttacking.current && dragonAttackRef.current!.currentFrame >= dragonAttackRef.current!.totalFrames - 1) {
                    isAttacking.current = false;
                    dragonAttackRef.current!.visible = false;
                    dragonFlyRef.current!.visible = true;
                    dragonFlyRef.current!.gotoAndPlay(0);
                }
            }

            dragonDeathRef.current!.onComplete = () => {
                // Hide the Dragon Death animation and reset the dragon flight
                dragonDeathRef.current!.visible = false;
                dragonDeathTriggered = false;

                // Reset button text and colors
                buttonTextRef.current = "START";
                button1ColorRef.current = 0x802c16;
                button2ColorRef.current = 0xd75e27;

                // Update button text directly
                updateGraphicsAndText(startButtonTextRef, buttonTextRef, button1Ref, button2Ref, button1ColorRef, button2ColorRef)

                // Reset Ice_Cube and other elements' visibility
                if (iceCubeRef.current) {
                    iceCubeRef.current!.x = 5000; // Move off-screen
                    iceCubeRef.current!.visible = false;
                }

                hasStartedRef.current = false;
                hasPlayedDestroyAnimation.current = false;
                scoreUpdated.current = false;
                sparklePlayingRef.current = false;

                // Hide animations and reset relevant elements
                [destroyCubeRef, coinRef, steadyCoinRef, coinBackgroundRef, brokenCube1Ref, brokenCube2Ref, lightningRef, sparkleRef].forEach(ref => {
                    if (ref.current) ref.current!.visible = false;
                });

                // Reset the dragon flight animation
                if (dragonFlyRef.current) {
                    dragonFlyRef.current!.visible = true;
                    dragonFlyRef.current!.gotoAndPlay(0);
                }

                // Reset score and coin balance display
                scoreRef.current = 0;
                if (coinNumberRef.current) {
                    coinNumberRef.current!.visible = false;
                }

                // Hide fire animation
                if (fireRef.current) fireRef.current!.visible = false;

                // Reset text positions
                textYRef.current = 3480;
            };
        })
        ticker.start()

        return () => {
            ticker.stop()
            ticker.destroy()
        }
    }, [
        brokenCube1Ref,
        brokenCube2Ref,
        button1ColorRef,
        button1Ref,
        button2ColorRef,
        button2Ref,
        buttonTextRef,
        coinBackgroundRef,
        coinNumberRef,
        coinRef,
        coinVisibleRef,
        cubeDestroyEffectRef,
        destroyCubeRef,
        dragonAttackRef,
        dragonDeathRef,
        dragonFlyRef,
        fireRef,
        flashBalanceRef,
        flashBalanceTextRef,
        hasPlayedDestroyAnimation,
        hasStartedRef,
        iceCubeRef,
        iceSprite1Ref,
        iceSprite2Ref,
        iceSpriteRefs,
        isAttacking,
        lightningRef,
        scoreRef,
        scoreUpdated,
        sparklePlayingRef,
        sparkleRef,
        startButtonTextRef,
        steadyCoinRef,
        textYRef,
        waySprite1Ref,
        waySprite2Ref
    ])


    return {
       handlePointerUp,
        scoreRef,
        handlePointerDown,
        iceSpriteRefs,
        iceSprite2Ref,
        waySprite1Ref,
        waySprite2Ref,
        cubeDestroyEffectRef,
        destroyCubeRef,
        dragonAttackRef,
        dragonDeathRef,
        dragonFlyRef,
        fireRef,
        coinNumberRef,
        coinRef,
        coinBalanceRef,
        flashBalanceRef,
        flashBalanceTextRef,
        coinBalanceTextRef,
        startButtonTextRef,
        steadyCoinRef,
        brokenCube1Ref,
        brokenCube2Ref,
        coinBackgroundRef,
        sparkleRef,
        lightningRef,
        iceSprite1Ref,
        button2ColorRef,
        button2Ref,
        button1ColorRef,
        button1Ref,
        buttonTextRef,
        iceCubeRef
    }

}

export default useGame
