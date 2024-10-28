import {FC, MutableRefObject} from 'react'
import {AnimatedSprite} from '@pixi/react'
import * as PIXI from 'pixi.js'

interface IceCubeEffectAnimationProps {
    cubeDestroyEffectRef: MutableRefObject<PIXI.AnimatedSprite | null>;
}

const IceCubeEffectAnimation: FC<IceCubeEffectAnimationProps> = ({ cubeDestroyEffectRef }) => {

    const cubeDestroyEffectBaseTexture = PIXI.BaseTexture.from('/assets/VFX/Ice_Cube_Effect_Down.png')

    const sheetWidth = 4000; // Total width of the sprite sheet
    const sheetHeight = 6000; // Total height of the sprite sheet
    const frameWidth = sheetWidth / 4; // Width of each frame in the sprite sheet
    const frameHeight = sheetHeight / 6; // Height of each frame in the sprite sheet

    // Prepare cubeDestroyEffect animation frames
    const cubeDestroyEffectFrames = Array.from({ length: 18 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const texture = new PIXI.Texture(
            cubeDestroyEffectBaseTexture,
            new PIXI.Rectangle(col * frameWidth, row * frameHeight, frameWidth, frameHeight)
        );
        texture.rotate = 2; // Rotate each frame by 90 degrees to the left
        return texture;
    });

    return (
        <AnimatedSprite
            ref={cubeDestroyEffectRef}
            isPlaying={true}
            textures={cubeDestroyEffectFrames}
            initialFrame={0}
            animationSpeed={0.4}
            x={1200}
            y={2050}
            width={frameWidth} // Reduce width to 50% of the original
            height={frameHeight} // Reduce height to 50% of the original
            loop={false}
            visible={false}
        />
    )
}

export default IceCubeEffectAnimation
