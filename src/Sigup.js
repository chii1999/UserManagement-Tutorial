import React, { useState } from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"

const theme = createTheme()

function SignUp() {

  const navigate = useNavigate()
  
  const [UserName, setUsername] = useState("")
  const [Email, setEmail] = useState("")
  const [Mobile, setMobile] = useState("")
  const [Password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")

  const regexMobile = /^0?(20)[2579]\d{7}$/
  const regexUsername = /^[A-Za-z]{3,16}$/

  const handleSigUp = (event) => {
    event.preventDefault()
    if (!UserName) {
      swal("ກະລຸນາປ້ອນຊື່ຜູ້ນຳໃຊ້!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (!UserName.match(regexUsername)) {
      swal("ຊື່ຕ້ອງມີ ຕົວໃຫຍ່, ຕົວໜ້ອຍ ແລະ ຢ່າງນ້ອຍ 3 - 16 ຕົວອັກສອນ", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    }else if (!Mobile) {
      swal("ກະລຸນາປ້ອນເບີໂທລະສັບ!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (!Mobile.match(regexMobile)) {
      swal("ເບີໂທລະສັບຕ້ອງແມ່ນ 020 || 030 ຫ້າມຍະຫວ່າງ ແລະ ບໍ່ເກີນ 8 ຫລັກ!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
      return false
    } else if (!Email) {
      swal("ກະລຸນາປ້ອນອີເມວ!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    }  else if (!Password) {
      swal("ປ້ອນລະຫັດຜ່ານ!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (!cpassword) {
      swal("ຢືນຢັນລະຫັດຜ່ານ!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (cpassword !== Password) {
      swal("ຢືນຢັນລະຫັດຜ່ານບໍຕົງກັນ!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else {
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      var raw = JSON.stringify({
        UserName: UserName,
        Email: Email,
        Mobile: Mobile,
        Password: Password,
      })

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      fetch("http://192.168.0.12:8000/apiregister", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "ok") {
            swal({
              title: "ສຳເລັດແລ້ວ",
              text: "ບັນຊີນີ້ພ້ອມໃຊ້ງານ",
              icon: "success",
              button: "OK",
            })
            navigate('/login')
          } else if (result.status === "error") {
            swal({
              title: "Error!",
              text: "ເກີດຂໍ້ຜິດພາດທັງ Server",
              icon: "error",
              button: "Exit",
            })
          }
        })
        .catch((error) => console.log("error", error))
    }
  }

  const username = <span>ຊື່ຜູ້ໃຊ້</span>
  const mobile = <span>ເບີໂທຕິດຕໍ່</span>
  const email = <span>ອີເມວທີຢູ່</span>
  const password = <span>ລະຫັດຜ່ານ</span>
  const cpass = <span>ຢືນຢັນລະຫັດຜ່ານ</span>
  const nameButton = <span>ສ້າງບັນຊີທັນທີ</span>

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ width: 550, height: 400 }} >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSigUp}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Username"
                  id="Username"
                  required
                  fullWidth
                  label={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  name="mobile"
                  label={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  id="password"
                  label={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={cpass}
                  id="cpassword"
                  name="cpassword"
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              size="large"
              color="info"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 2 }}>
              {nameButton}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
