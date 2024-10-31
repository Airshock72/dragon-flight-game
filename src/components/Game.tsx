import {Stage} from '@pixi/react'
import useGame from '../hooks/useGame.ts'
import BackgroundParallax from './BackgroundParallax.tsx'
import ReservedScore from './ReservedScore.tsx'
import IceCube from './IceCube.tsx'
import Dragon from './Dragon.tsx'
import OuterFrame from './OuterFrame.tsx'

const Game = () => {
    const {
        iceCubeRef,
        buttonTextRef,
        button1Ref,
        button2Ref,
        button1ColorRef,
        button2ColorRef,
        iceSprite1Ref,
        brokenCube2Ref,
        lightningRef,
        sparkleRef,
        brokenCube1Ref,
        coinRef,
        steadyCoinRef,
        coinBackgroundRef,
        startButtonTextRef,
        fireRef,
        coinBalanceTextRef,
        dragonDeathRef,
        flashBalanceTextRef,
        flashBalanceRef,
        coinBalanceRef,
        coinNumberRef,
        dragonAttackRef,
        destroyCubeRef,
        dragonFlyRef,
        waySprite2Ref,
        cubeDestroyEffectRef,
        waySprite1Ref,
        iceSprite2Ref,
        iceSpriteRefs,
        scoreRef,
        handlePointerDown,
        handlePointerUp
    } = useGame()

    return (
        <Stage width={2160} height={3840}>
            <BackgroundParallax
                iceSprite1Ref={iceSprite1Ref}
                iceSpriteRefs={iceSpriteRefs}
                iceSprite2Ref={iceSprite2Ref}
                waySprite1Ref={waySprite1Ref}
                waySprite2Ref={waySprite2Ref}
            />
            <ReservedScore
                coinBackgroundRef={coinBackgroundRef}
                coinNumberRef={coinNumberRef}
                scoreRef={scoreRef}
                steadyCoinRef={steadyCoinRef}
                coinRef={coinRef}
                sparkleRef={sparkleRef}
            />
            <IceCube
                cubeDestroyEffectRef={cubeDestroyEffectRef}
                brokenCube1Ref={brokenCube1Ref}
                iceCubeRef={iceCubeRef}
                brokenCube2Ref={brokenCube2Ref}
                destroyCubeRef={destroyCubeRef}
            />
           <Dragon
                dragonFlyRef={dragonFlyRef}
                dragonAttackRef={dragonAttackRef}
                dragonDeathRef={dragonDeathRef}
                lightningRef={lightningRef}
                fireRef={fireRef}
           />
            <OuterFrame
                coinBalanceTextRef={coinBalanceTextRef}
                flashBalanceTextRef={flashBalanceTextRef}
                coinBalanceRef={coinBalanceRef}
                flashBalanceRef={flashBalanceRef}
                startButtonTextRef={startButtonTextRef}
                handlePointerUp={handlePointerUp}
                handlePointerDown={handlePointerDown}
                buttonTextRef={buttonTextRef}
                button2Ref={button2Ref}
                button2ColorRef={button2ColorRef}
                button1Ref={button1Ref}
                button1ColorRef={button1ColorRef}
            />
        </Stage>
    )
}

export default Game
