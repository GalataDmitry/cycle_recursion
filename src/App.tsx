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
    updating: boolean
    id: number
    line_id: number
    container_id: number
    sub: SubTypes[] | null
}

export interface SubElementsTypes {
    name: string
    created: boolean
    updating: boolean
    id: number
    line_id: number
    container_id: number
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

    // const div1 = document.getElementById('div1');
    // const div2 = document.getElementById('div2');
    // const line = document.getElementById('line');
    //
    // const top1 = div1!?.offsetTop;
    // const top2 = div2!?.offsetTop;
    //
    // const left1 = div1!?.offsetLeft + div1!?.offsetWidth / 2 ;
    // const left2 = div2!?.offsetLeft + div2!?.offsetWidth / 2;
    //
    // line!.style.width = Math.sqrt((top2 - top1) ** 2 + (left2 - left1) ** 2) + 'px';
    // // line!.style.transform = `rotate(${Math.atan2(top2 - top1, left2 - left1)}rad)`;
    // line!.style.top = top1 - 0.5 + 'px';
    // line!.style.left = left1 + 'px';

    // const line = document.getElementById('line');
    //
    // const div1 = document.getElementById('div1');
    // const div2 = document.getElementById('div2');
    // if (line && div1 && div2) {
    //
    //     const rect1 = div1!?.getBoundingClientRect();
    //     const rect2 = div2!?.getBoundingClientRect();
    //
    //     const top1 = rect1!?.top + window.pageYOffset;
    //     const top2 = rect2!?.top + window.pageYOffset;
    //     const left1 = rect1!?.left + window.pageXOffset + rect1!?.width / 2;
    //     const left2 = rect2!?.left + window.pageXOffset + rect2!?.width / 2;
    //
    //     const width = Math.sqrt((top2 - top1) ** 2 + (left2 - left1) ** 2);
    //
    //     line!.style.width = width + 'px';
    //     // line!.style.top = (top1 < top2 ? top1 : top2) + 'px';
    //     line!.style.top = top1 + 'px';
    //     // line!.style.left = (left1 < left2 ? left1 : left2) + 'px';
    //     // line.style.transformOrigin = '50% 100%'
    //     line!.style.left = left1 + 'px';
    //     // line!.style.transform = `rotate(${Math.atan2(top2 - top1, left2 - left1)}rad)`
    // }


    return <>


        {/*<div className='wrap'>*/}
        {/*    <div className='left' id='div1'/>*/}
        
        {/*    <div className='right' id='div2'/>*/}
        
        {/*    <div className="line" id="line"/>*/}
        {/*</div>*/}
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
                            updating: false,
                            id: Math.random(),
                            line_id: Math.random(),
                            container_id: Math.random(),
                            sub: null
                        }])}
                        className='main_node add_btn'
                    >+
                    </button>
                </div>
                <div className='sub_node_container'>
                    {subElements.map((el, index) => {
                        return <RecursiveNode key={index} el={el} nodes={subElements} setSub={setSubElements}/>
                    })}
                </div>
            </div>
        </div>
    </>
}

export default App
