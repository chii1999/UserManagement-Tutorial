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
      swal("ປ້ອນຊື່ຜູ້ນຳຊ້, ອີເມວ ຫຼື ເບີໂທລະສັບ!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!newPass) {
      swal("ປ້ອນລະຫັດຜ່ານໃໝ່!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!cpassword) {
      swal("ຢືນຢັນລະຫັດຜ່ານໃໝ່!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (cpassword !== newPass) {
      swal("ຢືນຢັນລະຫັດຜ່ານບໍຕົງກັນ!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
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

      fetch("http://192.168.0.12:8000/apiuser/changepass", requestOptions)
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

  const mobile = <span>ຊື່ຜູ້ນຳຊ້, ອີເມວ ຫຼື ເບີໂທລະສັບ</span>
  const password = <span>ລະຫັດຜ່ານໃໝ່</span>
  const cpass = <span>ຢືນຢັນລະຫັດຜ່ານໃໝ່</span>
  const nameButton = <span>ສ້າງລະຫັດຜ່ານໃໝ່</span>

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
