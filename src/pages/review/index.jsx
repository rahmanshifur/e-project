import { useState } from "react"
import ListItems from './list-item'
import Create from "./create"
import Update from "./update"


function Review() {
    const [isOpen, setIsOpen] = useState(false)
    const [editItem, setEdiItem] = useState({})

    const editHandler = (item = {}) => {
        if (Object.keys(editItem).length !== 0) {
            setIsOpen(false)
        } else {
            setIsOpen(!isOpen)
        }
        setEdiItem(item)
    }

    return (
        <div>
            {Object.keys(editItem).length !== 0 ? <Update editItem={editItem} editHandler={editHandler} /> :
                isOpen && <Create editHandler={editHandler} />}

            <ListItems editHandler={editHandler} isOpen={isOpen} editItem={editItem} />
        </div>
    )
}

export default Review