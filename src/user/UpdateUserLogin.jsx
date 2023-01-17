import React, { useState, useEffect } from "react"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import TtyIcon from "@mui/icons-material/Tty"
import MailIcon from "@mui/icons-material/Mail"
import HttpsIcon from "@mui/icons-material/Https"
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges"
import swal from "sweetalert"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export default function FormUse() {
  const { UserId } = useParams()
  const navigate = useNavigate()
  const [UserName, setUsername] = useState("")
  const [Email, setEmail] = useState("")
  const [Mobile, setMobile] = useState("")
  const [Password, setPassword] = useState("")
  const [Cpassword, setCpassword] = useState("")

  useEffect(() => {
    fetch(`http://192.168.0.236:8000/apiuser/${UserId}`)
      .then((res) => {
        return res.json()
      })  
      .then((res) => {
        setUsername(res.UserName)
        setEmail(res.Email)
        setMobile(res.Mobile)
        setPassword(res.Password)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [UserId])

  // update user login
  const UpdateUser = (e) => {
    e.preventDefault()
    if (!Cpassword) {
      swal("ຢືນຢັນລະຫັດຜ່ານ!", {
        buttons: ["ບໍ່ລືມອິກຕໍ່ໄປ", "OK"],
      })
    } else if (Cpassword !== Password) {
      swal("ຢືນຢັນລະຫັດຜ່ານບໍ່ຕົງກັນ!", {
        buttons: ["ບໍ່ລືມອິກຕໍ່ໄປ", "OK"],
      })
    } else {
      const empdata = { UserId, UserName, Email, Mobile, Password }

      fetch("http://192.168.0.236:8000/apiuser/update/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empdata),
      })
        .then((res) => {
          swal({
            title: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ",
            icon: "success",
            button: "OK",
            timer: 5000,
          })
          navigate("/UserLogin")
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  const backUser = () => {
    navigate("/UserLogin")
  }

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: -100 }}
      className="lg:pt-0 md:pt-0 sm:pt-14 pt-14">
      <div className="border rounded-md bg-white p-4">
        <header className="w-full py-2 px-4 rounded-sm mb-2 text-center">
          <h3 className="md:text-2xl text-xl font-medium text-sky-500 drop-shadow-sm">
            ແກ້ໄຂຂໍ້ມູນຜູ້ນຳໃຊ້ລະບົບ
          </h3>
        </header>
        <Divider className="mb-6" />
        <form
          onSubmit={UpdateUser}
          className="w-full py-4 px-2 flex flex-col gap-4">
          <div className="md:flex justify-center items-center gap-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <TextFieldsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={UserName}
                className="placeholder:italic placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
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
                className="peer placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
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
                className="peer placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
              />
              <p className="mt-2 invisible absolute left-2 -bottom-4 peer-invalid:visible text-red-500 text-[0.8rem]">
                ກະລຸນາປ້ອນອີເມວຂອງທ່ານໃຫ້ຖຶກຕ້ອງຕາມຮູບແບບ
              </p>
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <HttpsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                className="placeholder:italic placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
                placeholder="ປ້ອນຕົວອັກສອນ.."
                type="text"
                required
              />
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <HttpsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setCpassword(e.target.value)}
                className="placeholder:italic placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
                placeholder="ຢືນຢັນລະຫັດຜ່ານ"
                type="password"
                // required
              />
            </label>
          </div>

          <div className="w-full flex justify-center gap-4 items-center mt-4">
            <Button
              size="large"
              variant="contained"
              color="error"
              type="submit"
              onClick={backUser}
              className="active:scale-90">
              <ArrowBackIcon />
              <span className="ml-2">Back</span>
            </Button>
            <Button
              size="large"
              variant="contained"
              color="success"
              type="submit"
              className="active:scale-90 md:mt-0 mt-8">
              <PublishedWithChangesIcon />
              <span className="ml-2">update</span>
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
