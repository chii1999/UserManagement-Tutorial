import React, { useState, useEffect } from "react"
import "../App.css"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AddIcon from "@mui/icons-material/Add"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import swal from "sweetalert"
import { motion } from "framer-motion"
import UserShowId from "./UserShowId"

export default function AddProfile() {
  // get data user from login
  const [UserId, setUserId] = useState("")
  const [idtoken, setIdtoken] = useState("")
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Gender, setGender] = useState("")
  const [Dob, setDob] = useState("")
  const [VillageName, setVillageName] = useState("")
  
  useEffect(() => {
    const token = localStorage.getItem("Token")
    var myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    }

    fetch("http://192.168.0.236:8000/apilogin/gettoken", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setIdtoken(result.userlogin)
        }
      })
      .catch((error) => console.log("error", error))
  }, [])
  //  end get token login form user

  // ພາກສ່ວນດຶງຂໍ້ມູນຈາກການເລືອກແຂວງ ໃຫ້ສະແດງເມືອງສະເພາະແຂວງນັ້ນ.
  const [countrydata, setCountrydata] = useState([])
  const [ProvinceId, setProvinceId] = useState("")
  const [DistrictId, setDistrictid] = useState("")
  const [statedata, setStetedata] = useState([])
  const [enable, setEnable] = useState(true)

  useEffect(() => {
    getcountry()
  }, [])

  const getcountry = async () => {
    const reqdata = await fetch("http://192.168.0.236:8000/apiprovince")
    const resdata = await reqdata.json()
    setCountrydata(resdata)
  }

  const handlecountry = async (e) => {
    const ProvinceId = e.target.value
    setProvinceId(ProvinceId)
    if (ProvinceId !== "") {
      const reqstatedata = await fetch(
        "http://192.168.0.236:8000/apiprofile/getdistrict/" + ProvinceId
      )
      const resstatedata = await reqstatedata.json()
      setStetedata(resstatedata)
      setEnable(false)
    } else {
      setStetedata([])
      setEnable(true)
    }
  }

  const handleDistrict = (e) => {
    const getstateid = e.target.value
    setDistrictid(getstateid)
  }

  // create profile
  const insertProfile = (e) => {
    e.preventDefault()
    if (!UserId) {
      swal("ປ້ອນລະຫັດ user ໃຫ້ຕົງກັບຂໍ້ມູນໂປຣໄຟຣນີ້!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!FirstName) {
      swal("ກະລຸນາປ້ອນຊື່ໂປຣໄຟຣ!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!LastName) {
      swal("ກະລຸນາປ້ອນນາມສະກຸນ!", {
         buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!Gender) {
      swal("ກະລຸນາເລືອກເພດ!", {
         buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!Dob) {
      swal("ກະລຸນາປ້ອນວັນທີ,ເດືອນ,ປີ!", {
         buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!ProvinceId) {
      swal("ເຈົ້າເປັນຄົນແຂວງໃດ ໃຫ້ເລືອກແຂວງນັ້ນ!", {
         buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!DistrictId) {
      swal("ເລືອກເມືອງປະຈຸບັນ!", {
         buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!VillageName) {
      swal({
        title: "ປ້ອນຊື່ບ້ານປະຈຸບັນ! ຂອບໃຈ",
        button: false,
      })
    } else {
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      var raw = JSON.stringify({
        ProvinceId: ProvinceId,
        DistrictId: DistrictId,
        FirstName: FirstName,
        LastName: LastName,
        Gender: Gender,
        Dob: Dob,
        VillageName: VillageName,
        UserId: UserId,
      })

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      fetch("http://192.168.0.236:8000/apiprofile/create", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "ok") {
            swal({
              title: "ສຳເລັດແລ້ວ",
              text: "ບັນຊີນີ້ມີຂໍ້ມູນໂປຣໄຟຣແລ້ວ",
              icon: "success",
              button: "OK",
            })
          } else if(result.status === "error") {
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
      className="lg:pt-0 md:pt-14 sm:pt-14 pt-14">
      <div className="border rounded-sm p-4">
        <header className="w-full text-center py-2 px-4 rounded-sm mb-2">
          <h3 className="text-xl font-medium text-sky-400">
            ຟອມບັນທຶກຂໍ້ມູນໂປຣໄຟຣຂອງຕົນເອງ
          </h3>
        </header>
        <Divider className="mb-6" />
        <form onSubmit={insertProfile} className="flex flex-col gap-4">
          <div className="my-2 mx-6 md:flex justify-end items-center gap-4">
            <UserShowId />
            <label className="relative block">
              <input 
                onChange={(e) => setUserId(e.target.value)}
                // value={UserId.UserId}
                className=" placeholder:text-slate-400 block border-b border-b-sky-500 w-52 pl-4 py-2 outline-none"
                type="number"
                placeholder="ລະຫັດ USER"
              />
            </label>
          </div>
          <div className="my-2 mx-6">
            <span className="font-medium text-gray-500 -mb-2">
              ຊື່ພະນັກງານ:
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <TextFieldsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                className="placeholder:italic placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none"
                placeholder="........."
                type="text"
              />
            </label>
          </div>
          <div className="my-2 mx-6">
            <span className="font-medium text-gray-500 -mb-2">ນາມສະກຸນ:</span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <TextFieldsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setLastName(e.target.value)}
                className="placeholder:italic placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none"
                placeholder="........."
                type="text"
              />
            </label>
          </div>
          <div className="my-2 mx-6">
            <span className="font-medium text-gray-500 -mb-2">ເພດ:</span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <SpellcheckIcon className="text-gray-400" />
              </span>
              <select
                onChange={(e) => setGender(e.target.value)}
                id="gender"
                className="placeholder:italic placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none">
                <option value="">---ເລຶອກເພດ---</option>
                <option value="ຍິງ">ເພດຍິງ</option>
                <option value="ຊາຍ">ເພດຊາຍ</option>
              </select>
            </label>
          </div>
          <div className="my-2 mx-6">
            <span className="font-medium text-gray-500 -mb-2">
              ວັນທີ, ເດືອນ, ປີເກີດ:
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <TextFieldsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setDob(e.target.value)}
                className="placeholder:italic placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none"
                type="date"
              />
            </label>
          </div>

          <div className="my-2 mx-6">
            <span className="font-medium text-gray-500 -mb-2">ຂໍ້ມູນແຂວງ:</span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <CheckCircleIcon className="text-sky-400" />
              </span>
              <select
                onChange={(e) => handlecountry(e)}
                id="provinceid"
                className="placeholder:italic placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none">
                <option value="">---ເລືອກແຂວງປະຈຸບັນ---</option>

                {countrydata.map((getcountry, index) => (
                  <option key={index} value={getcountry.ProvinceId}>
                    ແຂວງ {getcountry.ProvinceName}{" "}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="my-2 mx-6">
            <span className="font-medium text-gray-500 -mb-2">
              ຂໍ້ມູນເມືອງ:
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <CheckCircleIcon className="text-sky-400" />
              </span>
              <select
                onChange={(e) => handleDistrict(e)}
                id="provinceid"
                disabled={enable}
                className="placeholder:italic placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none">
                <option value="">---ເລືອກເມືອງປະຈຸບັນ---</option>

                {statedata.map((getdistrict, index) => (
                  <option key={index} value={getdistrict.DistrictId}>
                    ເມືອງ {getdistrict.DistrictName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="my-2 mx-6">
            <span className="font-medium text-gray-500 -mb-2">
              ປ້ອນຊື່ບ້ານປະຈຸບັນ:
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <TextFieldsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setVillageName(e.target.value)}
                className="placeholder:italic placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none"
                placeholder="........."
                type="text"
              />
            </label>
          </div>
          <div className="py-2 px-8 text-right w-full flex justify-end items-center gap-2">
            <Button type="reset" size="large">
              <span>ລ້າງຂໍ້ມູນໃໝ່</span>
              <RestartAltIcon />
            </Button>
            <Button
              size="large"
              variant="contained"
              type="submit"
              className="active:scale-90">
              <span>ເພິ່ມຂໍ້ມູນ</span>
              <AddIcon />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
