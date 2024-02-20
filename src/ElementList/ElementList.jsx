import { useSelector } from 'react-redux';

function ElementList() {

    const elementList = useSelector(store => store.elementList);

    return (
        <>
            <p>The element list is: {elementList}</p>

            <ul>
                {elementList.map((element, index) => (<li key={index}>{element}</li>))}
            </ul>
        </>
    )
}

export default ElementList
