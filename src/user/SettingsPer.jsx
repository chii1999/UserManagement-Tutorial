import React, { useState, useEffect } from "react"
import "../App.css"
import Box from "@mui/material/Box"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import Divider from "@mui/material/Divider"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import FormGroup from "@mui/material/FormGroup"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import EmailIcon from "@mui/icons-material/Email"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import DnsIcon from "@mui/icons-material/Dns"
import swal from "sweetalert"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function LabTabs() {
  const { UserId } = useParams()
  const navigate = useNavigate()
  const [UserName, setUserName] = useState("")
  const [Email, setEmail] = useState("")
  const [Rolename, setRolename] = useState("")

  useEffect(() => {
    fetch("http://192.168.0.12:8000/apiroles/all/" + UserId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setUserName(res.UserName)
        setEmail(res.Email)
        setRolename(res.Rolename)
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

  const resetData = (e) => {
    e.preventDefault()
    setPermCreate("")
    setPermRead("")
    setPermUpdate("")
    setPermDelete("")
  }

  // insert role data
  const handlePermission = (e) => {
    e.preventDefault()
    if (
      PermCreate === "" &&
      PermRead === "" &&
      PermUpdate === "" &&
      PermDelete === ""
    ) {
      swal({
        title: "ແຈ້ງເຕືອນ",
        text: "ຂໍ້ມູນໃນຟິວທັງໝົດນີ້ຍັງຫວ່າງຢູ່?",
        icon: "info",
        buttons: false,
      })
    } else {
      const getData = { UserId, PermCreate, PermRead, PermUpdate, PermDelete }

      axios
        .post("http://192.168.0.12:8000/apiperm/create", getData)
        .then((res) => {
          swal({
            title: "ສຳເລັດແລ້ວ",
            text: "ທ່ານຕ້ອງການໄປຫາໜ້າໃດ?",
            icon: "success",
            buttons: false,
          }).then((willDelete) => {
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
          <form className="-mt-6">
            <TabPanel>
              <div className="border bg-white rounded-md md:p-4 p-2 mb-6">
                <h3 className="md:text-xl text-lg flex justify-center items-start w-full my-8 font-semibold text-sky-500">
                  ການກຳນົດສິດທີໃຫ້ກັບບັນຊີຜູ້ໃຊ້
                </h3>
                <div className="lg:flex justify-between items-start mt-4 gap-8">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="py-3 px-4 md:w-[30rem] w-full flex gap-6 justify-start items-center rounded-sm border hover:border-pink-500 bg-gray-100">
                      <AccountCircleIcon
                        sx={{ fontSize: 25 }}
                        className="text-gray-400"
                      />
                      <span className="font-medium md:text-lg text-sm text-gray-500">
                        {UserName}
                      </span>
                    </div>
                    <div className="py-3 px-4 md:w-[30rem] w-full flex gap-6 justify-start items-center rounded-sm border hover:border-pink-500 bg-gray-100">
                      <EmailIcon
                        sx={{ fontSize: 25 }}
                        className="text-gray-400"
                      />
                      <span className="font-medium md:text-lg text-sm text-gray-500">
                        {Email}
                      </span>
                    </div>
                    <div className="py-3 px-4 md:w-[30rem] w-full flex gap-6 justify-start items-center rounded-sm border hover:border-pink-500 bg-gray-100">
                      <DnsIcon
                        sx={{ fontSize: 25 }}
                        className="text-gray-400"
                      />
                      {Rolename === "admin" ? (
                        <span className="font-medium md:text-lg text-sm text-gray-500 capitalize">
                          {Rolename} ບົດບາດຜູ້ບໍລິຫານລະບົບ
                        </span>
                      ) : Rolename === "manager" ? (
                        <span className="font-medium md:text-lg text-sm text-gray-500 capitalize">
                          {Rolename} ບົດບາດຜູ້ຈັດການລະບົບ
                        </span>
                      ) : (
                        <span className="font-medium md:text-lg text-sm text-gray-500 capitalize">
                          {Rolename} ບົດບາດຜູ້ນຳໃຊ້ລະບົບ
                        </span>
                      )}
                    </div>

                    <span className="mt-8 font-medium">
                      ລະຫັດ user: {UserId}
                    </span>
                    <div className="flex justify-center items-center gap-1">
                      <span className="w-14 h-12 p-4 flex justify-center items-center text-3xl font-bold text-white rounded-md bg-gray-400">
                        {PermCreate}
                      </span>
                      <span className="w-14 h-12 p-4 flex justify-center items-center text-3xl font-bold text-white rounded-md bg-gray-400">
                        {PermRead}
                      </span>
                      <span className="w-14 h-12 p-4 flex justify-center items-center text-3xl font-bold text-white rounded-md bg-gray-400">
                        {PermUpdate}
                      </span>
                      <span className="w-14 h-12 p-4 flex justify-center items-center text-3xl font-bold text-white rounded-md bg-gray-400">
                        {PermDelete}
                      </span>
                    </div>
                  </div>

                  <FormGroup
                    aria-label="position"
                    className=" lg:pl-[5rem] md:pl-2 pl-2 lg:mt-0 md:mt-4 mt-4 w-full">
                    <div>
                      <span className="font-semibold text-gray-500">
                        🔒ຂໍ້ກຳນົດການໃຊ້ງານໃນລະບົບ
                      </span>
                    </div>
                    <Divider /> 
                      <div className="w-full">
                        <FormControlLabel
                          onChange={(e) => setPermCreate(e.target.value)}
                          value="1"
                          control={<Checkbox color="secondary" />}
                          label={createAll}
                          labelPlacement="end"
                          className="w-full"
                        />
                        <FormControlLabel
                          onChange={(e) => setPermRead(e.target.value)}
                          value="1"
                          control={<Checkbox color="secondary" />}
                          label={makeData}
                          labelPlacement="end"
                          className="w-full"
                        />
                        <FormControlLabel
                          onChange={(e) => setPermUpdate(e.target.value)}
                          value="1"
                          control={<Checkbox color="secondary" />}
                          label={updateData}
                          labelPlacement="end"
                          className="w-full"
                        />
                        <FormControlLabel
                          onChange={(e) => setPermDelete(e.target.value)}
                          value="1"
                          control={<Checkbox color="secondary" />}
                          label={deleteData}
                          labelPlacement="end"
                          className="w-full"
                        />
                      </div> 
                  </FormGroup>
                </div>

                <div className=" lg:-mt-10 md:mt-4 mt-6 flex lg:justify-end md:justify-between justify-between items-center gap-4">
                  <button
                    onClick={() => resetData()}
                    className="py-3 md:px-6 px-2 active:scale-95 text-white bg-rose-500 font-medium rounded-md flex md:gap-4 gap-2 justify-center items0-center">
                    <RestartAltIcon />
                    <span className="md:text-md text-sm">ລ້າງຂໍ້ມູນໃໝ່</span>
                  </button>
                  <button
                    onClick={handlePermission}
                    type="submit"
                    className="py-3 px-6 active:scale-95 text-white bg-sky-500 font-medium rounded-md flex md:gap-4 gap-2 justify-center items0-center">
                    <DoneAllIcon />
                    <span className="md:text-md text-sm">ບັນທຶກ</span>
                  </button>
                </div>
              </div>
            </TabPanel>
          </form>
        </TabContext>
      </Box>
    </motion.div>
  )
}
