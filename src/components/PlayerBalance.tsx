import {Text} from '@pixi/react'
import {TextStyle} from 'pixi.js'

const PlayerBalance = ({ coinBalanceRef, flashBalanceRef, flashBalanceTextRef  }) => {

    return (
        <>
            <Text
                text={`${coinBalanceRef.current}`}
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
                ref={flashBalanceTextRef} // Reference to the text to update
                text={`${flashBalanceRef.current}`} // Set initial balance
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
