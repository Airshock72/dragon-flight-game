import { FC, MutableRefObject, useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import {Sprite, Stage, AnimatedSprite, Graphics, Text, Container} from '@pixi/react'
import PlayerBalance from './PlayerBalance.tsx'
import CubeDestroyAnimation from './CubeDestroyAnimation.tsx'
import IceCubeEffectAnimation from './IceCubeEffectAnimation.tsx'
import FireThrowAnimation from './FireThrowAnimation.tsx'
import {TextStyle} from 'pixi.js'
import SparklesAnimation from './SparklesAnimation.tsx'
import LightningAnimation from './LightningAnimation.tsx'

const ParallaxBackground: FC = () => {
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

    const handlePointerDown = () => {
        // Adjust y positions
        if (button1Ref.current) button1Ref.current!.y += 10;
        if (button2Ref.current) button2Ref.current!.y += 10;
        textYRef.current += 10;
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
        if (startButtonTextRef.current) {
            startButtonTextRef.current!.text = buttonTextRef.current;
        }
        if (button1Ref.current) {
            button1Ref.current!.clear();
            button1Ref.current!.beginFill(button1ColorRef.current);
            button1Ref.current!.drawRoundedRect(760, 3480, 630, 100, 40);
            button1Ref.current!.endFill();
        }
        if (button2Ref.current) {
            button2Ref.current!.clear();
            button2Ref.current!.beginFill(button2ColorRef.current);
            button2Ref.current!.drawRoundedRect(760, 3380, 630, 180, 40);
            button2Ref.current!.endFill();
        }

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

                        // Listen for the completion of Dragon_Death animation
                        dragonDeathRef.current!.onComplete = () => {
                            dragonDeathRef.current!.visible = false;

                            // Optional: Show Dragon_Fly again
                            if (dragonFlyRef.current) {
                                dragonFlyRef.current!.visible = true;
                                dragonFlyRef.current!.gotoAndPlay(0);
                            }

                            if (lightningRef.current) {
                                lightningRef.current!.visible = false;
                            }
                        };
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
                dragonDeathRef.current!.visible = false;

                // Hide steady coin, score text, and coin background
                if (steadyCoinRef.current) {
                    steadyCoinRef.current!.visible = false;
                }

                if (coinRef.current) {
                    coinRef.current!.visible = false;
                }

                if (coinNumberRef.current) {
                    coinNumberRef.current!.visible = false;
                }

                if (coinBackgroundRef.current) {
                    coinBackgroundRef.current!.visible = false;
                }

                // Reset the score to 0
                scoreRef.current = 0;

                dragonDeathTriggered = false;

                // Optional: Show Dragon_Fly again
                if (dragonFlyRef.current) {
                    dragonFlyRef.current!.visible = true;
                    dragonFlyRef.current!.gotoAndPlay(0);
                }

                if (lightningRef.current) {
                    lightningRef.current!.visible = false;
                }
            };
        })
        ticker.start()

        return () => {
            ticker.stop()
            ticker.destroy()
        }
    }, [])

    return (
        <Stage width={2160} height={3840}>
            <Sprite
                image="/assets/Background.png"
                x={0}
                y={0}
                width={2160}
                height={3840}
            />
            <Sprite
                ref={iceSprite1Ref}
                image="/assets/Background_Ice.png"
                x={0}
                y={0}
                width={6000}
                height={3840}
            />
            <Sprite
                ref={iceSprite2Ref}
                image="/assets/Background_Ice.png"
                x={6000} // Positioned right after the first sprite
                y={0}
                width={6000}
                height={3840}
                anchor={{ x: 1, y: 0 }} // Anchor to the right side for flipping
                scale={{ x: -1, y: 1 }} // Flip horizontally using scale
            />
            <Sprite
                ref={waySprite1Ref}
                image="/assets/Way.png"
                x={0}
                y={2715}
                width={3500}
                height={500}
            />
            <Sprite
                ref={iceSpriteRefs.current[0]}
                image="/assets/Ice_01.png"
                x={0}
                y={2300}
                width={1000}
                height={500}
            />
            <Sprite
                ref={iceSpriteRefs.current[1]}
                image="/assets/Ice_02.png"
                x={3500}
                y={2300}
                width={1000}
                height={500}
            />
            <Sprite
                ref={iceSpriteRefs.current[2]}
                image="/assets/Ice_03.png"
                x={7000}
                y={2300}
                width={1000}
                height={500}
            />
            <Sprite
                ref={waySprite2Ref}
                image="/assets/Way.png"
                x={3500}
                y={2715}
                width={3500}
                height={500}
                anchor={{ x: 1, y: 0 }} // Anchor to the right side for flipping
                scale={{ x: -1, y: 1 }} // Flip horizontally using scale
            />
            <Graphics
                ref={coinBackgroundRef}
                draw={(g) => {
                    g.clear();
                    g.beginFill(0x1b3284, 0.3); // Update color to #bbbbbb
                    g.drawRoundedRect(1830, 1190, 400, 170, 20); // Increase width to 200 (or your desired width)
                    g.endFill();
                }}
                visible={false} // Initially hidden
            />
            <Text
                ref={coinNumberRef}
                text={`${scoreRef.current}`} // Initial score text
                x={1870}
                y={1240}
                visible={false}
                style={
                    new TextStyle({
                        align: 'center',
                        fill: ['#fff'],
                        fontSize: 60,
                        fontFamily: 'Keons'
                    })
                }
            />
            <Sprite
                ref={steadyCoinRef}
                image="/assets/Coin.png"
                x={2000} // Final position after animation
                y={1200}
                width={150}
                height={150}
                visible={false}
            />
            <Sprite
                ref={coinRef}
                image="/assets/Coin.png"
                x={1250}
                y={2500}
                width={150}
                height={150}
                visible={false}
            />
            <SparklesAnimation sparkleRef={sparkleRef} />
            <Sprite
                ref={iceCubeRef}
                image="/assets/Ice_Cube.png"
                x={5000}
                y={2430}
                width={400}
                height={400}
            />
            <Sprite
                ref={brokenCube1Ref}
                image="/assets/Ice_Cube_Broken_01.png"
                x={0} // Initially hidden
                y={2450}
                width={100}
                height={100}
                visible={false}
                rotation={-Math.PI / 2} // Rotate 90 degrees to the left
            />
            <Sprite
                ref={brokenCube2Ref}
                image="/assets/Ice_Cube_Up_Broken.png"
                x={0} // Initially hidden
                y={2450}
                width={100}
                height={100}
                visible={false}
                rotation={Math.PI / 2} // Rotate 90 degrees to the left
            />
            <CubeDestroyAnimation destroyCubeRef={destroyCubeRef} />
            <IceCubeEffectAnimation cubeDestroyEffectRef={cubeDestroyEffectRef} />
            <AnimatedSprite
                ref={dragonFlyRef}
                textures={Array.from({ length: 31 }, (_, index) => {
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    return new PIXI.Texture(
                        PIXI.BaseTexture.from('/assets/dragon_animation/Dragon_Fly.png'),
                        new PIXI.Rectangle(col * (5840 / 4), row * (5944 / 8), 5840 / 4, 5944 / 8)
                    );
                })}
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
                textures={Array.from({ length: 30 }, (_, index) => {
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    return new PIXI.Texture(
                        PIXI.BaseTexture.from('/assets/dragon_animation/Attack.png'),
                        new PIXI.Rectangle(col * (6656 / 4), row * (8864 / 8), 6656 / 4, 8864 / 8)
                    );
                })}
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
                textures={Array.from({ length: 32 }, (_, index) => {
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    return new PIXI.Texture(
                        PIXI.BaseTexture.from('/assets/dragon_animation/Dragon_Death.png'),
                        new PIXI.Rectangle(col * (6080 / 4), row * (7536 / 8), 6080 / 4, 7536 / 8)
                    );
                })}
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
            <Sprite
                image="/assets/Uv.png"
                x={0}
                y={0}
                width={2160}
                height={3840}
            />
            <PlayerBalance
                flashBalanceRef={flashBalanceRef}
                coinBalanceRef={coinBalanceRef}
                flashBalanceTextRef={flashBalanceTextRef}
                coinBalanceTextRef={coinBalanceTextRef}
            />
            <Container
                eventMode='dynamic'
                cursor="pointer"
                buttonMode={true}
                pointerdown={handlePointerDown}
                pointerup={handlePointerUp}
            >
                <Graphics
                    draw={g => {
                        g.clear()

                        g.beginFill(0x342a69);
                        g.drawRoundedRect(600, 3270, 950, 450, 20);
                        g.endFill();

                        g.beginFill(0x150f3b);
                        g.drawRoundedRect(700, 3480, 750, 180, 40);
                        g.endFill();

                        g.beginFill(0x7b72db);
                        g.drawRoundedRect(700, 3480, 750, 150, 40);
                        g.endFill();

                        g.beginFill(0x3e3773);
                        g.drawRoundedRect(700, 3480, 750, 140, 40);
                        g.endFill();

                        g.beginFill(0x2f2956);
                        g.drawRoundedRect(740, 3480, 680, 120, 40);
                        g.endFill();
                    }}
                />
                <Graphics
                    ref={button1Ref}
                    draw={(g) => {
                        g.clear();
                        g.beginFill(button1ColorRef.current); // Initial button color
                        g.drawRoundedRect(760, 3480, 630, 100, 40);
                        g.endFill();
                    }}
                />
                <Graphics
                    ref={button2Ref}
                    draw={(g) => {
                        g.clear();
                        g.beginFill(button2ColorRef.current);
                        g.drawRoundedRect(760, 3380, 630, 180, 40);
                        g.endFill();
                    }}
                />
                <Text
                    ref={startButtonTextRef} // Reference to text
                    text={buttonTextRef.current} // Initial button text
                    anchor={0.5} // Centers the text
                    x={1070} // Half of the button width (750)
                    y={3480} // Initial y position
                    style={
                        new PIXI.TextStyle({
                            fill: '#ffffff',
                            fontFamily: 'Keons',
                            fontSize: 80,
                            fontWeight: 'bold',
                        })
                    }
                />
            </Container>
        </Stage>
    )
}

export default ParallaxBackground
