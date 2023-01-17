import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { IconButton, Modal, Switch, TextField } from '@mui/material';
import { Edit } from '@mui/icons-material';
import Send from '@mui/icons-material/Send';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );


  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:'flex',
  }

function Carts() {

  const [id,setId] = useState()
  const [valueTxt,setValueTxt] = useState({})


  const [open, setOpen] = React.useState(false);
  const handleOpen = (obj) => {setOpen(true) 
    setId(obj.id)
    setValueTxt(obj);
  };
  const handleClose = () => setOpen(false);
 
  const handleText = (elem) => {
      const {value} = elem.target;
      setValueTxt({title: value.title, message: value.message});
  }

    const baseUrl = "http://2.56.213.92:5001/todos";
    const [data, setData] = useState([]);

    const getUser = async () => {
        try {
            const {data} = await axios.get(baseUrl);
            setData(data);

            console.log(data);
        } catch (error) {
          console.log(error)
        }
    }

    const delUser = async (id) => {
      try {
          const {data} = await axios.delete(`${baseUrl}/${id}`);
      } catch (error) {
        console.log(error)
      }
  }

  const isComplete = async (obj) => {
    try {
        const {data} = await axios.put(`${baseUrl}/${obj.id}`,{...obj,complete:!obj.complete});
        console.log(obj);
    } catch (error) {
      console.log(error)
    }
  }

const editUser = async (obj) => {
  try {
      const {data} = await axios.put(`${baseUrl}/${obj.id}`,obj);
      console.log(obj);
  } catch (error) {
    console.log(error)
  }
}

const text = (elem) => {
  elem.preventDefault();
  const obj = { 
    title:elem.target['title'].value,
    message:elem.target['message'].value,
    comlete:false,
    id
  }
  editUser(obj);
  handleClose();
}

    useEffect(()=>{
      getUser()
    },[data]);


  return (
    <div className='flex justify-evenly flex-wrap'>
      {data.map((elem) => {
            return (
               <Card sx={{ width:'250px', background:'#a5ced1',margin:'50px' }}>
              <CardContent className='text-semibold font-mono'>
                   {elem.complete?<h1 className='line-through text-[red]'>{elem.title}</h1>:<h1 className='text-[1.3em]'>{elem.title}</h1>}
                   {elem.complete?<h1 className='line-through text-[red]'>{elem.message}</h1>:<h1>{elem.message}</h1>}
              </CardContent>
            <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
                <IconButton color='error' onClick={()=>{delUser(elem.id)}}> <DeleteIcon /> </IconButton>
                <IconButton color='warning' onClick={()=>handleOpen(elem)}> <Edit /> </IconButton>
                {elem.complete?<Switch defaultChecked onClick={()=>isComplete(elem)} />:<Switch onClick={()=>isComplete(elem)} />}
            </CardActions>
          </Card>
          )
      })}
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <form onSubmit={text}> 
        <Box sx={style2}>
           <TextField id="filled-basic" value={valueTxt.title} onChange={handleText} label="Title" variant="filled"   name='title'  />
           <TextField id="filled-basic" value={valueTxt.message} onChange={handleText} label="Message" variant="filled" name='message' />
           <IconButton color="primary" type='submit'> <Send /> </IconButton>
        </Box>
      </form>
      </Modal>
    </div>         
  )
}

export default Carts