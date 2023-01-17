import React, { useState } from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import swal from "sweetalert"

const theme = createTheme()

function SignUp() {
  const [UserName, setMobile] = useState("")
  const [newPass, setNewPassword] = useState("")
  const [cpassword, setCpassword] = useState("")

  const handleNewPassword = (event) => {
    event.preventDefault()
     if (!UserName) { 
      swal({
        title: "ແຈ້ງເຕືອນ",
        text: "ປ້ອນຊື່ບັນຊີຜູ້ໃຊ້, ອີເມວ ຫຼື ເບີໂທລະສັບ!",
        icon: "warning",
        button: false,
      })
    } else if (!newPass) { 
      swal({
        title: "ແຈ້ງເຕືອນ",
        text: "ປ້ອນລະຫັດຜ່ານໃໝ່ຂອງທ່ານ!",
        icon: "warning",
        button: false,
      })
    } else if (!cpassword) { 
      swal({
        title: "ແຈ້ງເຕືອນ",
        text: "ຢືນຢັນລະຫັດຜ່ານໃໝ່ພ້ອມ!",
        icon: "warning",
        button: false,
      })
    } else if (cpassword !== newPass) { 
      swal({
        title: "ແຈ້ງເຕືອນ",
        text: "ຢືນຢັນລະຫັດຜ່ານບໍ່ຕົງກັນ!",
        icon: "warning",
        button: false,
      })
    } else {
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      var raw = JSON.stringify({
        UserName: UserName,
        newPass: newPass,
      })

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      fetch("http://192.168.0.236:8000/apiuser/changepass", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "ok") {
            swal({
              title: "ສຳເລັດແລ້ວ",
              text: "ທ່ານໄດ້ລະຫັດຜ່ານໃໝ່ແລ້ວ",
              icon: "success",
              button: "OK",
            })
          } else if (result.status === "error") {
            swal({
              title: "ຜິດພາດ!",
              text: "ຂໍ້ມູນນີ້ບໍ່ຖຶກຕ້ອງກັບ ຂໍ້ມູນໃນ server",
              icon: "error",
              button: "Exit",
            })
          }
        })
        .catch((error) => console.log("error", error))
    }
  }

  const mobile = <span>ຊື່ບັນຊີ, ອີເມວ ຫຼື ເບີໂທລະສັບ</span>
  const password = <span>ລະຫັດຜ່ານໃໝ່</span>
  const cpass = <span>ຢືນຢັນລະຫັດຜ່ານໃໝ່</span>
  const nameButton = <span>ຢືນຢັນ</span>

  return (
    <ThemeProvider theme={theme}>
      <Container component="main"  className="w-full h-auto" >
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
            onSubmit={handleNewPassword}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                  name="password"
                  id="password"
                  label={password}
                  onChange={(e) => setNewPassword(e.target.value)}
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
