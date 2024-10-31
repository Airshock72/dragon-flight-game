import {Container, Graphics, Text} from '@pixi/react'
import * as PIXI from 'pixi.js'
import {MutableRefObject} from 'react'
import useGameActionButton from '../hooks/useGameActionButton.ts'

interface GameActionButtonProps {
    handlePointerDown: () => void
    handlePointerUp: () => void
    button1Ref: MutableRefObject<PIXI.Graphics | null>
    button1ColorRef: MutableRefObject<number>
    button2Ref: MutableRefObject<PIXI.Graphics | null>
    button2ColorRef: MutableRefObject<number>
    startButtonTextRef: MutableRefObject<PIXI.Text | null>
    buttonTextRef: MutableRefObject<string>
}

const GameActionButton = (props: GameActionButtonProps) => {
    const {
        drawButtonGraphic,
        drawButton1Graphic,
        drawButton2Graphic,
        startButtonTextStyles
    } = useGameActionButton()

    const {
        handlePointerUp,
        handlePointerDown,
        button1Ref,
        button1ColorRef,
        button2Ref,
        button2ColorRef,
        startButtonTextRef,
        buttonTextRef
    } = props

    return (
        <Container
            eventMode='dynamic'
            cursor="pointer"
            buttonMode={true}
            pointerdown={handlePointerDown}
            pointerup={handlePointerUp}
        >
            <Graphics draw={g => drawButtonGraphic(g)}/>
            <Graphics ref={button1Ref} draw={(g) => drawButton1Graphic(g, button1ColorRef)}/>
            <Graphics ref={button2Ref} draw={(g) => drawButton2Graphic(g, button2ColorRef)}/>
            <Text
                ref={startButtonTextRef} // Reference to text
                text={buttonTextRef.current} // Initial button text
                anchor={0.5} // Centers the text
                x={1070} // Half of the button width (750)
                y={3480} // Initial y position
                style={startButtonTextStyles}
            />
        </Container>
    )
}

export default GameActionButton
