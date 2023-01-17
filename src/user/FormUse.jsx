import React, { useState } from "react"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import TtyIcon from "@mui/icons-material/Tty"
import MailIcon from "@mui/icons-material/Mail"
import HttpsIcon from "@mui/icons-material/Https"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import swal from "sweetalert"
import { motion } from "framer-motion"
export default function FormUse() {
  // const [id, setId] = useState("")
  const [UserName, setUsername] = useState("")
  const [Email, setEmail] = useState("")
  const [Mobile, setMobile] = useState("")
  const [Password, setPassword] = useState("")
  const [cPassword, setCpassword] = useState("")

  // check regex in inputs
  const regexMobile = /^0?(20)[2579]\d{7}$/
  const regexUsername = /^[A-Za-z]{3,16}$/
  const regexPass = /^.{6,}/

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!UserName) {
      swal("ກະລຸນາປ້ອນຊື່ຜູ້ນຳໃຊ້!", {
        buttons: ["ບໍ່ລືມອິກຕໍ່ໄປ", "OK"],
      })
    } else if (!UserName.match(regexUsername)) {
      swal("ຊື່ຕ້ອງມີ ຕົວໃຫຍ່, ຕົວໜ້ອຍ ແລະ ຢ່າງນ້ອຍ 3 - 16 ຕົວອັກສອນ", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (!Email) {
      swal("ກະລຸນາປ້ອນອີເມວ!", {
        buttons: ["ບໍ່ລືມອິກຕໍ່ໄປ", "OK"],
      })
    } else if (!Mobile) {
      swal("ກະລຸນາປ້ອນເບີໂທລະສັບ!", {
        buttons: ["ບໍ່ລືມອິກຕໍ່ໄປ", "OK"],
      })
    } else if (!Mobile.match(regexMobile)) {
      swal("ເບີໂທລະສັບຕ້ອງແມ່ນ 020 || 030 ຫ້າມຍະຫວ່າງ ແລະ ບໍ່ເກີນ 8 ຫລັກ!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
        position: 'start'
      })
      return false
    } else if (!Password) {
      swal("ກະລຸນາປ້ອນລະຫັດ!", {
        buttons: ["ບໍ່ລືມອິກຕໍ່ໄປ", "OK"],
      })
    } else if(!Password.match(regexPass)){
      swal("ລະຫັດຜ່ານຢ່າງໜ້ອຍ 6 ຫຼັກຂື້ນໄປ", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!cPassword) {
      swal("ຢືນຢັນລະຫັດຜ່ານໃຫ້ຄືກັນ!", {
        buttons: ["ບໍ່ລືມອິກຕໍ່ໄປ", "OK"],
      })
    } else if (Password !== cPassword) {
      swal("ຢືນຢັນລະຫັດຜ່ານບໍ່ຕົງກັນ!", {})
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

      fetch("http://192.168.0.236:8000/apiuser/create", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "ok") {
            swal({
              title: "ສຳເລັດແລ້ວ",
              text: "ບັນຊີນີ້ພ້ອມໃຊ້ງານໄດ້ແລ້ວ",
              icon: "success",
              button: "OK",
            })
          } else {
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

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      className="md:pt-0 pt-12">
      <div className="rounded-md p-4 h-screen">
        <header className="w-full py-2 px-4 rounded-sm mb-2 text-center">
          <h3 className="md:text-2xl text-xl font-medium text-sky-500 drop-shadow-sm">
            ສ້າງບັນຊີໃຫ້ກັບຜູ້ນຳໃຊ້ ໂດຍຜູ້ບໍລິຫານ
          </h3>
        </header>
        <Divider className="mb-6" />
        <form
          onSubmit={handleSubmit}
          className="w-full py-4 px-2 flex flex-col gap-4">
          <div className="md:flex justify-center items-center gap-2">
            <span className="px-4 w-52 font-semibold text-gray-400">
              ຊື່ຜູ້ນຳໃຊ້ :
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <TextFieldsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                className="placeholder:italic placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
                placeholder="ຊື່...."
                type="text"
              />
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <span className="px-4 w-52 font-semibold text-gray-400">
              ອີເມວທີຢູ່ :
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <MailIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="ອີເມວທີຢູ່"
                className="peer placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
              />
              <p className="mt-2 invisible absolute left-2 -bottom-4 peer-invalid:visible text-red-500 text-[0.8rem]">
                ກະລຸນາປ້ອນອີເມວຂອງທ່ານໃຫ້ຖຶກຕ້ອງຕາມຮູບແບບ
              </p>
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <span className="px-4 w-52 font-semibold text-gray-400">
              ເບີໂທຕິດຕໍ່ :
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <TtyIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                id="mobile"
                placeholder="ເບີໂທລະສັບ"
                className="peer placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
              />
              <p className="mt-2 invisible absolute left-2 -bottom-4 peer-invalid:visible text-red-500 text-[0.8rem]">
                ກະລຸນາປ້ອນອີເມວຂອງທ່ານໃຫ້ຖຶກຕ້ອງຕາມຮູບແບບ
              </p>
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <span className="px-4 w-52 font-semibold text-gray-400">
              ລະຫັດຜ່ານ :
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <HttpsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="placeholder:italic placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
                placeholder="***********"
                type="password"
              />
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <span className="px-4 w-52 font-semibold text-gray-400">
              ຢືນຢັນລະຫັດຜ່ານ :
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <HttpsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setCpassword(e.target.value)}
                id="id"
                className="placeholder:italic placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
                placeholder="***********"
                type="password"
              />
            </label>
          </div>

          <div className="w-full flex justify-center gap-4 items-center mt-4">
            <Button
              size="large"
              variant="contained"
              color="error"
              type="reset"
              className="active:scale-90">
              <RestartAltIcon />
              <span className="ml-2">Reset</span>
            </Button>
            <Button
              size="large"
              variant="contained"
              color="info"
              type="submit"
              className="active:scale-90 md:mt-0 mt-8">
              <AddCircleIcon />
              <span className="ml-2">create</span>
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
