import {SubElementsTypes, SubTypes} from "./App"
import {Dispatch, SetStateAction, useState} from "react"

interface RecursiveNodeTypes {
    el: SubElementsTypes
    sub: SubElementsTypes[]
    setSub: Dispatch<SetStateAction<SubElementsTypes[]>>
}

const RecursiveNode = ({el, sub, setSub}: RecursiveNodeTypes) => {
    console.log('ALL TREE PROPS SUB', sub)

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
                if (!elems.sub) elems.sub = [{name: '', created: false, id: Math.random(), sub: null}]
                else elems.sub = [...elems.sub, {name: '', created: false, id: Math.random(), sub: null}]
            } else if (elems.sub) createEmptyElement(elems.sub, elemId)
        }
        setSub(prev => [...prev])
    }

    if (el.created) {
        return <div className='sub_node_wrapper'>
            <div className='sub_node_elements'>
                <div className='sub_node_created'>
                    {el.name}
                </div>
                <button
                    className='main_node add_btn'
                    onClick={createEmptyElement.bind(null, sub, el.id)}
                >+
                </button>
                <button
                    className='main_node add_btn'
                    onClick={addUpdateSubElement.bind(null, sub, el.id, true)}
                >\
                </button>
                <button
                    className='main_node add_btn'
                    onClick={removeSubElement.bind(null, sub, el.id, el)}
                >-
                </button>
            </div>
            <div className='sub_node_container'>
                {el.sub && el.sub.map((subEl, subIndex) => {
                    return <RecursiveNode key={subIndex} el={subEl} sub={sub} setSub={setSub}/>
                })}
            </div>
        </div>
    } else {
        return <div className='sub_node_wrapper'>
            <div className='sub_node_elements'>
                <div className='sub_node_creating'>
                    <input value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <button
                    className='main_node add_btn'
                    onClick={removeSubElement.bind(null, sub, el.id, el)}
                >-
                </button>
                <button
                    className='main_node add_btn'
                    onClick={addUpdateSubElement.bind(null, sub, el.id, false)}
                >+
                </button>
            </div>
            <div className='sub_node_container'>
                {el.sub && el.sub.map((subEl, subIndex) => {
                    return <RecursiveNode key={subIndex} el={subEl} sub={sub} setSub={setSub}/>
                })}
            </div>
        </div>
    }
}

export default RecursiveNode