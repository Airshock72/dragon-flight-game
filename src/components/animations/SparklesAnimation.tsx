import {AnimatedSprite} from '@pixi/react'
import * as PIXI from 'pixi.js'
import {MutableRefObject} from 'react'

interface SparkleAnimationProps {
    sparkleRef: MutableRefObject<PIXI.AnimatedSprite | null>
}

const SparklesAnimation = (props: SparkleAnimationProps) => {
    const { sparkleRef } = props

    const sparklesTexture = PIXI.BaseTexture.from('/assets/VFX/sparkles.png')

    const sheetWidth = 3868; // Total width of the sprite sheet
    const sheetHeight = 5802; // Total height of the sprite sheet
    const frameWidth = sheetWidth / 4; // Width of each frame in the sprite sheet
    const frameHeight = sheetHeight / 6; // Height of each frame in the sprite sheet

    // Generate textures for each frame
    const sparklesFrames = Array.from({ length: 20 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            sparklesTexture,
            new PIXI.Rectangle(col * frameWidth, row * frameHeight, frameWidth, frameHeight)
        );
    });

    return (
        <AnimatedSprite
            ref={sparkleRef}
            isPlaying={true}
            textures={sparklesFrames}
            initialFrame={0}
            animationSpeed={0.4}
            x={1953}
            visible={false}
            y={1145}
            width={frameWidth * 0.25} // Reduce width to 50% of the original
            height={frameHeight * 0.25} // Reduce height to 50% of the original
            loop={false}
        />
    )
}

export default SparklesAnimation
