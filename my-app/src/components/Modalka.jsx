import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Modalka() {
      const baseUrl = "http://2.56.213.92:5001/todos";
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
  
      const postUser = async (obj) => {
          try {
            const user = await axios.post(baseUrl,obj)
          } catch (error) {
            
          }
      }

      const text = (elem) => {
          elem.preventDefault();
          const obj = {
            title:elem.target['title'].value,
            message:elem.target['message'].value,
            comlete:false,
          }
          postUser(obj);
          handleClose();
      }
  
  return (
    <div className='flex flex-wrap justify-center py-[10vh]'>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <form onSubmit={text}>
              <Box sx={style} className='space-x-5 flex justify-evenly'>
              <TextField id="filled-basic" label="Title" variant="filled" name='title' />
              <TextField id="outlined-textarea" label="Massage" name='message'
              placeholder="Message" multiline />
              <Button variant="contained" endIcon={<SendIcon />} type='submit'> Send </Button>
              </Box>
          </form>
      </Modal>
    </div>
  )
}

export default Modalka