import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth } from './firebase';

export const getAccounts = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/accounts`));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
};

export const addNewAccount = async (accountName) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");

        const docRef = await addDoc(collection(db, `users/${user.uid}/accounts`), { name: accountName });
        console.log("Document written with ID: ", docRef.id);
        return { id: docRef.id, name: accountName };
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error(e, "Error adding document");
    }
};

export const getPrice = async (accountId) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/accounts/${accountId}/prices`));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
};

export const addPrice = async (accountId, price) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");

        const docRef = await addDoc(collection(db, `users/${user.uid}/accounts/${accountId}/prices`), price);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const deletePrice = async (accountId, id) => {
    try {
        await deleteDoc(doc(db, `accounts/${accountId}/prices`, id));
        console.log("Document successfully deleted!");
    } catch (e) {
        console.error("Error removing document: ", e);
    }
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because the month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0'); // Pad the day with leading zeros

    return `${year}-${month}-${day}`;
}


