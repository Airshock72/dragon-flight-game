import {Sprite} from '@pixi/react'
import {MutableRefObject} from 'react'
import * as PIXI from 'pixi.js'

interface BackgroundParallaxProps {
    iceSprite1Ref: MutableRefObject<PIXI.Sprite | null>
    iceSprite2Ref: MutableRefObject<PIXI.Sprite | null>
    waySprite1Ref: MutableRefObject<PIXI.Sprite | null>
    iceSpriteRefs: MutableRefObject<MutableRefObject<PIXI.Sprite | null>[]>
    waySprite2Ref: MutableRefObject<PIXI.Sprite | null>
}

const BackgroundParallax = (props: BackgroundParallaxProps) => {
    const {
        iceSprite1Ref,
        iceSprite2Ref,
        waySprite1Ref,
        iceSpriteRefs,
        waySprite2Ref
    } = props

    return (
        <>
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
        </>
    )
}

export default BackgroundParallax
