import {AnimatedSprite} from '@pixi/react'
import * as PIXI from 'pixi.js'
import {MutableRefObject} from 'react'

interface FireThrowAnimationProps {
    fireRef: MutableRefObject<PIXI.AnimatedSprite | null>
}

const FireThrowAnimation = (props: FireThrowAnimationProps) => {
    const { fireRef } = props
    const fireTexture = PIXI.BaseTexture.from('/assets/VFX/Fire.png')

    const sheetWidth = 4000; // Total width of the sprite sheet
    const sheetHeight = 12000   ; // Total height of the sprite sheet
    const frameWidth = sheetWidth / 4; // Width of each frame in the sprite sheet
    const frameHeight = sheetHeight / 12; // Height of each frame in the sprite sheet

    const fireFrames = Array.from({ length: 44 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const texture =  new PIXI.Texture(
            fireTexture,
            new PIXI.Rectangle(col * frameWidth, row * frameHeight, frameWidth, frameHeight)
        )
        texture.rotate = 7
        return texture
    });

    return (
        <AnimatedSprite
            isPlaying={true}
            ref={fireRef}
            textures={fireFrames}
            initialFrame={0}
            animationSpeed={0.9}
            x={560}
            y={1740}
            width={frameWidth} // Reduce width to 50% of the original
            height={frameHeight} // Reduce height to 50% of the original
            loop={false}
            visible={false}
        />
    )
}

export default FireThrowAnimation
