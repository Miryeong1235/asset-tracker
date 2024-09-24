import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users")); // "users" is the name of the collection
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
};

export const addUser = async (user) => {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

