import { useState, useRef, useEffect } from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'
import Box from '../TicTacToeBox'

let data = ["","","","","","","","",""]

const TicTacToe = () => {
    
    let [count, setCount] = useState(0)
    let [lock, setLock] = useState(false)
    let [title, setTitle] = useState(<h1 className="title">Tic Tac Toe In <span>React</span></h1>)

    let box1 = useRef(null)
    let box2 = useRef(null)
    let box3 = useRef(null)
    let box4 = useRef(null)
    let box5 = useRef(null)
    let box6 = useRef(null)
    let box7 = useRef(null)
    let box8 = useRef(null)
    let box9 = useRef(null)
    
    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]
    
    useEffect(() => {
        setTitle(<h1 className="title">Tic Tac Toe In <span>React</span></h1>)
    },[])

    const toggle = (e, num) => {
        if (lock || data[num] !== "") return
        
        if(count%2===0) 
        {
            e.target.innerHTML = `<img src='${cross_icon}'>`
            data[num]="x"
            setCount(++count)
        }
        else{
            e.target.innerHTML = `<img src='${circle_icon}'>`
            data[num]="o"
            setCount(++count)
        }
        checkWin()
    }

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ]

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }
    }

    const won = (winner) => {
        setLock(true)
        setTitle(
            <h1 className="title">
                Congratulations: <img src={winner === "x" ? cross_icon : circle_icon} alt="Winner" /> wins!
            </h1>
        )
    }

    const reset = () => {
        setLock(false)
        data = ["","","","","","","","",""]
        setTitle(<h1 className="title">Tic Tac Toe In <span>React</span></h1>)
        box_array.map((e) => {
            e.current.innerHTML = ""
        })
    }
    
    return (
        <div className='container'>
            <div className="title">{title}</div>
            <div className="board">
                <div className="row1">
                    <Box boxRef={box1} onClick={(e) => toggle(e, 0)} />
                    <Box boxRef={box2} onClick={(e) => toggle(e, 1)} />
                    <Box boxRef={box3} onClick={(e) => toggle(e, 2)} />
                </div>
                <div className="row2">
                    <Box boxRef={box4} onClick={(e) => toggle(e, 3)} />
                    <Box boxRef={box5} onClick={(e) => toggle(e, 4)} />
                    <Box boxRef={box6} onClick={(e) => toggle(e, 5)} />
                </div>
                <div className="row3">
                    <Box boxRef={box7} onClick={(e) => toggle(e, 6)} />
                    <Box boxRef={box8} onClick={(e) => toggle(e, 7)} />
                    <Box boxRef={box9} onClick={(e) => toggle(e, 8)} />
                </div>
            </div>
            <button className="reset" onClick={() => {reset()}}>Reset</button>
        </div>
    )
}

export default TicTacToe