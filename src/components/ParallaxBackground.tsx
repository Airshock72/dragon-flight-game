import {FC, useEffect, useRef} from 'react'
import * as PIXI from 'pixi.js'
import {Sprite, Stage} from '@pixi/react'

const ParallaxBackground: FC = () => {

    const iceSprite1Ref = useRef<PIXI.Sprite | null>(null)
    const iceSprite2Ref = useRef<PIXI.Sprite | null>(null)
    const waySprite1Ref = useRef<PIXI.Sprite | null>(null)
    const waySprite2Ref = useRef<PIXI.Sprite | null>(null)

    useEffect(() => {
        if (!iceSprite1Ref.current || !iceSprite2Ref.current || !waySprite1Ref.current || !waySprite2Ref.current) return

        const ticker = new PIXI.Ticker()
        ticker.add(() => {
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
                ref={waySprite2Ref}
                image="/assets/Way.png"
                x={3500}
                y={2715}
                width={3500}
                height={500}
                anchor={{ x: 1, y: 0 }} // Anchor to the right side for flipping
                scale={{ x: -1, y: 1 }} // Flip horizontally using scale
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
