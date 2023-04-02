import { useState } from "react";
import Create from "./create";
import Filter from "./filter";
import ListItems from "./list-items";
import Update from './update';


function State() {
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
            {Object.keys(editItem).length !== 0 ? <Update editHandler={editHandler} editItem={editItem} /> :
                isOpen && <Create editHandler={editHandler} />}

            <Filter />
            <ListItems editHandler={editHandler} isOpen={isOpen} editItem={editItem} />
        </div>
    )
}

export default State;