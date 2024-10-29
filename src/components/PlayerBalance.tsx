import {FC, useState} from 'react'
import {Text} from '@pixi/react'
import {TextStyle} from 'pixi.js'

const PlayerBalance: FC = () => {
    const [coinBalance, setCoinBalance] = useState(200)
    const [flashBalance, setFlashBalance] = useState(100)

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
