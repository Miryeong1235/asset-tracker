import React, { useEffect, useState } from 'react';
import { getAccounts, getPrice, addPrice, formatDate, deletePrice, addNewAccount } from '../firestoreFunctions';
import './Main.css';
import PriceGraph from './PriceGraph';
import { auth } from '../firebase';

function Main() {
    const [prices, setPrices] = useState([]);
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [newAccountName, setNewAccountName] = useState(''); // To create a new account 
    const [selectedPriceListAccount, setSelectedPriceListAccount] = useState('');
    const [filteredPrices, setFilteredPrices] = useState([]);
    const [filterType, setFilterType] = useState('All');

    // Fetch accounts on mount
    useEffect(() => {
        const fetchAccounts = async () => {
            const user = auth.currentUser;
            if (user) {
                const data = await getAccounts();
                setAccounts(data);
            } else {
                console.log("User not logged in");
            }
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
                applyFilter(sortedData, filteredPrices);
            }

            fetchPrice();
        }
    }, [selectedPriceListAccount]);

    useEffect(() => {
        if (prices.length > 0) {
            applyFilter(prices, filterType);
        }
    }, [prices, filterType]);

    const applyFilter = (data, filterType) => {
        let filteredData = data;
        const now = new Date();

        if (filterType === '1 month') {
            const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
            filteredData = data.filter(price => price.date.toDate() >= oneMonthAgo);
        } else if (filterType === '1 year') {
            const oneMonthAgo = new Date(now.setFullYear(now.getFullYear() - 1));
            filteredData = data.filter(price => price.date.toDate() >= oneMonthAgo);
        } else {
            filteredData = data; // for all data
        }

        setFilteredPrices(filteredData);
    }

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    }

    const handleAddPriceAndCreateNewAccount = async (e) => {
        e.preventDefault(); // Preventing from refreshing the page

        let accountToUse = selectedAccount;

        if (selectedAccount === 'Other' && newAccountName) {
            const newAccount = await addNewAccount(newAccountName);
            setAccounts([...accounts, newAccount]);
            accountToUse = newAccount.id;
        }

        const parsedDate = new Date(date + 'T00:00:00');
        const localDate = new Date(parsedDate.toLocaleString('en-US', { timeZone: 'America/Vancouver' }));

        await addPrice(accountToUse, { date: localDate, price: Number(price) });

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
                <h2>Add New Data</h2>

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
                <br />

                {/* Price table */}
                <h2>Price List</h2>

                <select value={selectedPriceListAccount} onChange={handlePriceListAccountChange}>
                    <option value="">Select an account</option>
                    {accounts.map(account => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                </select>

                <div className='durationRadioButton'>
                    <label>
                        <input type="radio" value="All" checked={filterType === 'All'} onChange={handleFilterChange} />
                        All
                    </label>
                    <label>
                        <input type="radio" value="1 year" checked={filterType === '1 year'} onChange={handleFilterChange} />
                        1 year
                    </label>
                    <label>
                        <input type="radio" value="1 month" checked={filterType === '1 month'} onChange={handleFilterChange} />
                        1 month
                    </label>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPrices.map(price => (
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


            <h3>Portfolio growth rate:</h3>
            <PriceGraph prices={filteredPrices} />
        </div>
    );
}

export default Main;