import * as PIXI from 'pixi.js'
import {AnimatedSprite} from '@pixi/react'
import {MutableRefObject} from 'react'

interface LightningAnimationProps {
    lightningRef: MutableRefObject<PIXI.AnimatedSprite | null>
}

const LightningAnimation = (props: LightningAnimationProps) => {
    const { lightningRef } = props
    const lightningTexture = PIXI.BaseTexture.from('/assets/VFX/lighting_Attack.png')

    const sheetWidth = 3868; // Total width of the sprite sheet
    const sheetHeight = 4835; // Total height of the sprite sheet
    const frameWidth = sheetWidth / 4; // Width of each frame in the sprite sheet
    const frameHeight = sheetHeight / 5 // Height of each frame in the sprite sheet

    const lightningFrames = Array.from({ length: 16 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            lightningTexture,
            new PIXI.Rectangle(col * frameWidth, row * frameHeight, frameWidth, frameHeight)
        );
    });

    return (
        <AnimatedSprite
            isPlaying={true}
            ref={lightningRef}
            textures={lightningFrames}
            initialFrame={0}
            animationSpeed={0.4}
            x={-100}
            visible={false}
            y={480}
            width={frameWidth * 1.3} // Reduce width to 50% of the original
            height={frameHeight * 1.3} // Reduce height to 50% of the original
            loop={false}
        />
    )
}

export default LightningAnimation
