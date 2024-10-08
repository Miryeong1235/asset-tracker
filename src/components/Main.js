import React, { useEffect, useState } from 'react';
import { getAccounts, getPrice, addPrice, formatDate, deletePrice, addNewAccount } from '../firestoreFunctions';
import './Main.css';
import PriceGraph from './PriceGraph';
import { set } from 'firebase/database';

function Main() {
    const [prices, setPrices] = useState([]);
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [newAccountName, setNewAccountName] = useState(''); // To create a new account 
    const [selectedPriceListAccount, setSelectedPriceListAccount] = useState('');

    // Fetch accounts on mount
    useEffect(() => {
        const fetchAccounts = async () => {
            const data = await getAccounts();
            setAccounts(data);
        }

        fetchAccounts();
    }, []);

    // Fetch data when the component is mounted
    useEffect(() => {
        if (selectedPriceListAccount) {
            const fetchPrice = async () => {
                const data = await getPrice(selectedPriceListAccount);
                const sortedData = data.sort((a, b) => a.date.toDate() - b.date.toDate());
                setPrices(sortedData);
            }

            fetchPrice();
        }
    }, [selectedPriceListAccount]);

    const handleAddPriceAndCreateNewAccount = async (e) => {
        e.preventDefault(); // Preventing from refreshing the page

        let accountToUse = selectedAccount;

        if (selectedAccount === 'Other' && newAccountName) {
            const newAccount = await addNewAccount(newAccountName);
            setAccounts([...accounts, newAccount]);
            accountToUse = newAccount.id;
        }

        const parsedDate = new Date(date);
        await addPrice(accountToUse, { date: parsedDate, price: Number(price) });

        // Get the updated data
        const updatedPrices = await getPrice(accountToUse);
        const sortedData = updatedPrices.sort((a, b) => a.date.toDate() - b.date.toDate());
        setPrices(sortedData);

        setDate('');
        setPrice('');
        setNewAccountName('');
    }


    const handleAccountChange = async (e) => {
        const account = e.target.value;
        setSelectedAccount(account);
    }

    const handlePriceListAccountChange = async (e) => {
        setSelectedPriceListAccount(e.target.value);
    }

    // // Add price data
    // const handleAddPrice = async (e) => {
    //     e.preventDefault(); // Preventing from refreshing the page

    //     const parsedDate = new Date(date);
    //     await addPrice(selectedAccount, { date: parsedDate, price: Number(price) });

    //     // Get the updated data
    //     const updatedPrices = await getPrice(selectedAccount);
    //     const sortedData = updatedPrices.sort((a, b) => a.date.toDate() - b.date.toDate());
    //     setPrices(sortedData);

    //     // Reset the input fields
    //     setDate('');
    //     setPrice('');
    // }

    const handleDeletePrice = async (id) => {
        await deletePrice(selectedAccount, id);

        // Get the updated data
        const updatedPrices = await getPrice(selectedAccount);
        const sortedData = updatedPrices.sort((a, b) => a.date.toDate() - b.date.toDate());
        setPrices(sortedData);
    }

    return (
        <div>
            <div>
                <h1>Add Data</h1>

                {/* Dropdown for selecting account */}
                <select value={selectedAccount} onChange={handleAccountChange}>
                    <option value="">Select an account</option>
                    {accounts.map(account => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                    <option value='Other'>Other</option>
                </select>

                {selectedAccount === 'Other' && (
                    <input
                        type="text"
                        value={newAccountName}
                        onChange={(e) => setNewAccountName(e.target.value)}
                        placeholder="Account Name"
                        required
                    />
                )}

                {/* Form to add price data */}
                {selectedAccount && (
                    <form onSubmit={handleAddPriceAndCreateNewAccount}>
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
                )}

                {/* Price table */}
                <h1>Price List</h1>

                <select value={selectedPriceListAccount} onChange={handlePriceListAccountChange}>
                    <option value="">Select an account</option>
                    {accounts.map(account => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                </select>

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


            </div>

            {/* Pass prices to PriceGraph as a prop */}
            <PriceGraph prices={prices} />
        </div>
    );
}

export default Main;
