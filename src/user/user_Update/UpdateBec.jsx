import React, { useState, useEffect } from "react"
import "../../App.css"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import UpdateIcon from "@mui/icons-material/Update"
import TextSnippetIcon from "@mui/icons-material/TextSnippet"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import swal from "sweetalert"
import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"

export default function AddProfile() {
  // get data user from login
  const { ProfileId } = useParams()
  const navigate = useNavigate()

  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Gender, setGender] = useState("")
  const [Dob, setDob] = useState("")
  const [VillageName, setVillageName] = useState("")
  const [DistrictId, setDistrictId] = useState("")
  const [DistrictName, setDistrictName] = useState("")
  const [ProvinceId, setProvinceId] = useState("")
  const [ProvinceName, setProvinceName] = useState("")

  useEffect(() => {
    fetch("http://192.168.0.236:8000/apiprofile/" + ProfileId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setFirstName(res.FirstName)
        setLastName(res.LastName)
        setGender(res.Gender)
        setDob(res.Dob)
        setVillageName(res.VillageName)
        setDistrictId(res.DistrictId)
        setDistrictName(res.DistrictName)
        setProvinceId(res.ProvinceId)
        setProvinceName(res.ProvinceName)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [ProfileId])

  // ພາກສ່ວນດຶງຂໍ້ມູນຈາກການເລືອກແຂວງ ໃຫ້ສະແດງເມືອງສະເພາະແຂວງນັ້ນ.
  const [countrydata, setCountrydata] = useState([])
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
    setDistrictId(getstateid)
  }

  // create profile
  const handleAddData = (e) => {
    e.preventDefault()
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    // Add Profile Info
    var raw = JSON.stringify({
      ProvinceId: ProvinceId,
      DistrictId: DistrictId,
      FirstName: FirstName,
      LastName: LastName,
      Gender: Gender,
      Dob: Dob,
      VillageName: VillageName,
      ProfileId: ProfileId,
    })

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }

    fetch("http://192.168.0.236:8000/apiprofile/update", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          swal({
            title: "ສຳເລັດແລ້ວ",
            text: "ການປ່ຽນແປງຂໍ້ມູນນີ້ດຳເນີນໄປດ້ວຍດີ",
            icon: "success",
            button: "OK",
          })
          navigate("/BannerProfile")
        } else if (result.status === "error") {
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

  const handleBack = () => {
    navigate("/BannerProfile")
  }

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      className="lg:pt-0 md:pt-14 sm:pt-14 pt-14 h-screen">
      <div className="border rounded-md p-4 bg-white">
        <form onSubmit={handleAddData} className="flex flex-col gap-4 pt-6">
          <h1 className="mx-6 px-2 pb-4 border-b text-lg rounded-sm font-medium text-gray-500">
            ແກ້ໄຂຂໍ້ມູນນຳໃຊ້ລະບົບ Manager
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
                  value={FirstName}
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-10 py-2 outline-none"
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
                  value={LastName}
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-10 py-2 outline-none"
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
                {Gender === "ຍິງ" ? (
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    className=" border placeholder:text-slate-400 block rounded-sm w-full pl-12 py-2 outline-none">
                    <option selected value="ຍິງ">
                      ເພດ ຍິງ
                    </option>
                    <option value="ຊາຍ">ເພດ ຊາຍ</option>
                  </select>
                ) : (
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    className=" border placeholder:text-slate-400 block text-sky-500 rounded-sm w-full pl-12 py-2 outline-none">
                    <option value="ຍິງ">
                      ເພດ ຍິງ
                    </option>
                    <option selected value="ຊາຍ">ເພດ ຊາຍ</option>
                  </select>
                )}
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">
                ວັນທີ, ເດືອນ, ປີເກີດ: {Dob}
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <CalendarMonthIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setDob(e.target.value)}
                  value={Dob}
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-10 py-2 outline-none"
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
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-10 py-2 outline-none">
                  <option value={ProvinceId}>{ProvinceName}</option>

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
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-10 py-2 outline-none">
                  <option value={DistrictId}>{DistrictName}</option>

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
                  value={VillageName}
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-10 py-2 outline-none"
                  type="text"
                />
              </label>
            </div>
          </div>

          <div className="py-2 px-8 text-right w-full flex justify-end items-center gap-6">
            <Link
              onClick={handleBack}
              underline="none"
              className="py-2 px-6 border font-medium cursor-pointer text-gray-500 bg-gray-200 rounded-sm">
              ກັບຄືນ
            </Link>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="success"
              className="active:scale-90">
              <UpdateIcon />
              <span className="ml-3">ແກ້ໄຂ</span>
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
