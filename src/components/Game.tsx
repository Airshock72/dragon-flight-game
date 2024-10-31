import * as PIXI from 'pixi.js'
import {Sprite, Stage, AnimatedSprite, Graphics, Text, Container} from '@pixi/react'
import PlayerBalance from './PlayerBalance.tsx'
import CubeDestroyAnimation from './CubeDestroyAnimation.tsx'
import IceCubeEffectAnimation from './IceCubeEffectAnimation.tsx'
import FireThrowAnimation from './FireThrowAnimation.tsx'
import LightningAnimation from './LightningAnimation.tsx'
import useGame from '../hooks/useGame.ts'
import BackgroundParallax from './BackgroundParallax.tsx'
import ReservedScore from './ReservedScore.tsx'

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
            <Sprite
                ref={iceCubeRef}
                image="/assets/Ice_Cube.png"
                x={5000}
                y={2430}
                width={400}
                height={400}
            />
            <Sprite
                ref={brokenCube1Ref}
                image="/assets/Ice_Cube_Broken_01.png"
                x={0} // Initially hidden
                y={2450}
                width={100}
                height={100}
                visible={false}
                rotation={-Math.PI / 2} // Rotate 90 degrees to the left
            />
            <Sprite
                ref={brokenCube2Ref}
                image="/assets/Ice_Cube_Up_Broken.png"
                x={0} // Initially hidden
                y={2450}
                width={100}
                height={100}
                visible={false}
                rotation={Math.PI / 2} // Rotate 90 degrees to the left
            />
            <CubeDestroyAnimation destroyCubeRef={destroyCubeRef} />
            <IceCubeEffectAnimation cubeDestroyEffectRef={cubeDestroyEffectRef} />
            <AnimatedSprite
                ref={dragonFlyRef}
                textures={Array.from({ length: 31 }, (_, index) => {
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    return new PIXI.Texture(
                        PIXI.BaseTexture.from('/assets/dragon_animation/Dragon_Fly.png'),
                        new PIXI.Rectangle(col * (5840 / 4), row * (5944 / 8), 5840 / 4, 5944 / 8)
                    );
                })}
                isPlaying={true}
                initialFrame={0}
                animationSpeed={0.8}
                x={0}
                y={1500}
                width={(5840 / 4) * 0.5}
                height={(5944 / 8) * 0.5}
                loop={true}
                visible={true}
            />
            <AnimatedSprite
                ref={dragonAttackRef}
                textures={Array.from({ length: 30 }, (_, index) => {
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    return new PIXI.Texture(
                        PIXI.BaseTexture.from('/assets/dragon_animation/Attack.png'),
                        new PIXI.Rectangle(col * (6656 / 4), row * (8864 / 8), 6656 / 4, 8864 / 8)
                    );
                })}
                isPlaying={false}
                initialFrame={0}
                animationSpeed={0.5}
                x={-10}
                y={1370}
                width={(6656 / 4) * 0.5}
                height={(8864 / 8) * 0.5}
                loop={false}
                visible={false}
            />
            <AnimatedSprite
                ref={dragonDeathRef}
                textures={Array.from({ length: 32 }, (_, index) => {
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    return new PIXI.Texture(
                        PIXI.BaseTexture.from('/assets/dragon_animation/Dragon_Death.png'),
                        new PIXI.Rectangle(col * (6080 / 4), row * (7536 / 8), 6080 / 4, 7536 / 8)
                    );
                })}
                isPlaying={true}
                initialFrame={0}
                animationSpeed={0.5}
                x={5}
                y={1500}
                width={(6080 / 4) * 0.5}
                height={(7536 / 8) * 0.5}
                loop={false}
                visible={false}
            />
            <LightningAnimation lightningRef={lightningRef} />
            <FireThrowAnimation fireRef={fireRef} />
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
