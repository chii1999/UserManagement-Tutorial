import React, { useState, useEffect } from "react"
import "../App.css"
import Box from "@mui/material/Box"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useParams } from "react-router-dom"
import swal from "sweetalert"
import axios from "axios"
import { motion } from "framer-motion"
import EmailIcon from "@mui/icons-material/Email"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import SettingsPhoneIcon from "@mui/icons-material/SettingsPhone"

const select = <span className="font-semibold text-sky-600">-- ເລືອກ -- </span>

export default function LabTabs() {
  const { UserId } = useParams()

  useEffect(() => {
    fetch("http://192.168.0.12:8000/apiroles/all/" + UserId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setUserName(res.UserName)
        setEmail(res.Email)
        setMobile(res.Mobile)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [UserId])

  const [UserName, setUserName] = useState("")
  const [Email, setEmail] = useState("")
  const [Mobile, setMobile] = useState("")

  const [RoleId, setRole] = useState("")

  // insert role data
  const handleRole = (e) => {
    e.preventDefault()
    if (!RoleId) {
      swal({
        title: "ແຈ້ງເຕືອນ!",
        text: "ເລືອກບົດບາດໃດໜຶ່ງກ່ອນ",
        icon: "warning",
        button: false,
      })
    } else {
      const getData = { UserId, RoleId }

      axios
        .put("http://192.168.0.12:8000/apihr/update", getData)
        .then((res) => {
          if (res.data.status === "ok") {
            swal({
              title: "ສຳເລັດແລ້ວ",
              text: "ສິ້ນສຸດການກຳນົດບາດແລ້ວ!",
              icon: "success",
              button: false,
            })
          } else {
            swal({
              title: "Error!",
              text: "ເກີດຂໍ້ຜິດພາດທາງ Server",
              icon: "error",
              button: "OK",
            })
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }

  const [roles, setRoles] = useState([])

  useEffect(() => {
    getRole()
  }, [])

  const getRole = async () => {
    const reqdata = await fetch("http://192.168.0.12:8000/apiroles")
    const resdata = await reqdata.json()
    setRoles(resdata)
  }

  // Other...............................
  const [value, setValue] = React.useState("role")

  const handleNext = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: -100 }}
      className="md:pt-0 pt-6">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <form onSubmit={handleRole}>
            <TabPanel value="role">
              <div className="border bg-white h-auto rounded-md md:p-4 p-1">
                <div className="flex flex-col justify-center items-center gap-4 py-4 px-2">
                  <h3 className="text-xl pb-4 w-full text-center font-semibold text-sky-500">
                    ຂໍ້ກຳນົດບົດບາດໃຫ້ກັບບັນຊີນຳໃຊ້
                  </h3>
                  <div className="p-4 rounded-sm w-full h-auto md:flex md:justify-around sm:justify-center items-start gap-4">
                    <div className=" flex flex-col gap-2 mb-2">
                      <div className="py-3 px-4 md:w-[30rem] w-full flex gap-6 justify-start items-center rounded-sm border hover:border-sky-500 bg-gray-100">
                        <AccountCircleIcon
                          sx={{ fontSize: 30 }}
                          className="text-gray-400"
                        />
                        <span className="font-medium md:text-lg text-sm text-gray-500">
                          {UserName}
                        </span>
                      </div>
                      <div className="py-3 px-4 md:w-[30rem] w-full flex gap-6 justify-start items-center rounded-sm border hover:border-sky-500 bg-gray-100">
                        <EmailIcon
                          sx={{ fontSize: 30 }}
                          className="text-gray-400"
                        />
                        <span className="font-medium md:text-lg text-sm text-gray-500">
                          {Email}
                        </span>
                      </div>
                      <div className="py-3 px-4 md:w-[30rem] w-full flex gap-6 justify-start items-center rounded-sm border hover:border-sky-500 bg-gray-100">
                        <SettingsPhoneIcon
                          sx={{ fontSize: 30 }}
                          className="text-gray-400"
                        />
                        <span className="font-medium md:text-lg text-sm text-gray-500">
                          {Mobile}
                        </span>
                      </div>
                      <div className="md:w-[30rem] w-full flex flex-col justify-center items-start gap-2 mt-4">
                        <h3 className="text-gray-500 font-medium">
                          ເລືອກບົດບາດ:
                        </h3>
                        <FormControl className="w-full">
                          <InputLabel id="demo-simple-select-label">
                            {select}
                          </InputLabel>
                          <Select
                            onChange={(e) => setRole(e.target.value)}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={select}>
                            <MenuItem value="">
                              <span className="font-medium">
                                ໃຫ້ເລືອກບົດບາດ 1 ບົດບາດ
                              </span>
                            </MenuItem>
                            {roles.map((getrole, index) => (
                              <MenuItem key={index} value={getrole.RoleId}>
                                {getrole.RoleName === "admin" ? (
                                  <span className="font-medium text-gray-500 capitalize">
                                    (Admin) ຜູ້ບໍລິຫານ
                                  </span>
                                ) : getrole.RoleName === "manager" ? (
                                  <span className="font-medium text-gray-500 capitalize">
                                    (Manager) ຜູ້ຈັດການ
                                  </span>
                                ) : (
                                  <span className="font-medium text-gray-500 capitalize">
                                    (User) ຜູ້ນຳໃຊ້
                                  </span>
                                )}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className=" relative flex flex-col md:w-[20rem] w-full h-[19rem] justify-end items-end gap-4 p-2">
                      <div className="w-full absolute top-0 left-0">
                        <h3 className="text-red-400 font-medium mb-2">
                          ⚠️ ຄຳເຕືອນ:
                        </h3>
                        <span className="text-sm font-medium text-justify text-gray-500">
                          ບັນຊີທີໄດ້ກຳນົດບົດບາດແລ້ວ ຈະຕ້ອງໄດ້ປະຕິບັດຕາມຂໍ້ກຳນົດ
                          ເຊັ່ນ: ຖ້າເປັນ admin ຈະສາມາດຄວບຄຸມໄດ້ທຸກຢ່າງໃນລະບົບ,
                          manager ສາມາດເຮັດໄດ້ຮອງຈາກ admin ໄດ້ທຸກຢ່າງ ຍົກເວັ້ນ
                          ລົບຂໍ້ມູນຂອງຄົນອື່ນ ແລະ ສຸດທ້າຍ user
                          ຈະມີສິດການເຄື່ອນໄຫວກໍ່ຕໍ່ເມື່ອກຳນົດສິດທີໃນການນຳໃຊ້
                          ແມ່ນຈະຄວບຄຸມລະບົບຕາມການກຳນົດສິດທີຂອງ user ນັ້ນ.
                        </span>
                      </div>
                      <button
                        type="submit"
                        className="py-3  w-full shadow-md rounded-md active:scale-95 bg-sky-500 hover:bg-sky-600 text-white font-medium">
                        ບັນທຶກ
                      </button>
                      {/* <Button
                        sx={{ width: 300 }}
                        variant="contained"
                        color="info"
                        type="submit"
                        size="large"
                        className="active:scale-95 bg-slate-500 text-white py-2 text-medium text-xl px-12 drop-shadow-md rounded-sm">
                        save
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </form>
        </TabContext>
      </Box>
    </motion.div>
  )
}
