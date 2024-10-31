import {MutableRefObject} from 'react'
import * as PIXI from 'pixi.js'

export const updateGraphicsAndText = (
    startButtonTextRef: MutableRefObject<PIXI.Text | null>,
    buttonTextRef: MutableRefObject<string>,
    button1Ref: MutableRefObject<PIXI.Graphics | null>,
    button2Ref: MutableRefObject<PIXI.Graphics | null>,
    button1ColorRef: MutableRefObject<number>,
    button2ColorRef: MutableRefObject<number>
): void => {
    if (startButtonTextRef.current) {
        startButtonTextRef.current!.text = buttonTextRef.current;
    }

    // Update button colors directly
    if (button1Ref.current) {
        button1Ref.current!.clear();
        button1Ref.current!.beginFill(button1ColorRef.current);
        button1Ref.current!.drawRoundedRect(760, 3480, 630, 100, 40);
        button1Ref.current!.endFill();
    }
    if (button2Ref.current) {
        button2Ref.current!.clear();
        button2Ref.current!.beginFill(button2ColorRef.current);
        button2Ref.current!.drawRoundedRect(760, 3380, 630, 180, 40);
        button2Ref.current!.endFill();
    }
}
