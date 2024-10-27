import {FC, useEffect, useState} from 'react'
import {Text} from '@pixi/react'
import {TextStyle} from 'pixi.js'

const PlayerBalance: FC = () => {
    const [coinBalance, setCoinBalance] = useState(200)
    const [flashBalance, setFlashBalance] = useState(100)

    useEffect(() => {
        const loadFont = async () => {
            try {
                const font = new FontFace('Keons', `url('/assets/font/Keons.240827-1105.otf')`)
                await font.load()
                document.fonts.add(font)
            } catch (error) {
                console.error('Font loading failed:', error)
            }
        }
        loadFont().then()
    }, [])

    return (
        <>
            <Text
                text={`${coinBalance}`}
                x={290}
                y={3560}
                style={
                    new TextStyle({
                        align: 'center',
                        fill: ['#fff'],
                        fontSize: 120,
                        fontFamily: 'Keons'
                    })
                }
            />
            <Text
                text={`${flashBalance}`}
                x={280}
                y={3350}
                style={
                    new TextStyle({
                        align: 'center',
                        fill: ['#fff'],
                        fontSize: 120,
                        fontFamily: 'Keons'
                    })
                }
            />
        </>
    )
}

export default PlayerBalance
