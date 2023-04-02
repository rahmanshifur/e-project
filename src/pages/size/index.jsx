import { useState } from "react";
import Create from "./create";
import Filter from "./filter";
import ListItems from "./list-items";
import Update from './update';


function Size() {
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

            <Filter />
            <ListItems editHandler={editHandler} isOpen={isOpen} editItem={editItem} />
        </div>
    )
}

export default Size