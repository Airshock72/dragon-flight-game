
import {FC, useRef} from 'react'
import * as PIXI from 'pixi.js'
import {AnimatedSprite} from '@pixi/react'


const DragonAttackAnimation: FC = () => {
    const dragonRef = useRef<PIXI.AnimatedSprite | null>(null)

    const dragonBaseTexture = PIXI.BaseTexture.from('/assets/dragon_animation/Attack.png')

    const sheetWidth = 6656; // Total width of the sprite sheet
    const sheetHeight = 8864; // Total height of the sprite sheet
    const frameWidth = sheetWidth / 4; // Width of each frame in the sprite sheet
    const frameHeight = sheetHeight / 8; // Height of each frame in the sprite sheet

    // Prepare dragon animation frames
    const dragonFrames = Array.from({ length: 30 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            dragonBaseTexture,
            new PIXI.Rectangle(col * frameWidth, row * frameHeight, frameWidth, frameHeight)
        );
    });

    return (
        <AnimatedSprite
            ref={dragonRef}
            textures={dragonFrames}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.5}
            x={-10}
            y={1370}
            width={frameWidth * 0.5} // Reduce width to 50% of the original
            height={frameHeight * 0.5} // Reduce height to 50% of the original
            loop={true}
        />
    )
}

export default DragonAttackAnimation
