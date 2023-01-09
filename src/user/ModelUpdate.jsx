import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TableContainer from "@mui/material/TableContainer"
import { useParams } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModelUpdate() {
    const [items, setItems] = useState([])

    const { ProfileId } = useParams()
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")

  useEffect(() => {
    fetch("http://192.168.0.12:8000/apiprofile/" + ProfileId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setFirstName(res.FirstName)
        setLastName(res.LastName)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [ProfileId])
  
    // ພາກສ່ວນການ  fetch ຂໍ້ມູນຈາກ  API ໃນຮູບແບບຂອງ JSON
    // ເພື່ອຈະສົ່ງກັບມາສະແດງຢູ່ Web Browser ( ເຊິ່ງຄ່າທີໄດ້ມາແມ່ນເກັບໄວ້ໃນ function ຂອງ items)
    useEffect(() => {
      UserGet()
    }, [])
  
    const UserGet = () => {
      fetch("http://192.168.0.12:8000/apiuser")
        .then((res) => res.json())
        .then((result) => {
          setItems(result)
        })
    }


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const title = <span className="text-white font-medium w-full text-center">ເລືອກບັນຊີທີທ່ານຕ້ອງການເອົາໄປບັນທຶກໂປຣໄຟຣ</span>
  const txtButton = <span className="text-gray-400 font-medium">Edit</span>
  const Agree = <span className="text-sky-500 font-medium">👌ເຫັນດີແລ້ວ</span>

  useEffect(() => {
    fetch("http://192.168.0.12:8000/apiprofile/" + ProfileId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setFirstName(res.FirstName)
        setLastName(res.LastName)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [ProfileId])
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {txtButton}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="text-center bg-sky-400">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <TableContainer className="lg:pt-0 md:pt-0 sm:pt-[3.45rem]">
        <div>

        <span> {FirstName} </span>
        <span> {LastName} </span>
 
        </div>
      </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{Agree}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
