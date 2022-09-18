
import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"


export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active  } = useSelector( state => state.journal )

  const onClickNewNote = () => {
    dispatch( startNewNote() );    
  }


  return (
   <JournalLayout>


     {/* <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, beatae minus dolorum ab reprehenderit voluptates a, dolores distinctio rem unde id odio quo alias aliquid qui cumque aliquam saepe non!</Typography> */}

    {
      ( !!active )
      ? <NoteView />
      : <NothingSelectedView/>
    }

    {/* { NothingSelected } */}
    {/* <NothingSelectedView/> */}

    {/* Noteview */}
    {/*  */}

    <IconButton
    onClick={ onClickNewNote }
    disabled={ isSaving }
    size="large"
    sx={{
      color: 'white',
      backgroundColor: 'error.main',
      ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
      position: 'fixed',
      right: 50,
      bottom: 50
    }}
    >
      <AddOutlined sx={{ fontSize: 30 }}/>
    </IconButton>

   </JournalLayout>
         
  )
}
