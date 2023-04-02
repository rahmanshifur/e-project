import { useStoreState } from "easy-peasy"
import { Link } from '@reach/router';



function Sidebar() {


    const catData = useStoreState(state => state.category.data)
    const scatData = useStoreState(state => state.subcategory.data)

    return (
        <div>
            {catData.length !== 0 && catData.map(item =>
                <li key={item.id} className='cat'>
                    {item.name}
                    <ul className='scat'>
                        {scatData.length !== 0 && scatData.map(scat => scat.categoryId === item.id &&
                            <li><Link key={scat.id} to={`/scat-product/${scat.id}`}>{scat.name}</Link></li>)}
                    </ul>
                </li>)}
        </div>
    )
}

export default Sidebar