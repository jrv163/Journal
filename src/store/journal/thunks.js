
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, 
    setNote, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";


export const startNewNote = ( ) => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } =  getState().auth;
        //console.log(getState());
        //console.log('startNewNote');
        //uid debo estar logeado para grabar en firebase 
        //o como quiero grabar en la base de datos

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        //1. crear la referencia del documento o la colección en firebase
        
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notas` ) )  // apuntar al node en firebase cloud
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        //console.log({ newDoc, setDocResp });
        dispatch( addNewEmptyNote( newNote ));
        dispatch( setActiveNote( newNote ));
        
        // dispatch( newNote )
        // dispatch( activeNote )

    }
}

export const startLoadingNotes = ( ) => {
    return async( dispatch, getState ) => {

        const { uid } =  getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );
        //console.log({ uid })
        dispatch( setNote( notes ))
        

    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } =  getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;


        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true }  );

        dispatch( updateNote( note ) );

        //console.log(noteToFireStore)
    }
}


export const startUpLoadingFiles = ( files = []) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        //await fileUpload( files[0] );
       // console.log( files );

        const fileUploadPrimises = [];

        for (const file of files ) {
            fileUploadPrimises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPrimises );
        //console.log( photosUrls )

        dispatch( setPhotosToActiveNote( photosUrls ));

    }

}

export const startDeletingNote = ( ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }`); // se crea la referencia al documento
        await deleteDoc( docRef ); // 

        dispatch( deleteNoteById( note.id ) )


    }
}