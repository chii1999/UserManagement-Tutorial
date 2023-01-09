import React, { useState, useEffect } from "react"
import "./App.css"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AddIcon from "@mui/icons-material/Add"
import TextSnippetIcon from "@mui/icons-material/TextSnippet"
import EmailIcon from "@mui/icons-material/Email"
import AddIcCallIcon from "@mui/icons-material/AddIcCall"
import LockIcon from "@mui/icons-material/Lock"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import swal from "sweetalert"
import axios from "axios"
import { Avatar } from "@mui/material"

export default function AddProfile() {
  const [UserName, setUserName] = useState("")
  const [Email, setEmail] = useState("")
  const [Mobile, setMobile] = useState("")
  const [Password, setPassword] = useState("")
  const [cPassword, setCpassword] = useState("")

  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Gender, setGender] = useState("")
  const [Dob, setDob] = useState("")
  const [VillageName, setVillageName] = useState("")
  const [DistrictId, setDistrictid] = useState("")
  const [ProvinceId, setProvinceId] = useState("")

  // ພາກສ່ວນດຶງຂໍ້ມູນຈາກການເລືອກແຂວງ ໃຫ້ສະແດງເມືອງສະເພາະແຂວງນັ້ນ.
  const [countrydata, setCountrydata] = useState([])
  const [statedata, setStetedata] = useState([])
  const [enable, setEnable] = useState(true)

  useEffect(() => {
    getcountry()
  }, [])

  const getcountry = async () => {
    const reqdata = await fetch("http://192.168.0.12:8000/apiprovince")
    const resdata = await reqdata.json()
    setCountrydata(resdata)
  }

  const handlecountry = async (e) => {
    const ProvinceId = e.target.value
    setProvinceId(ProvinceId)
    if (ProvinceId !== "") {
      const reqstatedata = await fetch(
        "http://192.168.0.12:8000/apiprofile/getdistrict/" + ProvinceId
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

  // check regex in inputs
  const regexMobile = /^0?(20)[2579]\d{7}$/
  const regexUsername = /^[A-Za-z]{3,16}$/
  const regexPass = /^.{6,}/

  // create profile
  const [image, setImage] = useState("")
  const [file, setFile] = useState("")
  const [isimage, setIsimage] = useState(true)

  const setimgfile = (e) => {
    setImage(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
    setIsimage(false)
  }

  const addUserData = async (e) => {
    e.preventDefault()
    if (!UserName) {
      swal("ກະລຸນາປ້ອນຊື່ຜູ້ນຳໃຊ້!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (!UserName.match(regexUsername)) {
      swal("ຊື່ຕ້ອງມີ ຕົວໃຫຍ່, ຕົວໜ້ອຍ ແລະ ຢ່າງນ້ອຍ 3 - 16 ຕົວອັກສອນ", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (!Email) {
      swal("ກະລຸນາປ້ອນອີເມວ!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (!Mobile) {
      swal("ກະລຸນາປ້ອນເບີໂທລະສັບ!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (!Mobile.match(regexMobile)) {
      swal("ເບີໂທລະສັບຕ້ອງແມ່ນ 020 ຫ້າມຍະຫວ່າງ ແລະ ບໍ່ເກີນ 8 ຫລັກ!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
        position: "start",
      })
      return false
    } else if (!Password) {
      swal("ກະລຸນາປ້ອນລະຫັດ!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (!Password.match(regexPass)) {
      swal("ລະຫັດຜ່ານຢ່າງໜ້ອຍ 6 ຫຼັກຂື້ນໄປ", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if (!cPassword) {
      swal("ຢືນຢັນລະຫັດຜ່ານໃຫ້ຄືກັນ!", {
        buttons: "ຂ້ອຍເຂົ້າໃຈແລ້ວ",
      })
    } else if (Password !== cPassword) {
      swal("ຢືນຢັນລະຫັດຜ່ານບໍ່ຕົງກັນ!", {})
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
      swal("ປ້ອນຊື່ບ້ານຂອງທ່ານ!", {
        buttons: "ເຂົ້າໃຈແລ້ວ",
      })
    } else {
      var formData = new FormData()
      formData.append("image", image)
      formData.append("FirstName", FirstName)
      formData.append("LastName", LastName)
      formData.append("Gender", Gender)
      formData.append("Dob", Dob)
      formData.append("VillageName", VillageName)
      formData.append("DistrictId", DistrictId)
      formData.append("ProvinceId", ProvinceId)
      formData.append("UserName", UserName)
      formData.append("Email", Email)
      formData.append("Mobile", Mobile)
      formData.append("Password", Password)

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

      const res = await axios
        .post("http://192.168.0.12:8000/apiuser/create", formData, config)
        .then((res) => {
          if (res.data.status === "ok") {
            swal({
              title: "ສຳເລັດແລ້ວ",
              text: "ບັນຊີນີ້ພ້ອມໃຊ້ງານໄດ້",
              icon: "success",
              button: "OK",
            })
          } else if (res.data.status === "warning") {
            swal({
              title: "ເຕືອນໄພ!",
              text: "ເພື່ອຄວາມສະດວກ ຊື່ນຳໃຊ້, ອີເມວ ແລະ ເບີໂທ ຕ້ອງບໍ່ຊ້ຳກັນ",
              icon: "warning",
              button: "OK",
            })
          } else if (res.data.status === "error") {
            swal({
              title: "Error!",
              text: "ເກີດຂໍ້ຜິດພາດທາງ Server",
              icon: "error",
              button: "OK",
            })
          }
        })
    }
  }

  return (
    <div className="">
      <div className="rounded-md p-1 bg-white mt-6">
        <form onSubmit={addUserData} className="flex flex-col gap-4 pt-6">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 ">
            <div className="my-2 mx-6 items-center">
              <span className="font-medium text-gray-500 -mb-2">
                ຊື່ຜູ້ນຳໃຊ້:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <TextSnippetIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  name="UserName"
                  className="bg-slate-50 placeholder:text-slate-400 block border-b w-full pl-10 py-2 outline-none"
                  placeholder="........."
                  type="text"
                />
              </label>
            </div>
            <div className="my-2 mx-6 items-center">
              <span className="font-medium text-gray-500 -mb-2">
                ອີເມວທີ່ຢູ່:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <EmailIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  name="Email"
                  className="bg-slate-50 placeholder:text-slate-400 block border-b w-full pl-10 py-2 outline-none"
                  placeholder="........."
                  type="email"
                />
              </label>
            </div>
          </div>
          <div className="my-1 mx-6">
            <span className="font-medium text-gray-500 -mb-2">
              ເບີໂທຕິດຕໍ່:
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <AddIcCallIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setMobile(e.target.value)}
                name="Mobile"
                className="bg-slate-50 placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none"
                placeholder="........."
                type="text"
              />
            </label>
          </div>
          <div className="my-1 mx-6">
            <span className="font-medium text-gray-500 -mb-2">ລະຫັດຜ່ານ:</span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <LockIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="Password"
                className="bg-slate-50 placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none"
                placeholder="........."
                type="password"
              />
            </label>
          </div>
          <div className="my-1 mx-6 mb-8">
            <span className="font-medium text-gray-500 -mb-2">
              ຢືນຢັນລະຫັດຜ່ານ:
            </span>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <LockIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setCpassword(e.target.value)}
                className="bg-slate-50 placeholder:text-slate-400 block border-b w-full pl-12 py-2 outline-none"
                placeholder="........."
                type="password"
              />
            </label>
          </div>

          <h1 className="mx-2 mt-6 px-2 py-2 border-l-2 border-l-sky-500 bg-sky-200 font-medium text-gray-500">
            ຟິວດ້ານລຸ່ມນີ້ແມ່ນຂໍ້ມູນໂປຣໄຟຣຂອງ user
          </h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2 px-6">
            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">
                ຊື່ພະນັກງານ:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <TextSnippetIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  name="FirstName"
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-12 py-2 outline-none"
                  placeholder="........."
                  type="text"
                />
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">ນາມສະກຸນ:</span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <TextSnippetIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  name="LastName"
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-12 py-2 outline-none"
                  placeholder="........."
                  type="text"
                />
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">ເພດ:</span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <SpellcheckIcon className="text-gray-400" />
                </span>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  name="Gender"
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-12 py-2 outline-none">
                  <option value="">--ເລຶອກ--</option>
                  <option value="ຍິງ">ເພດຍິງ</option>
                  <option value="ຊາຍ">ເພດຊາຍ</option>
                </select>
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">
                ວັນທີ, ເດືອນ, ປີເກີດ:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <CalendarMonthIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setDob(e.target.value)}
                  name="Dob"
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-12 py-2 outline-none"
                  type="date"
                />
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">
                ຂໍ້ມູນແຂວງ:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <CheckCircleIcon className="text-sky-400" />
                </span>
                <select
                  onChange={(e) => handlecountry(e)}
                  name="ProvinceId"
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-12 py-2 outline-none">
                  <option value="">--ເລືອກ--</option>

                  {countrydata.map((getcountry, index) => (
                    <option key={index} value={getcountry.ProvinceId}>
                      ແຂວງ {getcountry.ProvinceName}{" "}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">
                ຂໍ້ມູນເມືອງ:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <CheckCircleIcon className="text-sky-400" />
                </span>
                <select
                  onChange={(e) => handleDistrict(e)}
                  name="DistrictId"
                  disabled={enable}
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-12 py-2 outline-none">
                  <option value="">--ເລືອກ--</option>

                  {statedata.map((getdistrict, index) => (
                    <option key={index} value={getdistrict.DistrictId}>
                      ເມືອງ {getdistrict.DistrictName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="w-full h-auto">
              <span className="font-medium  w-full text-gray-500 -mb-2 text-center">
                ປ້ອນຊື່ບ້ານປະຈຸບັນ:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <TextSnippetIcon className="text-sky-300" />
                </span>
                <input
                  onChange={(e) => setVillageName(e.target.value)}
                  name="VillageName"
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-12 py-2 outline-none"
                  placeholder="........."
                  type="text"
                />
              </label>
            </div>
            {/* 
            <div className="w-full h-auto">
              <span className="font-medium  w-full text-gray-500 -mb-2 text-center">
                ຮູບພາບ:
              </span>
              <label className="relative block">
                <input
                  onChange={setimgfile}
                  name="image"
                  accept="image/jpg, image/png, image/jpeg, image/gif"
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-2 py-2 outline-none"
                  placeholder="........."
                  type="file"
                />
              </label>
            </div> */}
          </div>

          <Divider />

          <div className="py-2 mx-6 mt-2 h-auto flex flex-col justify-center gap-2 items-center rounded-md">
            {!isimage && (
              <Avatar
                alt="Pic"
                src={file}
                className="w-full h-full object-cover shadow-md hover:scale-150 hover:ease-in hover:duration-300"
                sx={{ width: 120, height: 120 }}
              />
            )}
            <div>
              <label
                htmlFor="fileName"
                className="py-1 px-8 rounded-sm shadow-md group flex flex-col justify-center items-center hover:bg-gray-500 bg-gray-400 text-white cursor-pointer">
                <CloudUploadIcon
                  sx={{ fontSize: 20 }}
                  className="group-hover:text-gray-200"
                />
                <span className="text-[.85rem]">ເລືອກຮູບພາບ</span>
              </label>
              <input
                type="file"
                id="fileName"
                hidden
                accept="image/jpg, image/png, image/jpeg"
                onChange={setimgfile}
                multiple
                name="image"
              />
            </div>
          </div>

          <div className="py-2 px-8 mt-10 text-right w-full flex justify-center items-center gap-2">
            <Button
              size="large"
              variant="contained"
              type="submit"
              className="active:scale-90 w-full">
              <AddIcon />
              <span>ສ້າງບັນຊີ</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
