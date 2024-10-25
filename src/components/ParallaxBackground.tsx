import {FC, MutableRefObject, useEffect, useRef} from 'react'
import * as PIXI from 'pixi.js'
import {AnimatedSprite, Sprite, Stage} from '@pixi/react'

const ParallaxBackground: FC = () => {

    const iceSpriteRefs = useRef<(MutableRefObject<PIXI.Sprite | null>)[]>([useRef(null), useRef(null), useRef(null)])
    const iceSprite1Ref = useRef<PIXI.Sprite | null>(null)
    const iceSprite2Ref = useRef<PIXI.Sprite | null>(null)
    const waySprite1Ref = useRef<PIXI.Sprite | null>(null)
    const waySprite2Ref = useRef<PIXI.Sprite | null>(null)
    const dragonRef = useRef<PIXI.AnimatedSprite | null>(null)

    const dragonBaseTexture = PIXI.BaseTexture.from('/assets/dragon_animation/Dragon_Fly.png')


    const sheetWidth = 5840; // Total width of the sprite sheet
    const sheetHeight = 5944; // Total height of the sprite sheet
    const frameWidth = sheetWidth / 4; // Width of each frame in the sprite sheet
    const frameHeight = sheetHeight / 8; // Height of each frame in the sprite sheet

    // Prepare dragon animation frames
    const dragonFrames = Array.from({ length: 31 }, (_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return new PIXI.Texture(
            dragonBaseTexture,
            new PIXI.Rectangle(col * frameWidth, row * frameHeight, frameWidth, frameHeight)
        );
    });


    useEffect(() => {
        if (
            iceSpriteRefs.current.some(ref => ref.current === null)
            || !waySprite1Ref.current
            || !waySprite2Ref.current
            || !iceSprite1Ref.current
            || !iceSprite2Ref.current
        ) return

        const ticker = new PIXI.Ticker()
        ticker.add(() => {

            iceSpriteRefs.current.forEach(iceRef => {
                if (iceRef.current) {
                    (iceRef.current as PIXI.Sprite).x -= 15; // Move the ice sprites to the left

                    // Reset position once completely off-screen
                    if ((iceRef.current as PIXI.Sprite).x <= -(iceRef.current as PIXI.Sprite).width) {
                        (iceRef.current as PIXI.Sprite).x = Math.max(...iceSpriteRefs.current.map(sprite => sprite.current?.x ?? 0)) + (iceRef.current as PIXI.Sprite).width + 3500; // Adding spacing between them
                    }
                }
            })
            if (iceSprite1Ref.current && iceSprite2Ref.current) {
                // Move both ice backgrounds to the left
                (iceSprite1Ref.current as PIXI.Sprite).x -= 2;
                (iceSprite2Ref.current as PIXI.Sprite).x -= 2

                // When the first sprite is completely off-screen, reset its position to the right of the second sprite
                if ((iceSprite1Ref.current as PIXI.Sprite).x <= -(iceSprite1Ref.current as PIXI.Sprite).width) {
                    (iceSprite1Ref.current as PIXI.Sprite).x = (iceSprite2Ref.current as PIXI.Sprite).x + (iceSprite2Ref.current as PIXI.Sprite).width
                }

                // When the second sprite is completely off-screen, reset its position to the right of the first sprite
                if ((iceSprite2Ref.current as PIXI.Sprite).x <= -(iceSprite2Ref.current as PIXI.Sprite).width) {
                    (iceSprite2Ref.current as PIXI.Sprite).x = (iceSprite1Ref.current as PIXI.Sprite).x + (iceSprite1Ref.current as PIXI.Sprite).width
                }
            }

            if (waySprite1Ref.current && waySprite2Ref.current) {
                // Move both way backgrounds to the left at a slower speed
                (waySprite1Ref.current as PIXI.Sprite).x -= 15; // Slower speed for Way.png
                (waySprite2Ref.current as PIXI.Sprite).x -= 15

                // When the first sprite is completely off-screen, reset its position to the right of the second sprite
                if ((waySprite1Ref.current as PIXI.Sprite).x <= -(waySprite1Ref.current as PIXI.Sprite).width) {
                    (waySprite1Ref.current as PIXI.Sprite).x = (waySprite2Ref.current as PIXI.Sprite).x + (waySprite2Ref.current as PIXI.Sprite).width
                }

                // When the second sprite is completely off-screen, reset its position to the right of the first sprite
                if ((waySprite2Ref.current as PIXI.Sprite).x <= -(waySprite2Ref.current as PIXI.Sprite).width) {
                    (waySprite2Ref.current as PIXI.Sprite).x = (waySprite1Ref.current as PIXI.Sprite).x + (waySprite1Ref.current as PIXI.Sprite).width
                }
            }
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
            <AnimatedSprite
                ref={dragonRef}
                textures={dragonFrames}
                isPlaying={true}
                initialFrame={0}
                animationSpeed={0.5}
                x={0}
                y={1500}
                width={frameWidth * 0.5} // Reduce width to 50% of the original
                height={frameHeight * 0.5} // Reduce height to 50% of the original
                loop={true}
            />
            <Sprite
                image="/assets/Uv.png"
                x={0}
                y={0}
                width={2160}
                height={3840}
            />
        </Stage>
    )
}

export default ParallaxBackground
