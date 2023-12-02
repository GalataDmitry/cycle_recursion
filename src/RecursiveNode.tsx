import { SubElementsTypes, SubTypes         } from './App'
import {Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

interface RecursiveNodeTypes {
    el: SubElementsTypes
    nodes: SubElementsTypes[]
    setSub: Dispatch<SetStateAction<SubElementsTypes[]>>
}

const RecursiveNode = ({ el, nodes, setSub }: RecursiveNodeTypes) => {
    // console.log('ALL TREE PROPS SUB', nodes)
    const currentContainer = document.getElementById(`${el.container_id}`)
    if (currentContainer) console.log(currentContainer!.style.top)
    if (
        currentContainer &&
        currentContainer!.style.position === 'relative' &&
        currentContainer!.style.top !== ''
    )
        currentContainer!.style.position = 'static'

    const [name, setName] = useState('')

    const addUpdateSubElement = (sub: SubElementsTypes[], elemId: number, upd?: boolean) => {
        for (let elems of sub) {
            if (elems.id === elemId) {
                if (upd) {
                    elems.created = false
                    setName(elems.name)
                } else {
                    elems.created = true
                    elems.name = name
                }
            } else if (elems.sub) addUpdateSubElement(elems.sub, elemId, upd)
        }
        setSub(prev => [...prev])
    }

    const removeSubElement = (sub: SubElementsTypes[], elemId: number, targetElem: SubTypes) => {
        for (let elems of sub) {
            if (elems.id === elemId) setSub(prev => [...prev.filter(el => el.id !== elemId)])
            const removeElementIdx = elems.sub && elems.sub.findIndex(el => el.id === elemId)
            if (targetElem && removeElementIdx !== null && removeElementIdx >= 0) {
                if (elems.sub!.includes(targetElem)) {
                    elems.sub = [...elems.sub!.filter(el => el.id !== elemId)]
                    if (elems.sub.length === 0) elems.sub = null
                }
            } else if (elems.sub) removeSubElement(elems.sub, elemId, targetElem)
        }
        setSub(prev => [...prev])
    }
    const createEmptyElement = (sub: SubElementsTypes[], elemId: number) => {
        for (let elems of sub) {
            if (elems.id === elemId) {
                if (!elems.sub)
                    elems.sub = [
                        {
                            name: '',
                            created: false,
                            updating: false,
                            id: Math.random(),
                            line_id: Math.random(),
                            container_id: Math.random(),
                            sub: null
                        }
                    ]
                else
                    elems.sub = [
                        ...elems.sub,
                        {
                            name: '',
                            created: false,
                            updating: false,
                            id: Math.random(),
                            line_id: Math.random(),
                            container_id: Math.random(),
                            sub: null
                        }
                    ]
            } else if (elems.sub) createEmptyElement(elems.sub, elemId)
        }
        setSub(prev => [...prev])
    }

    const setLine = (sub: SubElementsTypes[], containerId: number, lineId: number) => {
        for (let elems of sub) {
            // console.log(elems)
            if (elems.sub) {
                if (elems.container_id === containerId) {
                    const ids = elems.sub.map(el => el.id)

                    const div1 = document.getElementById(`${ids[0]}`)
                    const div2 = document.getElementById(`${ids[ids.length - 1]}`)
                    const line = document.getElementById(`${elems.line_id}`)
                    // const line = document.getElementById(`${lineId}`)
                    const container = document.getElementById(`${elems.container_id}`)

                    // const container = document.getElementById(`${containerId}`)

                    // console.log('cont => id:', container!.id,)
                    // const containerRect = container!?.getBoundingClientRect()
                    // const lineRect = line!?.getBoundingClientRect()

                    const rect1 = div1!?.getBoundingClientRect()
                    const rect2 = div2!?.getBoundingClientRect()

                    const top1 = rect1!?.top + window.pageYOffset
                    const top2 = rect2!?.top + window.pageYOffset
                    const left1 = rect1!?.left + window.pageXOffset + rect1!?.width / 2
                    const left2 = rect2!?.left + window.pageXOffset + rect2!?.width / 2

                    const width = Math.sqrt((top2 - top1) ** 2 + (left2 - left1) ** 2)
                    line!.style.width = width + 'px'
                    line!.style.top = top1 + 'px'
                    line!.style.left = left1 + 'px'

                    // console.log(line!.style.top)
                    // console.log(container!.style.position)
                    const topOffset = line!.offsetTop - container!.offsetTop
                    const leftOffset = line!.offsetLeft - container!.offsetLeft

                    // if (container!.style.position === '') {
                    //     container!.style.position = 'relative'
                    //     line!.style.top = '15px'
                    //     line!.style.left = leftOffset + 'px'
                    // }
                    // console.log({topOffset}, {leftOffset})
                    container!.style.position = 'relative'
                    // line!.style.top = '15px'
                    line!.style.left = leftOffset + 'px'
                    line!.style.top = topOffset + 'px'
                    // container!.style.border = '1px solid red'
                } else if (elems.sub) setLine(elems.sub, containerId, lineId)
            }
        }
    }
    useEffect(() => {
        setLine(nodes, el.container_id, el.line_id)
    }, [nodes])

    // useEffect(() => {
    //     if (el.sub) {
    //         const ids = el.sub.map(el => el.id)
    //
    //         const div1 = document.getElementById(`${ids[0]}`)
    //         const div2 = document.getElementById(`${ids[ids.length - 1]}`)
    //         const line = document.getElementById(`${el.line_id}`)
    //         const container = document.getElementById(`${el.container_id}`)
    //         // console.log('parrent', line!.parentElement)
    //         // console.log('container_id', el.container_id)
    //         // console.log('line!.id', line!.id)
    //         // console.log('el.container_id!.id', container!.id)
    //
    //         const containerRect = container!?.getBoundingClientRect()
    //         const lineRect = line!?.getBoundingClientRect()
    //
    //         // const topOffset = line!.offsetTop - container!.offsetTop
    //         // const topOffset = lineRect.top - containerRect!?.top;
    //         // const leftOffset = line!.offsetLeft - container!.offsetLeft
    //         // const leftOffset = lineRect.left - containerRect!?.left;
    //
    //         const rect1 = div1!?.getBoundingClientRect()
    //         const rect2 = div2!?.getBoundingClientRect()
    //
    //         const top1 = rect1!?.top + window.pageYOffset
    //         const top2 = rect2!?.top + window.pageYOffset
    //         const left1 = rect1!?.left + window.pageXOffset + rect1!?.width / 2
    //         const left2 = rect2!?.left + window.pageXOffset + rect2!?.width / 2
    //
    //         // console.log(top1, left1)
    //
    //         // viewport position////////////
    //         const width = Math.sqrt((top2 - top1) ** 2 + (left2 - left1) ** 2)
    //         line!.style.width = width + 'px'
    //         line!.style.top = top1 + 'px'
    //         line!.style.left = left1 + 'px'
    //         ////////////////////////////////
    //
    //         const topOffset = line!.offsetTop - container!.offsetTop
    //         const leftOffset = line!.offsetLeft - container!.offsetLeft
    //         // console.log({leftOffset}, {topOffset})
    //         // console.log({line}, {container})
    //
    //
    //         container!.style.position = 'relative'
    //         line!.style.top = topOffset + 'px'
    //         line!.style.left = leftOffset + 'px'
    //         container!.style.border = '1px solid red'
    //
    //
    //     }
    //
    // }, [nodes])

    if (el.created) {
        return (
            <div className='sub_node_wrapper'>
                <div className='sub_node_elements'>
                    <div className='sub_node_created'>
                        {el.name}
                        <div id={`${el.id}`} className='top_line'></div>
                        <div className={el.sub ? 'bottom_line' : ''}></div>
                    </div>
                    <button
                        className='main_node add_btn'
                        onClick={createEmptyElement.bind(null, nodes, el.id)}>
                        +
                    </button>
                    <button
                        className='main_node add_btn'
                        onClick={addUpdateSubElement.bind(null, nodes, el.id, true)}>
                        \
                    </button>
                    <button
                        className='main_node add_btn'
                        onClick={removeSubElement.bind(null, nodes, el.id, el)}>
                        -
                    </button>
                </div>
                <div id={`${el.container_id}`} className='sub_node_container'>
                    <div className='line' id={`${el.line_id}`} />
                    {el.sub &&
                        el.sub.map((subEl, subIndex) => {
                            return (
                                <RecursiveNode
                                    key={subIndex}
                                    el={subEl}
                                    nodes={nodes}
                                    setSub={setSub}
                                />
                            )
                        })}
                </div>
            </div>
        )
    } else {
        return (
            <div className='sub_node_wrapper'>
                <div className='sub_node_elements'>
                    <div className='created_line_wrapper'>
                        <input
                            autoFocus
                            className='sub_node_creating'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <div id={`${el.id}`} className='top_line'></div>
                    </div>

                    <button
                        className='main_node add_btn'
                        onClick={removeSubElement.bind(null, nodes, el.id, el)}>
                        -
                    </button>
                    <button
                        className='main_node add_btn'
                        onClick={addUpdateSubElement.bind(null, nodes, el.id, false)}>
                        +
                    </button>
                </div>
                {el.sub &&
                    el.sub.map((subEl, subIndex) => {
                        return (
                            <RecursiveNode
                                key={subIndex}
                                el={subEl}
                                nodes={nodes}
                                setSub={setSub}
                            />
                        )
                    })}
            </div>
        )
    }
}

export default RecursiveNode
