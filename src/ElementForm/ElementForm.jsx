import { useDispatch } from 'react-redux';
import { useState } from 'react';

function ElementForm() {

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        // Don't reload
        event.preventDefault();

        // Tell redux that want to add in the new element
        dispatch({
            type: "ELEMENTLIST_ADD",
            // Pass in the element name, that we're tracking in our useState variable
            payload: newElement
        });

        setNewElement('');

    }

    const [newElement, setNewElement] = useState('');

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    typte="text"
                    placeholder='Element Name'
                    value={newElement}
                    onChange={event => setNewElement(event.target.value)}
                />
                <button type="submit">Add!</button>
            </form>

        </>
    )
}

export default ElementForm
