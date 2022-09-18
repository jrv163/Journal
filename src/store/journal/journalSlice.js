
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
       isSaving: false,
       messageSaved: '',
       notes: [],
       active: null,
    //    id: 'ABC123',
    //    body: '',
    //    date: 1234567,
    //    imageUrls: [], // https: //foto1.jpg, https://foto2.jpg, https://foto3
    },
   reducers: {

        savingNewNote: (state ) => {
            state.isSaving = true;
        },

        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
            
        },

        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },

        setNote: ( state, action ) => {
            state.notes = action.payload;
        },

        setSaving: ( state ) => {
            state.isSaving = true;
            //TODO: mensaje de error
            state.messageSaved = '';
        },

        updateNote: ( state, action ) => { // payload: note
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if ( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            });
            // TODO: mostar mensaje de actualización
            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
        },

        setPhotosToActiveNote: ( state, action ) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },

        clearNoteLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        deleteNoteById: ( state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
addNewEmptyNote,
setActiveNote,
setNote,
setSaving,
updateNote,
deleteNoteById,
savingNewNote,
setPhotosToActiveNote,
clearNoteLogout,
 } = journalSlice.actions;