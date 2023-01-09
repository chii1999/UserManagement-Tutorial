import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [items, setItems] = useState([])
  
    useEffect(() => {
      UserGet()
    }, [])
  
    const UserGet = () => {
      fetch("http://192.168.0.12:8000/apiuser/showId")
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
  const txtButton = <span className="text-gray-400 font-medium">ເບິ່ງລະຫັດ user</span>
  const Agree = <span className="text-sky-500 font-medium">👌ຂ້ອຍເຫັນດີແລ້ວ</span>
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
        <Table
          className="border mt-2"
          sx={{ minWidth: 550 }}
          stickyHeader
          aria-label="sticky table">
             <TableHead>
            <TableRow>
              <TableCell align="left">
                <span className="font-medium text-gray-600">
                  ລະຫັດຜູ້ນຳໃຊ້
                </span>
                </TableCell>
              <TableCell align="left">
                <span className="font-medium text-gray-600">
                  ຊື່ຜູ້ນຳໃຊ້
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="font-medium text-gray-600">
                  ອີເມວທີຢູ່
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                key={row.UserId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" align="left" scope="row">
                <span>ລະຫັດ: {row.UserId}</span>
                </TableCell>
                <TableCell align="left"><span>{row.UserName}</span></TableCell>
                <TableCell align="left"><span>{row.Email}</span> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
