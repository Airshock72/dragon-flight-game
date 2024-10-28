import { MutableRefObject, useEffect } from 'react';
import { AnimatedSprite } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface CubeDestroyAnimationProps {
    destroyCubeRef: MutableRefObject<PIXI.AnimatedSprite | null>;
}

// Create the texture and update its baseTexture for GPU upload
const destroyCubeTexture = PIXI.Texture.from('/assets/VFX/Cube.png');
destroyCubeTexture.baseTexture.update(); // Force GPU upload
const sheetWidth = 4096;
const sheetHeight = 4096;
const frameWidth = sheetWidth / 4;
const frameHeight = sheetHeight / 8;
const destroyCubeFrames = Array.from({ length: 32 }, (_, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    return new PIXI.Texture(
        destroyCubeTexture.baseTexture,
        new PIXI.Rectangle(col * frameWidth, row * frameHeight, frameWidth, frameHeight)
    );
});

const CubeDestroyAnimation = (props: CubeDestroyAnimationProps) => {
    useEffect(() => {
        // Cache the animation by running it in hidden mode
        if (props.destroyCubeRef.current) {
            props.destroyCubeRef.current!.visible = false;
            props.destroyCubeRef.current!.gotoAndPlay(0);
            props.destroyCubeRef.current!.onComplete = () => {
                props.destroyCubeRef.current?.stop();
                props.destroyCubeRef.current!.visible = true; // Make it visible when ready
            };
        }

        // Ticker setup for movement
        const ticker = new PIXI.Ticker();
        ticker.add(() => {
            if (props.destroyCubeRef.current) {
                props.destroyCubeRef.current!.x -= 15;

                if (props.destroyCubeRef.current!.x <= -frameWidth) {
                    props.destroyCubeRef.current!.visible = false;
                    props.destroyCubeRef.current!.stop();
                    props.destroyCubeRef.current!.x = 1000; // Reset position for next animation
                }
            }
        });

        ticker.start();
        return () => {
            ticker.stop();
            ticker.destroy();
        };
    }, [props.destroyCubeRef]);

    return (
        <AnimatedSprite
            isPlaying={true}
            ref={props.destroyCubeRef}
            textures={destroyCubeFrames}
            initialFrame={0}
            animationSpeed={0.4}
            x={1000}
            y={2370}
            width={frameWidth}
            height={frameHeight}
            loop={false}
        />
    );
};

export default CubeDestroyAnimation;
