import React, { useState, useEffect } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import UpdateIcon from "@mui/icons-material/Update"
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred"
import swal from "sweetalert"
import { motion } from "framer-motion"
import HttpsIcon from "@mui/icons-material/Https"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "@mui/material"

export default function UpdateForme() {
  const { UserName } = useParams()
  const navigate = useNavigate()
  const [Password, setPassword] = useState("")
  const [newPass, setNewPass] = useState("")
  const [cnewPassword, setCnewPassword] = useState("")

  useEffect(() => {
    fetch("/apiuser/" + UserName)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setPassword(res.UserName)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [UserName])

  // update user login
  const UpdateUser = (e) => {
    e.preventDefault()
    if (!Password) {
      swal("ປ້ອນລະຫັດຜ່ານເກົ່າ!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!newPass) {
      swal("ປ້ອນລະຫັດຜ່ານໃໝ່!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (cnewPassword !== newPass) {
      swal("ຢືນຢັນປ້ອນລະຫັດຜ່ານໃໝ່!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else {
      const empdata = { UserName, Password, newPass }

      fetch("http://192.168.0.12:8000/apiuser/hack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empdata),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "ok") {
            swal({
              title: "ສຳເລັດແລ້ວ",
              text: "ທ່ານໄດ້ປ່ຽນລະຫັດຜ່ານໃໝ່ແລ້ວ",
              icon: "success",
              button: "ເຂົ້າໃຈແລ້ວ",
            })
            navigate("/BannerProfile")
          } else if (result.status === "error") {
            swal({
              title: "ຂໍອາໄພ!",
              text: "ລະຫັດຜ່ານເກົ່າບໍ່ຖຶກຕ້ອງ",
              icon: "error",
              button: "ເຂົ້າໃຈແລ້ວ",
            })
          }
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  const backUser = () => {
    navigate("/BannerProfile")
  }

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      className="lg:pt-0 md:pt-0 sm:pt-14 pt-14">
      <div className="border rounded-md py-8 h-screen bg-white">
        <header className="w-full py-2 px-4 rounded-sm mb-2 text-center">
          <h3 className="md:text-2xl text-xl font-medium text-red-500 drop-shadow-sm">
            ປ່ຽນລະຫັດຜ່ານໃໝ່
          </h3>
        </header>
        <form
          onSubmit={UpdateUser}
          className="w-full py-4 px-2 flex flex-col gap-4">
          <div className="md:flex justify-center items-center gap-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <NoEncryptionGmailerrorredIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
                placeholder="ໃສ່ລະຫັດຜ່ານເກົ່າ"
                type="text"
              />
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <HttpsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setNewPass(e.target.value)}
                type="text"
                placeholder="ລະຫັດຜ່ານໃໝ່"
                className="placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
              />
            </label>
          </div>

          <div className="md:flex justify-center items-center gap-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <HttpsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setCnewPassword(e.target.value)}
                type="text"
                placeholder="ຢືນຢັນລະຫັດຜ່ານໃໝ່"
                className="placeholder:text-slate-300 md:w-[25rem] w-full block bg-white border border-slate-300 rounded-md py-3 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
              />
            </label>
          </div>

          <div className="w-full flex justify-center gap-4 items-center mt-4">
            <Link
              onClick={backUser}
              underline="none"
              className="active:scale-90 w-48 bg-red-500 py-2 flex justify-center items-center rounded-md text-white cursor-pointer">
              <ArrowBackIcon sx={{ color: "#ffff"}} />
              <span className="ml-2 text-white">ກັບຄືນ</span>
            </Link>
            <button
              size="large"
              variant="contained"
              color="info"
              type="submit"
              className="active:scale-90 md:mt-0 mt-8 w-48 bg-sky-500 py-2 rounded-md text-white">
              <UpdateIcon />
              <span className="ml-2">ອັບແດບລະຫັດຜ່ານ</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
