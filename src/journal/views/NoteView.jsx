import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks/useForm"
import { setActiveNote, startDeletingNote, startSaveNote, 
    startUpLoadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"
import { useRef } from "react"



export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState   } = useForm( note ); // estado inicial

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    },[date])

    const fileInpuntRef = useRef();

    useEffect(() => {

        dispatch( setActiveNote( formState ) ); // el setActiveNote activa las notas que yo quiero en este caso el formState
       
    }, [formState])

    useEffect(() => {
       if ( messageSaved.length > 0 ) {
        Swal.fire('Nota actualizada', messageSaved, 'success');
       }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        // console.log(target.files )
        if ( target.files === 0  ) return;
        
        dispatch( startUpLoadingFiles( target.files ) );
       // console.log('subiendo archivo')
        
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    <Grid 
    className='animate__animated animate__fadeIn animate__faster'
    container 
    direction='row' 
    justifyContent='space-between' 
    alignItems='center' sx={{ mb: 1 }}
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>

        <Grid item>

            <input 
            type='file'
            multiple
            ref={ fileInpuntRef }
            onChange={ onFileInputChange }
            style={{ display: 'none' }}
            
            />

            <IconButton
            color="primary"
            disabled={ isSaving }
            onClick={ () => fileInpuntRef.current.click() }
            >
                <UploadFileOutlined/>
            </IconButton>

            <Button 
                disabled={ isSaving }
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding: 2 }}
                >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>
    <Grid container>
        <TextField 
        type="text"
        variant="filled"
        fullWidth
        placeholder="Ingresa un título"
        label="Título"
        sx={{ border: 'none', mb: 1 }}
        name="title"
        value={ title }
        onChange={ onInputChange }

        />
         <TextField 
        type="text"
        variant="filled"
        fullWidth
        multiline
        placeholder="¿Qué sucedió hoy?"
        minRows={ 5 }
        name="body"
        value={ body }
        onChange={ onInputChange }
        />
    </Grid>

    <Grid container justifyContent='end'>
        <button
        onClick={ onDelete }
        sx={{ mt: 2 }}
        color='red'
        >
            <DeleteOutline />
            Borrar
        </button>

    </Grid>


    {/* { Image gallery } */}

    <ImageGallery 
    images={ note.imageUrls }
    />

    </Grid>
  )
}
