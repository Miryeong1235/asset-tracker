import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

// export const getData = async () => {
//     const querySnapshot = await getDocs(collection(db, "users")); // "users" is the name of the collection
//     const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return data;
// };

export const getPrice = async () => {
    const querySnapshot = await getDocs(collection(db, "prices")); // "prices" is the name of the collection
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
};

export const addPrice = async (price) => {
    try {
        const docRef = await addDoc(collection(db, "prices"), price);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const deletePrice = async (id) => {
    try {
        await deleteDoc(doc(db, "prices", id));
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


