import {Sprite} from '@pixi/react'
import {MutableRefObject} from 'react'
import * as PIXI from 'pixi.js'
import PlayerBalance from './PlayerBalance.tsx'
import GameActionButton from './GameActionButton.tsx'

interface OuterFrameProps {
    flashBalanceRef: MutableRefObject<number>
    coinBalanceRef: MutableRefObject<number>
    flashBalanceTextRef: MutableRefObject<PIXI.Text | null>
    coinBalanceTextRef: MutableRefObject<PIXI.Text | null>
    handlePointerDown: () => void
    handlePointerUp: () => void
    button1Ref: MutableRefObject<PIXI.Graphics | null>
    button1ColorRef: MutableRefObject<number>
    button2Ref: MutableRefObject<PIXI.Graphics | null>
    button2ColorRef: MutableRefObject<number>
    startButtonTextRef: MutableRefObject<PIXI.Text | null>
    buttonTextRef: MutableRefObject<string>
}

const OuterFrame = (props: OuterFrameProps) => {
    const {
        coinBalanceTextRef,
        flashBalanceTextRef,
        flashBalanceRef,
        coinBalanceRef,
        startButtonTextRef,
        button1ColorRef,
        button2ColorRef,
        button2Ref,
        handlePointerDown,
        handlePointerUp,
        buttonTextRef,
        button1Ref
    } = props

    return (
        <>
            <Sprite
                image="/dragon-flight-game/assets/Uv.png"
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
            <GameActionButton
                button1ColorRef={button1ColorRef}
                button1Ref={button1Ref}
                button2ColorRef={button2ColorRef}
                button2Ref={button2Ref}
                buttonTextRef={buttonTextRef}
                handlePointerDown={handlePointerDown}
                handlePointerUp={handlePointerUp}
                startButtonTextRef={startButtonTextRef}
            />
        </>
    )
}

export default OuterFrame
