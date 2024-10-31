import {MutableRefObject} from 'react'
import * as PIXI from 'pixi.js'
import {Graphics, Sprite, Text} from '@pixi/react'
import {TextStyle} from 'pixi.js'
import SparklesAnimation from './SparklesAnimation.tsx'

interface ReservedScoreProps {
    coinBackgroundRef: MutableRefObject<PIXI.Graphics | null>
    coinNumberRef: MutableRefObject<PIXI.Text | null>
    scoreRef: MutableRefObject<number>
    steadyCoinRef: MutableRefObject<PIXI.Sprite | null>
    coinRef: MutableRefObject<PIXI.Sprite | null>
    sparkleRef: MutableRefObject<PIXI.AnimatedSprite | null>
}

const ReservedScore = (props: ReservedScoreProps) => {
    const coinNumberTextStyles = new TextStyle({
        align: 'center',
        fill: ['#fff'],
        fontSize: 60,
        fontFamily: 'Keons'
    })

    const {
        coinBackgroundRef,
        scoreRef,
        coinNumberRef,
        steadyCoinRef,
        coinRef,
        sparkleRef
    } = props
    return (
        <>
            <Graphics
                ref={coinBackgroundRef}
                draw={(g) => {
                    g.clear();
                    g.beginFill(0x1b3284, 0.3); // Update color to #bbbbbb
                    g.drawRoundedRect(1830, 1190, 400, 170, 20); // Increase width to 200 (or your desired width)
                    g.endFill();
                }}
                visible={false} // Initially hidden
            />
            <Text
                ref={coinNumberRef}
                text={`${scoreRef.current}`} // Initial score text
                x={1870}
                y={1240}
                visible={false}
                style={coinNumberTextStyles}
            />
            <Sprite
                ref={steadyCoinRef}
                image="/assets/Coin.png"
                x={2000} // Final position after animation
                y={1200}
                width={150}
                height={150}
                visible={false}
            />
            <Sprite
                ref={coinRef}
                image="/assets/Coin.png"
                x={1250}
                y={2500}
                width={150}
                height={150}
                visible={false}
            />
            <SparklesAnimation sparkleRef={sparkleRef} />
        </>
    )
}

export default ReservedScore
