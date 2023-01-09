import React, { useState, useEffect } from "react"
import "../App.css"
import Box from "@mui/material/Box"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import FormGroup from "@mui/material/FormGroup"
import Button from "@mui/material/Button"
import { useParams, useNavigate } from "react-router-dom"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import swal from "sweetalert"
import axios from "axios"
import { motion } from "framer-motion"

export default function LabTabs() {
  const { UserId } = useParams()
  const navigate = useNavigate()
  const [UserName, setUserName] = useState("")
  const [Email, setEmail] = useState("")
  const [Rolename, setRolename] = useState("")
  const [RoleId, setRole] = useState("")

  useEffect(() => {
    fetch("http://192.168.0.12:8000/apiroles/all/" + UserId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setUserName(res.UserName)
        setEmail(res.Email)
        setRolename(res.Rolename)
        setRole(res.RoleId)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [UserId])

  if (Rolename === "admin") {
    swal({
      title: "ການແຈ້ງເຕືອນ!",
      text: "ບັນຊີທີມີສະຖານະເປັນ Admin ບໍ່ຈຳເປັນຕ້ອງກຳນົດສິດທີ",
      icon: "warning",
      button: false,
    })
    navigate("/settingrole")
  }

  const [PermCreate, setPermCreate] = useState("")
  const [PermRead, setPermRead] = useState("")
  const [PermUpdate, setPermUpdate] = useState("")
  const [PermDelete, setPermDelete] = useState("")

  const resetData = () => {
    setPermCreate("")
    setPermRead("")
    setPermUpdate("")
    setPermDelete("")
  }

  // insert role data
  const handlePermission = (e) => {
    e.preventDefault()
      const getData = { UserId, PermCreate, PermRead, PermUpdate, PermDelete }

      axios
        .post("http://192.168.0.12:8000/apiperm/create", getData)
        .then((res) => {
          swal({
            title: "ສຳເລັດແລ້ວ",
            text: "ທ່ານຕ້ອງການໄປຫາໜ້າໃດ?",
            icon: "success",
            buttons: "ຢູ່ບ່ອນນີ້ອິກ",
          })
          .then((willDelete) => {
            if (willDelete) {
              
            } else {
              navigate("/settingrole")
            }
          })
        })
        .catch((error) => {
          console.log(error.message)
        })
  }


  // Other...............................

  const createAll = (
    <span className="font-medium text-gray-500">ສາມາດສ້າງຂໍ້ມູນໃໝ່</span>
  )
  const makeData = (
    <span className="font-medium text-gray-500">ອ່ານ ຫຼື ເບິ່ງຂໍ້ມູນ</span>
  )
  const updateData = (
    <span className="font-medium text-gray-500">ສາມາດແກ້ໄຂຂໍ້ມູນ</span>
  )
  const deleteData = (
    <span className="font-medium text-gray-500">ລືບຂໍ້ມູນໃນລະບົບໄດ້</span>
  )

  return (
    <motion.div animate={{ x: 0 }} initial={{ x: -100 }}>
      <Box
        sx={{ width: "100%", typography: "body1" }}
        className="lg:pt-0 md:pt-0 sm:pt-14 pt-14">
        <TabContext>
          <form className="-mt-6" onSubmit={handlePermission}>
            <TabPanel>
              <div className="border rounded-md p-4">
                <h3 className="text-xl flex justify-center items-start w-full my-4 font-semibold text-sky-500">
                  ການຕັ້ງຄ່າສິດນຳໃຊ້ ໃຫ້ກັບ Users
                </h3>
                <Divider />
                {/* <pre> {JSON.stringify(Uname)} </pre> */}
                <div className="lg:flex justify-between items-start mt-4 gap-8">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={UserName}
                      inputProps={{ readOnly: true }}
                      className="md:w-[27rem] sm:w-full border-b-2 border-b-slate-400 outline-none"
                    />
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={Email}
                      inputProps={{ readOnly: true }}
                      className="md:w-[27rem] sm:w-full"
                    />
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={Rolename}
                      inputProps={{ readOnly: true }}
                      className="md:w-[27rem] sm:w-full"
                    />
                    <span className="mt-8">
                      ລະຫັດ user: {UserId}
                    </span>
                    <div className="flex justify-center items-center gap-2">
                    <span className="w-14 h-12 p-4 flex justify-center items-center text-3xl font-medium text-white rounded-md bg-sky-500">{PermCreate}</span>
                    <span className="w-14 h-12 p-4 flex justify-center items-center text-3xl font-medium text-white rounded-md bg-sky-500">{PermRead}</span>
                    <span className="w-14 h-12 p-4 flex justify-center items-center text-3xl font-medium text-white rounded-md bg-sky-500">{PermUpdate}</span>
                    <span className="w-14 h-12 p-4 flex justify-center items-center text-3xl font-medium text-white rounded-md bg-sky-500">{PermDelete}</span>
                    </div>
                  </div>

                  <FormGroup
                    aria-label="position"
                    className="md:pl-[5rem] pl-4 md:mt-0 mt-4">
                    <div>
                      <span className="font-semibold text-gray-500">
                        ຂໍ້ກຳນົດການໃຊ້ງານໃນລະບົບ
                      </span>
                    </div>
                    <Divider />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormControlLabel
                          onChange={(e) => setPermCreate(e.target.value)}
                          value="1"
                          control={<Checkbox color="secondary" />}
                          label={createAll}
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          onChange={(e) => setPermRead(e.target.value)}
                          value="1"
                          control={<Checkbox color="secondary" />}
                          label={makeData}
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          onChange={(e) => setPermUpdate(e.target.value)}
                          value="1"
                          control={<Checkbox color="secondary" />}
                          label={updateData}
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          onChange={(e) => setPermDelete(e.target.value)}
                          value="1"
                          control={<Checkbox color="secondary" />}
                          label={deleteData}
                          labelPlacement="end"
                        />
                      </div>
                    </div>
                  </FormGroup>
                </div>

                <div className="mt-8 flex lg:justify-end md:justify-end sm:justify-between items-center gap-2">
                  <Button
                    onClick={() => resetData()}
                    className="active:scale-90 flex justify-center md:w-52 sm:w-full items-center gap-2">
                    <span className="my-1">ລ້າງຂໍ້ມູນໃໝ່</span>
                    <RestartAltIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    className="active:scale-90 flex justify-center md:w-52 sm:w-full items-center gap-2">
                    <span className="my-1">ບັນທຶກການຕັ້ງຄ່າ</span>
                    <DoneAllIcon />
                  </Button>
                </div>
              </div>
            </TabPanel>
          </form>
        </TabContext>
      </Box>
    </motion.div>
  )
}
