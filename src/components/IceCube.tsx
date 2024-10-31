import {MutableRefObject} from 'react'
import * as PIXI from 'pixi.js'
import {Sprite} from '@pixi/react'
import CubeDestroyAnimation from './animations/CubeDestroyAnimation.tsx'
import IceCubeEffectAnimation from './animations/IceCubeEffectAnimation.tsx'

interface IceCubeProps {
    iceCubeRef: MutableRefObject<PIXI.Sprite | null>
    brokenCube1Ref: MutableRefObject<PIXI.Sprite | null>
    brokenCube2Ref: MutableRefObject<PIXI.Sprite | null>
    destroyCubeRef: MutableRefObject<PIXI.AnimatedSprite | null>
    cubeDestroyEffectRef: MutableRefObject<PIXI.AnimatedSprite | null>
}

const IceCube = (props: IceCubeProps) => {
    const {
        iceCubeRef,
        brokenCube1Ref,
        brokenCube2Ref,
        destroyCubeRef,
        cubeDestroyEffectRef
    } = props

    return (
        <>
            <Sprite
                ref={iceCubeRef}
                image="/dragon-flight-game/assets/Ice_Cube.png"
                x={5000}
                y={2430}
                width={400}
                height={400}
            />
            <Sprite
                ref={brokenCube1Ref}
                image="/dragon-flight-game/assets/Ice_Cube_Broken_01.png"
                x={0} // Initially hidden
                y={2450}
                width={100}
                height={100}
                visible={false}
                rotation={-Math.PI / 2} // Rotate 90 degrees to the left
            />
            <Sprite
                ref={brokenCube2Ref}
                image="/dragon-flight-game/assets/Ice_Cube_Up_Broken.png"
                x={0} // Initially hidden
                y={2450}
                width={100}
                height={100}
                visible={false}
                rotation={Math.PI / 2} // Rotate 90 degrees to the left
            />
            <CubeDestroyAnimation destroyCubeRef={destroyCubeRef} />
            <IceCubeEffectAnimation cubeDestroyEffectRef={cubeDestroyEffectRef} />
        </>
    )
}

export default IceCube
