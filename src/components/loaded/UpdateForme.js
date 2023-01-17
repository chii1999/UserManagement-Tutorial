import React, { useState, useEffect } from "react"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import TtyIcon from "@mui/icons-material/Tty"
import MailIcon from "@mui/icons-material/Mail"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import UpdateIcon from "@mui/icons-material/Update"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import swal from "sweetalert"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function UpdateForme() {
  const { UserId } = useParams()
  const navigate = useNavigate()
  const [UserName, setUsername] = useState("")
  const [Email, setEmail] = useState("")
  const [Mobile, setMobile] = useState("")

  useEffect(() => {
    fetch("http://192.168.0.236:8000/apiuser/" + UserId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setUsername(res.UserName)
        setEmail(res.Email)
        setMobile(res.Mobile)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [UserId])

  // update user login
  const UpdateUser = (e) => {
    e.preventDefault()
    const empdata = { UserId ,UserName, Email, Mobile }

    fetch("http://192.168.0.236:8000/apiuser/updateforme/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        swal({
          title: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ",
          icon: "success",
          button: "OK",
          timer: 8000
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const backUser = () => {
    navigate("/BannerProfile")
  }

  return (
    <motion.div 
    animate={{ y: 0 }}
    initial={{ y: -100 }}
    className="lg:pt-0 md:pt-0 sm:pt-14 pt-14">
      <div className="border rounded-md p-4 h-screen bg-white">
        <header className="w-full py-2 px-4 rounded-sm mb-2 text-center">
          <h3 className="md:text-2xl text-xl font-medium text-sky-500 drop-shadow-sm">
            ຟອມແກ້ໄຂຂໍ້ມູນຂອງຂ້ອຍໃໝ່
          </h3>
        </header>
        <Divider className="mb-6" />
        <form
          onSubmit={UpdateUser}
          className="w-full py-4 px-2 flex flex-col gap-4">
          <div className="md:flex justify-center items-center gap-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <AccountCircleIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={UserName}
                className="placeholder:italic placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-green-200 focus:ring-green-200 focus:ring-1 sm:text-md"
                placeholder="ປ້ອນຕົວອັກສອນ..."
                type="text"
                required
              />
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <MailIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                type="email"
                placeholder="ຕົວອັກສອນ,ເຄື່ອງໝາຍ,ສັນຍາລັກ"
                className="peer placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-green-200 focus:ring-green-200 focus:ring-1 sm:text-md"
              />
              <p className="mt-2 invisible absolute left-2 -bottom-4 peer-invalid:visible text-red-500 text-[0.8rem]">
                ກະລຸນາປ້ອນອີເມວຂອງທ່ານໃຫ້ຖຶກຕ້ອງຕາມຮູບແບບ
              </p>
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <TtyIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setMobile(e.target.value)}
                value={Mobile}
                type="text"
                placeholder="ປ້ອນຕົວເລກ"
                className="peer placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-green-200 focus:ring-green-200 focus:ring-1 sm:text-md"
              />
              <p className="mt-2 invisible absolute left-2 -bottom-4 peer-invalid:visible text-red-500 text-[0.8rem]">
                ກະລຸນາປ້ອນອີເມວຂອງທ່ານໃຫ້ຖຶກຕ້ອງຕາມຮູບແບບ
              </p>
            </label>
          </div>

          <div className="w-full flex justify-center gap-4 items-center mt-4">
            <Button
              size="large"
              variant="contained"
              color="error"
              type="submit"
              onClick={backUser}
              className="active:scale-90 w-48">
              <ArrowBackIcon />
              <span className="ml-2">ກັບຄືນ</span>
            </Button>
            <Button
              size="large"
              variant="contained"
              color="success"
              type="submit"
              className="active:scale-90 md:mt-0 mt-8 w-48">
              <UpdateIcon />
              <span className="ml-2">ອັບແດບຂໍ້ມູນ</span>
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
