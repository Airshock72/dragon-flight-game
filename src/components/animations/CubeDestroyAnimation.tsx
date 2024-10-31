import {MutableRefObject, useEffect} from 'react'
import {AnimatedSprite} from '@pixi/react'
import * as PIXI from 'pixi.js'

interface CubeDestroyAnimationProps {
    destroyCubeRef: MutableRefObject<PIXI.AnimatedSprite | null>
}

const CubeDestroyAnimation = (props: CubeDestroyAnimationProps) => {
    const { destroyCubeRef } = props

    const destroyCubeTexture = PIXI.BaseTexture.from('/assets/VFX/Cube.png')

    const sheetWidth = 4096; // Total width of the sprite sheet
    const sheetHeight = 4096; // Total height of the sprite sheet
    const frameWidth = sheetWidth / 4; // Width of each frame in the sprite sheet
    const frameHeight = sheetHeight / 8; // Height of each frame in the sprite sheet

    // Prepare dragon animation frames
    const destroyCubeFrames = Array.from({ length: 32 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            destroyCubeTexture,
            new PIXI.Rectangle(col * frameWidth, row * frameHeight, frameWidth, frameHeight)
        );
    });


    useEffect(() => {
        const ticker = new PIXI.Ticker();

        ticker.add(() => {
            if (destroyCubeRef.current) {
                (destroyCubeRef.current as PIXI.AnimatedSprite).x -= 15; // Move the cube left by 15 pixels per tick

                // Hide when it goes off-screen, and reset x position if needed
                if ((destroyCubeRef.current as PIXI.AnimatedSprite).x <= -frameWidth) {
                    (destroyCubeRef.current as PIXI.AnimatedSprite).visible = false;
                    (destroyCubeRef.current as PIXI.AnimatedSprite).stop(); // Stop the animation
                }
            }
        });

        ticker.start();

        return () => {
            ticker.stop();
            ticker.destroy();
        };
    }, [frameWidth, destroyCubeRef]);

    return (
        <AnimatedSprite
            isPlaying={true}
            ref={destroyCubeRef}
            textures={destroyCubeFrames}
            initialFrame={0}
            animationSpeed={0.4}
            x={1000}
            visible={false}
            y={2370}
            width={frameWidth} // Reduce width to 50% of the original
            height={frameHeight} // Reduce height to 50% of the original
            loop={false}
        />
    )
}

export default CubeDestroyAnimation
