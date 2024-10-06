import React, { useEffect, useState } from 'react';
import { getPrice, addPrice, formatDate, deletePrice } from '../firestoreFunctions';
import './Main.css';
import PriceGraph from './PriceGraph';

function Main() {
    const [prices, setPrices] = useState([]);
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');

    // Fetch data when the component is mounted
    useEffect(() => {
        const fetchPrice = async () => {
            const data = await getPrice();
            const sortedData = data.sort((a, b) => a.date.toDate() - b.date.toDate());
            setPrices(sortedData);
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
        const sortedData = updatedPrices.sort((a, b) => a.date.toDate() - b.date.toDate());
        setPrices(sortedData);

        // Reset the input fields
        setDate('');
        setPrice('');
    }

    const handleDeletePrice = async (id) => {
        await deletePrice(id);

        // Get the updated data
        const updatedPrices = await getPrice();
        const sortedData = updatedPrices.sort((a, b) => a.date.toDate() - b.date.toDate());
        setPrices(updatedPrices);
    }

    return (
        <div>
            <div>
                <h1>Price List</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices.map(price => (
                            <tr key={price.id}>
                                <td>{formatDate(price.date.toDate())}</td>
                                <td>{price.price}</td>
                                <td>
                                    <span id='deleteButton' onClick={() => handleDeletePrice(price.id)}>🗑️</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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

            {/* Pass prices to PriceGraph as a prop */}
            <PriceGraph prices={prices} />
        </div>
    );
}

export default Main;
