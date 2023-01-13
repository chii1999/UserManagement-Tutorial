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
    <span className="lg:block hidden md:text-[3.33rem] text-[2.35rem] absolute z-40 top-8 text-center font-bold w-full text-white py-2 pt-8 px-32 rounded-md">
      ລະບົບຈັດກການຜູ້ນຳໃຊ້
    </span>
  )
  const logo = (
    <div className="w-full flex justify-center items-center text-center absolute z-40 md:-top-8 top-10">
      <div className="lg:hidden block w-[2em] h-[2em] shadow-md border-8 border-t-yellow-500 border-b-green-500 border-white flex justify-center items-center rounded-full bg-sky-500 text-yellow-500 md:text-white font-bold text-[3em]">
        W
      </div>
    </div>
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
    <div className="bg-gradient-to-t from-cyan-600 bg-cyan-500  h-screen flex justify-center items-center">
      <div className=" flex justify-center items-center relative lg:w-[70%] md:w-[50%] sm:w-full w-full lg:h-[35rem] md:h-[25rem] h-full md:rounded-2xl rounded-sm shadow-lg overflow-hidden">
        <h1>{title}</h1>
        <div>{logo}</div>
        <img
          src="https://imgs.search.brave.com/eREFKqPnNPvHgrn19F7cUujADYP4pCjqrReFfCrmFf4/rs:fit:1200:1020:1/g:ce/aHR0cHM6Ly9pbm5v/dmF0aXZlYnVpbGRp/bmdtYXRlcmlhbHMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzA4L21lZGlj/YWwtb2ZmaWNlLWJ1/aWxkaW5nLWRlc2ln/bi0wMi0xNTM2eDEw/MjAuanBn"
          alt=""
          className="w-full h-full object-cover brightness-75"
        />
        <form
          onSubmit={handleSubmit}
          className="w-full md:h-[22em] h-[35em] bg-[#fffffff3] md:pt-0 pt-6 absolute z-10 left-0 bottom-0 flex flex-col justify-start md:justify-center items-center  gap-4">
          <label class="block lg:w-[50%] md:w-[80%] w-[85%]">
            <span class="after:content-['*'] after:ml-0.5 after:text-rose-500 block text-lg font-bold text-slate-700">
              ຊື່ບັນຊີ, ອີເມວ ຫຼື ເບີໂທລະສັບ
            </span>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              class="mt-1 px-3 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-sky-400 block w-full rounded-sm md:text-md text-sm"
              placeholder="you@example.com"
            />
          </label>

          <label class="block relative lg:w-[50%] md:w-[80%] w-[85%]">
            <span class="after:content-['*'] after:ml-0.5 after:text-rose-500 block text-lg font-bold text-slate-700">
              ລະຫັດຜ່ານ
            </span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={passwordType}
              class="mt-1 px-3 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-sky-400 block w-full rounded-sm md:text-md text-sm"
              placeholder="******************"
            />
            <Box onClick={handleShow} className="absolute top-11 right-2">
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
          </label>

          <div className="lg:w-[50%] md:w-[80%] w-[85%] flex justify-between items-center">
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

          <button
            type="submit"
            className="py-3 w-[50%] shadow-md rounded-full active:scale-95 bg-sky-500 text-white text-center">
            sign in
          </button>
        </form>
      </div>

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
