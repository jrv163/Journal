
import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async( uid = '' ) => {
    if ( !uid ) throw new Error('El UID del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notas` );
    const docs = await getDocs(collectionRef);

    const notas = [];
    docs.forEach( doc => {
        notas.push({ id: doc.id, ...doc.data() });
        //console.log( doc.data() );
    })
    //console.log(docs);
    //console.log(notas);
    return notas;

}