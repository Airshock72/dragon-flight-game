import * as PIXI from 'pixi.js'
import {Sprite, Stage, Graphics, Text, Container} from '@pixi/react'
import PlayerBalance from './PlayerBalance.tsx'
import useGame from '../hooks/useGame.ts'
import BackgroundParallax from './BackgroundParallax.tsx'
import ReservedScore from './ReservedScore.tsx'
import IceCube from './IceCube.tsx'
import Dragon from './Dragon.tsx'

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
            <Sprite
                image="/assets/Uv.png"
                x={0}
                y={0}
                width={2160}
                height={3840}
            />
            <PlayerBalance
                flashBalanceRef={flashBalanceRef}
                coinBalanceRef={coinBalanceRef}
                flashBalanceTextRef={flashBalanceTextRef}
                coinBalanceTextRef={coinBalanceTextRef}
            />
            <Container
                eventMode='dynamic'
                cursor="pointer"
                buttonMode={true}
                pointerdown={handlePointerDown}
                pointerup={handlePointerUp}
            >
                <Graphics
                    draw={g => {
                        g.clear()

                        g.beginFill(0x342a69);
                        g.drawRoundedRect(600, 3270, 950, 450, 20);
                        g.endFill();

                        g.beginFill(0x150f3b);
                        g.drawRoundedRect(700, 3480, 750, 180, 40);
                        g.endFill();

                        g.beginFill(0x7b72db);
                        g.drawRoundedRect(700, 3480, 750, 150, 40);
                        g.endFill();

                        g.beginFill(0x3e3773);
                        g.drawRoundedRect(700, 3480, 750, 140, 40);
                        g.endFill();

                        g.beginFill(0x2f2956);
                        g.drawRoundedRect(740, 3480, 680, 120, 40);
                        g.endFill();
                    }}
                />
                <Graphics
                    ref={button1Ref}
                    draw={(g) => {
                        g.clear();
                        g.beginFill(button1ColorRef.current); // Initial button color
                        g.drawRoundedRect(760, 3480, 630, 100, 40);
                        g.endFill();
                    }}
                />
                <Graphics
                    ref={button2Ref}
                    draw={(g) => {
                        g.clear();
                        g.beginFill(button2ColorRef.current);
                        g.drawRoundedRect(760, 3380, 630, 180, 40);
                        g.endFill();
                    }}
                />
                <Text
                    ref={startButtonTextRef} // Reference to text
                    text={buttonTextRef.current} // Initial button text
                    anchor={0.5} // Centers the text
                    x={1070} // Half of the button width (750)
                    y={3480} // Initial y position
                    style={
                        new PIXI.TextStyle({
                            fill: '#ffffff',
                            fontFamily: 'Keons',
                            fontSize: 80,
                            fontWeight: 'bold',
                        })
                    }
                />
            </Container>
        </Stage>
    )
}

export default Game
