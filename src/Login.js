import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import LockIcon from "@mui/icons-material/Lock"
import Slide from "@mui/material/Slide"
import TypeUserName from "./TypeUserName"
import RegisterNew from "./RegisterNew"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const theme = createTheme()

export default function Login() {
  const navigate = useNavigate()
  const [UserName, setUserName] = useState()
  const [Password, setPassword] = useState()

  // const number = "^0?(20)[2579]\b{7}$";

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!UserName) {
      swal({
        title: "ແຈ້ງເຕືອນ!",
        text: "ປ້ອນຊື່ເພື່ອເຂົ້າສູ່ລະບົບ!",
        icon: "warning",
        button: false,
      })
    } else if (!Password) {
      swal({
        title: "ແຈ້ງເຕືອນ!",
        text: "ປ້ອນລະຫັດຜ່ານເພື່ອເຂົ້າສູ່ລະບົບ!",
        icon: "warning",
        button: false,
      })
    } else {
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      var raw = JSON.stringify({
        UserName: UserName,
        Password: Password,
      })

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      fetch("http://192.168.0.12:8000/apilogin", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "noPass") {
            swal({
              title: "ລະຫັດບໍ່ຖຶກຕ້ອງ",
              text: "ລະຫັດທີທ່ານປ້ອນບໍ່ຕົງກັບ ລະຫັດໃນ server",
              icon: "warning",
              button: false,
            })
          } else if (result.status === "noUser") {
            swal({
              title: "ມີບາງຢ່າງຜິດພາດ",
              text: "ຊື່ user ບໍ່ມີໃນລະບົບ",
              icon: "warning",
              button: false,
            })
          } else if (result.status === "ok") {
            swal({
              title: "ຍີນດີເຂົ້າສູ່ລະບົບ",
              icon: "success",
              button: false,
            })
            localStorage.setItem("Token", result.token)
            navigate("/Manager")
          }
        })
        .catch((error) => console.log("error", error))
    }
  }

  // show password
  const [passwordType, setPasswordType] = useState("password")
  const handleShow = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return
    }
    setPasswordType("password")
  }

  const [open, setOpen] = React.useState(false)

  const handleSignUp = () => {
    setOpen(true)
  }
  const [openf, setOpenf] = React.useState(false)

  const handleForgotpassword = () => {
    setOpenf(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const Closefor = () => {
    setOpenf(false)
  }

  const title = (
    <span className="md:block hidden md:text-[3rem] text-[1.78rem] font-bold bg-gradient-to-l from-blue-200 via-blue-400 to-blue-200 w-full text-white py-2 pt-8 px-32 rounded-md">
      ລະບົບລ໋ອກອິນ
    </span>
  )
  const forgotPassword = (
    <span className="font-medium text-sm text-gray-500">ລືມລະຫັດຜ່ານ</span>
  )

  const txtSigUp = (
    <span className="text-white md:text-2xl text-md font-medium">
      ລົງທະບຽນ ບັນຊີນຳໃຊ້ໃໝ່
    </span>
  )
  const txtForgotpassword = (
    <span className="text-white md:text-2xl text-lg font-medium">
      ສ້າງລະຫັດຜ່ານໃໝ່ແທນຕົວເກົ່າ
    </span>
  )
  const txtButton = (
    <span className="text-gray-500 text-sm font-medium">ລົງທະບຽນບັນຊີໃໝ່</span>
  )
  const close = (
    <span className="text-red-500 text-sm font-medium">ປິດໜ້ານີ້ອອກ</span>
  )

  return (
    <div className="bg-gradient-to-t from-blue-400 py-[4rem] h-screen">
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <Avatar
          sx={{ bgcolor: "info.main", width: 115, height: 115 }}
          className=" drop-shadow-md border-[.57rem] border-white">
          <img
            className="w-full h-full object-cover"
            src="https://imgs.search.brave.com/jYDh7lkgQR7YoQaLpUKG4Gk-z-OVMzxJ4mlJ_BGQqCo/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/SFhXSDJLOTFZQVk5/Vm1HS21CaUVBSGFF/SyZwaWQ9QXBp"
            alt=""
          />
        </Avatar>
        <Typography>{title}</Typography>
      </div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <form onSubmit={handleSubmit} className="md:w-[25rem] w-full">
              <label className="relative block">
                <span className="absolute inset-y-0 right-2 flex items-center pl-2">
                  <AccountCircleIcon sx={{ fontSize: 30, color: "#00bcd4" }} />
                </span>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  className="placeholder:text-slate-400 placeholder:font-normal placeholder:text-sm block bg-white w-full border text-gray-400 font-medium border-slate-300 rounded-md py-4 pr-9 pl-3 shadow-sm focus:outline-none "
                  placeholder="ຊື່ບັນຊີຜູ້ໃຊ້, ອີເມວ ຫຼື ເບີໂທລະສັບ"
                  type="text"
                  name="search"
                />
              </label>
              <label className="relative block mt-6">
                <Box
                  onClick={handleShow}
                  className="absolute inset-y-0 right-2 flex items-center border-none outline-none pl-2">
                  {passwordType === "password" ? (
                    <LockIcon
                      sx={{ fontSize: 30, color: "#00bcd4" }}
                      className=" cursor-pointer"
                    />
                  ) : (
                    <LockOpenIcon
                      sx={{ fontSize: 30, color: "#00bcd4" }}
                      className=" cursor-pointer"
                    />
                  )}
                </Box>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="placeholder:text-slate-400 block bg-white w-full border text-gray-400 font-medium border-slate-300 rounded-md py-4 pr-9 pl-3 shadow-sm focus:outline-none "
                  placeholder="*********"
                  type={passwordType}
                  name="search"
                />
              </label>

              <div className="mt-4 flex justify-between items-center w-full">
                <Link
                  variant="outlined"
                  className="cursor-pointer"
                  onClick={handleForgotpassword}>
                  {forgotPassword}
                </Link>
                <Link
                  variant="outlined"
                  className="cursor-pointer"
                  onClick={handleSignUp}>
                  {txtButton}
                </Link>
              </div>

              <div className="w-full mt-6">
                <button
                  type="submit"
                  className="py-3 px-12 w-full text-white text-sm rounded-full shadow-md bg-green-600 active:scale-95">
                  <span>sign in</span>
                </button>
              </div>
            </form>
            {/* <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label={userName}
                className="bg-white rounded-md"
                onKeyDown={handleKey}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label={passWord}
                className="bg-white rounded-md"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, p: 1.5 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    variant="outlined"
                    className="cursor-pointer"
                    onClick={handleForgotpassword}>
                    {forgotPassword}
                  </Link>
                </Grid>
                <Grid id item>
                  <Link
                    variant="outlined"
                    className="cursor-pointer"
                    onClick={handleSignUp}>
                    {txtButton}
                  </Link>
                </Grid>
              </Grid>
            </Box> */}
          </Box>
        </Container>
      </ThemeProvider>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="text-center w-full bg-sky-500">
          {txtSigUp}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <RegisterNew />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openf}
        TransitionComponent={Transition}
        keepMounted
        // onClose={Closefor}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="text-center w-full bg-sky-500">
          {txtForgotpassword}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TypeUserName />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Closefor}>{close}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
