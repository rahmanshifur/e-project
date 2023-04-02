import { useState } from "react/cjs/react.development"
import Create from "./create"
import ListItems from "./list-item"
import Update from './update';

function City() {

    const [isOpen, setIsOpen] = useState(false)
    const [editItem, setEditItem] = useState({})

    const editHandler = (item = {}) => {
        if (Object.keys(editItem).length !== 0) {
            setIsOpen(false)
        } else {
            setIsOpen(!isOpen)
        }
        setEditItem(item)
    }

    return (
        <div>
            {Object.keys(editItem).length !== 0 ? <Update editItem={editItem} editHandler={editHandler} /> :
                isOpen && <Create editHandler={editHandler} />}

            {/* <Filter /> */}
            <ListItems editHandler={editHandler} isOpen={isOpen} editItem={editItem} />
        </div>
    )
}

export default City