import React, { useEffect, useState } from 'react';
import { getData, getPrice, addPrice, formatDate, deletePrice } from '../firestoreFunctions';
import { set } from 'firebase/database';

function Main() {
    const [prices, setPrices] = useState([]);
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');

    // Fetch data when the component is mounted
    useEffect(() => {
        const fetchPrice = async () => {
            const data = await getPrice();
            setPrices(data);
        }

        fetchPrice();
    }, []);

    // Add price data
    const handleAddPrice = async (e) => {
        e.preventDefault(); // Preventing from refreshing the page

        const parsedDate = new Date(date);
        await addPrice({ date: parsedDate, price: Number(price) });

        // Get the updated data
        const updatedPrices = await getPrice();
        setPrices(updatedPrices);

        // Reset the input fields
        setDate('');
        setPrice('');
    }

    const handleDeletePrice = async (id) => {
        await deletePrice(id);

        // Get the updated data
        const updatedPrices = await getPrice();
        setPrices(updatedPrices);
    }

    return (
        <div>
            <div>
                <h1>Price List</h1>
                <ul>
                    {prices.map(price => (
                        <li key={price.id}>
                            {formatDate(price.date.toDate())}: {price.price}
                            <button onClick={() => handleDeletePrice(price.id)}>🗑️</button>
                        </li>
                    ))}
                </ul>

                {/* Form to add data of user*/}
                <form onSubmit={handleAddPrice}>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="date"
                        required
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        required
                    />
                    <button type="submit">Add Price Data</button>
                </form>
            </div>
        </div>
    );
}

export default Main;
