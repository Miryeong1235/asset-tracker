import React, { useEffect, useState } from 'react';
import { getData, addUser } from '../firestoreFunctions';

function Main() {
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');

    // データを取得して表示
    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setUsers(data);
        };

        fetchData();
    }, []);

    // ユーザーを追加する
    const handleAddUser = async (e) => {
        e.preventDefault(); // ページのリロードを防ぐ
        await addUser({ firstName, lastName, age: Number(age) });

        // データを再取得して表示を更新
        const updatedUsers = await getData();
        setUsers(updatedUsers);

        // フォームをリセット
        setFirstName('');
        setLastName('');
        setAge('');
    };

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName}, Age: {user.age}
                    </li>
                ))}
            </ul>

            {/* ユーザーを追加するフォーム */}
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    required
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default Main;
