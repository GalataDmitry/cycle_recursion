import {useState} from "react"
import RecursiveNode from "./RecursiveNode"
import './App.css'

interface StartPositionTypes {
    x: null | number
    y: null | number
    change: boolean
}

interface StartSizeTypes {
    width: null | string
    height: null | string
    change: boolean
}

export interface SubTypes {
    name: string
    created: boolean
    id: number
    sub: SubTypes[] | null
}

export interface SubElementsTypes {
    name: string
    created: boolean
    id: number
    sub: SubTypes[] | null
}

function App() {

    // const subElementsTest = [
    //     {name: '1', created: true, id: Math.random(), sub: null},
    //     // {name: '1', created: true, id: Math.random(), sub: [{name: 'sub 1', created: true, id: Math.random(),sub: [{name: 'SUB 1 sub 1', created: true, id: Math.random(),sub: null}, {name: 'SUB 1 sub 2', created: true, id: Math.random(),sub: null}]}, { name: 'sub 2', created: true, id: Math.random(), sub: [{name: 'SUB 2 sub 1', created: true, id: Math.random(),sub: [{name: 'SUB 2 SUB 1 sub 1', created: true, id: Math.random(),sub: null}, {name: 'SUB 2 SUB 1 sub 2', created: true, id: Math.random(),sub: null}]}, {name: 'SUB 2 sub 2', created: true, id: Math.random(),sub: null}]}]},
    //     { name: '2', created: true, id: Math.random(), sub: [{ name: 'sub 2', created: true, id: Math.random(), sub: [{ name: 'sub sub 2', created: true, id: Math.random(), sub: null }] }] }
    // ];

    const [cursorPosition, setCursorPosition] = useState({x: 0, y: 0})
    const [startPosition, setStartPosition] = useState<StartPositionTypes>({x: null, y: null, change: true})
    const [startSize, setStartSize] = useState<StartSizeTypes>({width: null, height: null, change: true})
    const [subElements, setSubElements] = useState<SubElementsTypes[]>([])
    // console.log('SUB APP', subElements)
    return <>
        <button
            onClick={() => {
                const elem = document.getElementById('draggable')
                elem!.style.position = 'absolute'
                elem!.style.left = `${startPosition.x}px`
                elem!.style.top = `${startPosition.y}px`
                // elem!.style.transition = 'transform 0.5s'
                // elem!.style.transform = `translate(${startPosition.x}px, ${startPosition.y}px)`
            }}
        >
            reset position
        </button>
        <button
            onClick={() => {
                const elem = document.getElementById('draggable')
                if (typeof startSize.width === "string" && typeof startSize.height === "string") {
                    elem!.style.width = startSize.width
                    elem!.style.height = startSize.height
                }
            }}
        >reset size
        </button>
        <button
            onClick={() => {
                const elem = document.getElementById('draggable')
                const styles = window.getComputedStyle(elem!)
                if (startSize.change)
                    setStartSize({width: styles.width, height: styles.height, change: false})
                const percentWidth = Number(styles.width.slice(0, -2)) * 0.1
                const percentHeight = Number(styles.height.slice(0, -2)) * 0.1
                elem!.style.width = `${Number(styles.width.slice(0, -2)) - percentWidth}px`
                elem!.style.height = `${Number(styles.height.slice(0, -2)) - percentHeight}px`
            }}
        >-
        </button>
        <button
            onClick={() => {
                const elem = document.getElementById('draggable')
                const styles = window.getComputedStyle(elem!)
                if (startSize.change)
                    setStartSize({width: styles.width, height: styles.height, change: false})
                const percentWidth = Number(styles.width.slice(0, -2)) * 0.1
                const percentHeight = Number(styles.height.slice(0, -2)) * 0.1
                elem!.style.width = `${Number(styles.width.slice(0, -2)) + percentWidth}px`
                elem!.style.height = `${Number(styles.height.slice(0, -2)) + percentHeight}px`
            }}
        >+
        </button>
        <div
            id="droppable"
            className="App"
            onDrop={e => {
                e.preventDefault()
                const elem = document.getElementById('draggable')
                elem!.style.position = 'absolute'
                elem!.style.left = `${e.clientX - cursorPosition.x}px`
                elem!.style.top = `${e.clientY - cursorPosition.y}px`

            }}
            onDragOver={e => e.preventDefault()}
        >
            <div
                id="draggable"
                draggable
                className='container'
                onDragStart={e => {
                    const elem = document.getElementById('draggable')
                    const rect = elem!.getBoundingClientRect()
                    setCursorPosition({x: e.clientX - rect.left, y: e.clientY - rect.top})
                    if (startPosition.change && rect) {
                        setStartPosition({x: rect.left, y: rect.top, change: false})
                    }
                }}
            >
                <div className='main_node_wrapper'>
                    <div className="main_node">
                        ROOT
                    </div>
                    <button
                        onClick={() => setSubElements([...subElements, {
                            name: '',
                            created: false,
                            id: Math.random(),
                            sub: null
                        }])}
                        className='main_node add_btn'
                    >+
                    </button>
                </div>
                <div className='sub_node_container'>
                    {subElements.map((el, index) => {
                        return <RecursiveNode key={index} el={el} sub={subElements} setSub={setSubElements}/>
                    })}
                </div>
            </div>
        </div>
    </>
}

export default App;
