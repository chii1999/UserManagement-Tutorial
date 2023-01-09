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
  const [Dob, setDob] = useState(0)
  const [VillageName, setVillageName] = useState("")
  const [DistrictId, setDistrictId] = useState("")
  const [DistrictName, setDistrictName] = useState("")
  const [ProvinceId, setProvinceId] = useState("")
  const [ProvinceName, setProvinceName] = useState("")

  useEffect(() => {
    fetch("http://192.168.0.12:8000/apiprofile/" + ProfileId)
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
        ProfileId: ProfileId
      })

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      fetch("http://192.168.0.12:8000/apiprofile/update", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "ok") {
            swal({
              title: "ສຳເລັດແລ້ວ",
              text: "ການປ່ຽນແປງຂໍ້ມູນນີ້ດຳເນີນໄປດ້ວຍດີ",
              icon: "success",
              button: "OK",
            })
            navigate("/UserList")
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
    navigate("/UserList")
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
                ແກ້ໄຂຊື່:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <TextSnippetIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={FirstName}
                  className=" border placeholder:text-slate-400 block text-sky-500 rounded-sm w-full pl-12 py-2 outline-none"
                  placeholder="........."
                  type="text"
                />
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">ແກ້ໄຂນາມສະກຸນ:</span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <TextSnippetIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={LastName}
                  className=" border placeholder:text-slate-400 block text-sky-500 rounded-sm w-full pl-12 py-2 outline-none"
                  placeholder="........."
                  type="text"
                />
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">ແກ້ໄຂເພດ:</span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <SpellcheckIcon className="text-gray-400" />
                </span>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  id="gender"
                  className=" border placeholder:text-slate-400 block text-sky-500 rounded-sm w-full pl-12 py-2 outline-none">
                  <option value={Gender}>ເພດ {Gender}</option>
                  <option value="ຍິງ">ເພດ ຍິງ</option>
                  <option value="ຊາຍ">ເພດ ຊາຍ</option>
                </select>
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">
                ແກ້ໄຂວັນທີ, ເດືອນ, ປີເກີດ:( {Dob} )
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <CalendarMonthIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setDob(e.target.value)}
                  value={Dob}
                  className=" border placeholder:text-slate-400 block text-sky-500 rounded-sm w-full pl-12 py-2 outline-none"
                  type="date"
                />
              </label>
            </div>

            <div className="w-full h-auto my-2">
              <span className="font-medium text-gray-500 -mb-2">
                ແກ້ໄຂແຂວງ:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <CheckCircleIcon className="text-sky-400" />
                </span>
                <select
                  onChange={(e) => handlecountry(e)}
                  id="provinceid"
                  className=" border placeholder:text-slate-400 block text-sky-500 rounded-sm w-full pl-12 py-2 outline-none">
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
                ແກ້ໄຂເມືອງ:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <CheckCircleIcon className="text-sky-400" />
                </span>
                <select
                  onChange={(e) => handleDistrict(e)}
                  id="provinceid"
                  disabled={enable}
                  className=" border placeholder:text-slate-400 block text-sky-500 rounded-sm w-full pl-12 py-2 outline-none">
                  <option value={DistrictId}>{DistrictName}</option>

                  {statedata.map((getdistrict, index) => (
                    <option key={index} value={getdistrict.DistrictId}>
                      ເມືອງ {getdistrict.DistrictName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="w-full h-auto col-span-3">
              <span className="font-medium  w-full text-gray-500 -mb-2 text-center">
                ແກ້ໄຂບ້ານ:
              </span>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <TextSnippetIcon className="text-sky-300" />
                </span>
                <input
                  onChange={(e) => setVillageName(e.target.value)}
                  value={VillageName}
                  className=" border placeholder:text-slate-400 block text-sky-500 rounded-sm w-full pl-12 py-2 outline-none"
                  placeholder="........."
                  type="text"
                />
              </label>
            </div>

            {/* <div className="w-full h-auto">
              <span className="font-medium  w-full text-gray-500 -mb-2 text-center">
                ຮູບພາບ:
              </span>
              <label className="relative block">
                <input
                  className=" border placeholder:text-slate-400 block rounded-sm w-full pl-2 py-2 outline-none"
                  placeholder="........."
                  type="file"
                />
              </label>
            </div> */}
          </div>

          {/* <div className="py-2 mx-6 h-auto flex justify-center gap-16 items-center rounded-md">
            <div>
              <label
                htmlFor="fileName"
                className="py-2 px-12 rounded-md shadow-md group flex flex-col justify-center items-center hover:bg-sky-500 bg-sky-400 text-white cursor-pointer">
                <CloudUploadIcon
                  sx={{ fontSize: 30 }}
                  className="group-hover:text-gray-300"
                />
                <span>ເລືອກຮູບພາບ</span>
              </label>
              <input
                type="file"
                id="fileName"
                accept="image/jpg, image/png, image/jpeg"
                onChange={(e) => setImages(e.target.files)}
              />
            </div>
          </div> */}

          <div className="py-2 px-8 text-right w-full flex justify-end items-center gap-6">
            <Link onClick={handleBack} underline="none" className="py-2 px-6 border cursor-pointer bg-gray-200 rounded-sm">
              Back
            </Link>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="success"
              className="active:scale-90">
              <UpdateIcon />
              <span className="ml-3">Update</span>
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
