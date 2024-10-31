import {MutableRefObject} from 'react'
import {Graphics, TextStyle} from 'pixi.js'
import * as PIXI from 'pixi.js'

interface UseGameActionButton {
    drawButtonGraphic: (g: Graphics) => void
    drawButton1Graphic: (g: Graphics, button1ColorRef: MutableRefObject<number>) => void
    drawButton2Graphic: (g: Graphics, button2ColorRef: MutableRefObject<number>) => void
    startButtonTextStyles: TextStyle
}

const useGameActionButton = (): UseGameActionButton => {
    const drawButtonGraphic = (g: Graphics) => {
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
    }

    const drawButton1Graphic = (g: Graphics, button1ColorRef: MutableRefObject<number>) => {
        g.clear();
        g.beginFill(button1ColorRef.current); // Initial button color
        g.drawRoundedRect(760, 3480, 630, 100, 40);
        g.endFill();
    }

    const drawButton2Graphic = (g: Graphics, button2ColorRef: MutableRefObject<number>) => {
        g.clear();
        g.beginFill(button2ColorRef.current);
        g.drawRoundedRect(760, 3380, 630, 180, 40);
        g.endFill();
    }

    const startButtonTextStyles = new PIXI.TextStyle({
        fill: '#ffffff',
        fontFamily: 'Keons',
        fontSize: 80,
        fontWeight: 'bold',
    })

    return {
        drawButtonGraphic,
        drawButton1Graphic,
        drawButton2Graphic,
        startButtonTextStyles
    }
}

export default useGameActionButton
