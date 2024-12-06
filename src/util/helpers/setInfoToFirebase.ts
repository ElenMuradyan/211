import { db } from "../../services/firebase"
import { FIRESTORE_PATH_NAMES } from "../constants/firestorePathNames"
import { collection, doc, getDoc, updateDoc, getDocs } from "firebase/firestore";
import { userExpencesType } from "../../typescript/types/userProfileInitialState";
  
export const setInfoToFirebase = async (exchange: number, uid: string) => {
    try{
        const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
        const userDoc = await getDoc(userRef);

        if(userDoc.exists()){
            const userData = userDoc.data();
            const income = Math.round(userData.userIncome * Number(exchange));

            const newUserExpences: userExpencesType = {
                food: 0,
                home: 0,
                shopping: 0,
                car: 0,
                leisure: 0,
            };

            for(let key in userData.userExpences) {
                const expense = userData.userExpences[key];
                const amount = Math.round(expense * Number(exchange)); 
                newUserExpences[key as keyof userExpencesType] = amount
            };            
            await updateDoc(userRef, {
                userExpences: newUserExpences,
                userIncome: income
            });
        }
    }catch(e){
        console.log(e);
    }
}

export const setWalletEvents = async (exchange: number, uid: string) => {
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
    const collectionRef = collection(userRef, FIRESTORE_PATH_NAMES.WALLET_EVENTS);
    const querySnapshot = await getDocs(collectionRef);

    for (let docSnap of querySnapshot.docs) {
        const docRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid, FIRESTORE_PATH_NAMES.WALLET_EVENTS, docSnap.id);
        const data = docSnap.data();
        const amount = Math.round(Number(data.amount) * Number(exchange));                

        await updateDoc(docRef, {
            ...data,
            amount: amount,
        })
    }
}