import { useState } from "react/cjs/react.development";
import Create from "./create";
import Filter from "./filter";
import ListItems from "./list-items";
import Update from "./update";


function Product() {

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
            {Object.keys(editItem).length !== 0 ? <Update editHandler={editHandler} editItem={editItem} /> :
                isOpen && <Create editHandler={editHandler} />}

            <Filter />
            <ListItems editHandler={editHandler} isOpen={isOpen || Object.keys(editItem).length !== 0} />
        </div>
    )
}

export default Product