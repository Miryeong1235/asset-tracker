import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const addStock = async (stock) => {
    try {
        const docRef = await addDoc(collection(db, "stocks"), stock);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Example usage
addStock({ name: "AAPL", price: 150 });
