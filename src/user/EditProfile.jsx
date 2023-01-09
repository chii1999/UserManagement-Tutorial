import React, { useState, useEffect } from "react"
import "../App.css"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import ManageHistoryIcon from "@mui/icons-material/ManageHistory"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import UpdateIcon from '@mui/icons-material/Update'
import Button from "@mui/material/Button"
import { useParams , useNavigate} from "react-router-dom"
import swal from "sweetalert"
import { motion } from "framer-motion"

export default function EditProfile() {
  //  Start Get Data to Input for update
  const { ProfileId } = useParams()
  const navigate = useNavigate()

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
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [ProfileId])

  // update profile data
  const updateProfile = (e) => {
    e.preventDefault()
      const empdata = { ProfileId, FirstName, LastName, Gender, Dob }

    fetch("http://192.168.0.12:8000/apiprofile/editname", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => res.json())
      .then(result => {
        if(result.status === "ok"){
          swal({
            title: "ແກ້ໄຂສຳເລັດແລ້ວ",
            text: "ລ໋ອກອິນເຂົ້າມາໃໝ່ຈຶ່ງເຫັນຂໍ້ມູນທີແກ້ໄຂນີ້",
            icon: "success",
            button: "OK",
            timer: 8000
          })
          // navigate("UserList")
        }else if(result.status === "error"){
          swal({
            title: "ຂໍອາໄພ!",
            text:"ເລືອກ ແຂວງ ກັບ ເມືອງ ກ່ອນຈຶ່ງສາມາດແກ້ໄຂໄດ້",
            icon: "info",
            button: "OK",
            timer: 8000
          })
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Gender, setGender] = useState("")
  const [Dob, setDob] = useState("")

  const handleBack = () => {
    navigate("/bannerprofile")
  }

  // const [VillageName, setVillageName] = useState("")
  // const [countrydata, setCountrydata] = useState([])
  // const [ProvinceId, setProvinceId] = useState("")
  // const [DistrictId, setDistrictid] = useState("")
  // const [statedata, setStetedata] = useState([])
  // const [enable, setEnable] = useState(true)

  // useEffect(() => {
  //   getcountry()
  // }, [])

  // const getcountry = async () => {
  //   const reqdata = await fetch("/apiprovince")
  //   const resdata = await reqdata.json()
  //   setCountrydata(resdata)
  // }

  // const handlecountry = async (e) => {
  //   const ProvinceId = e.target.value
  //   setProvinceId(ProvinceId)
  //   if (ProvinceId !== "") {
  //     const reqstatedata = await fetch(
  //       "/apiprofile/getdistrict/" + ProvinceId
  //     )
  //     const resstatedata = await reqstatedata.json()
  //     setStetedata(resstatedata)
  //     setEnable(false)
  //   } else {
  //     setStetedata([])
  //     setEnable(true)
  //   }
  // }

  // const handleDistrict = (e) => {
  //   const getstateid = e.target.value
  //   setDistrictid(getstateid)
  // }

  return (
    <motion.div 
      animate={{ y: 0}}
      initial={{ y: -100}}
    className="lg:pt-0 md:pt-14 sm:pt-14 pt-14">
      <div className="border rounded-md p-4 h-screen bg-white">
        <header className="w-full text-center py-2 px-4 rounded-sm mb-4 border-b">
          <h3 className="text-xl font-medium text-gray-500">
            ຟອມແກ້ໄຂຂໍ້ມູນໂປຣໄຟຣຜູ້ນຳໃຊ້
          </h3>
        </header>
        
        <form
        onSubmit={updateProfile}
        >
          <div className="flex gap-2 flex-col justify-center items-center">
            <div className="my-2 mx-6">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <TextFieldsIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={FirstName}
                  id="fname"
                  className="placeholder:italic placeholder:text-slate-400 block bg-white md:w-[30rem] sm:w-[20rem] w-[18rem] border border-slate-300 rounded-md py-4 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
                  type="text"
                  required
                />
              </label>
            </div>

            <div className="my-2 mx-6">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <TextFieldsIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  id="lname"
                  className="placeholder:italic placeholder:text-slate-400 block bg-white md:w-[30rem] sm:w-[20rem] w-[18rem] border border-slate-300 rounded-md py-4 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
                  type="text"
                  required
                  value={LastName}
                />
              </label>
            </div>

            <div className="my-2 mx-6">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <SpellcheckIcon className="text-gray-400" />
                </span>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  className="placeholder:italic placeholder:text-slate-400 block bg-white md:w-[30rem] sm:w-[20rem] w-[18rem] border border-slate-300 rounded-md py-4 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md">
                  <option value="">{Gender}</option>
                  <option value="ຍິງ">ເພດຍິງ</option>
                  <option value="ຊາຍ">ເພດຊາຍ</option>
                </select>
              </label>
            </div>

            <div className="my-2 mx-6">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <ManageHistoryIcon className="text-gray-400" />
                </span>
                <input
                  onChange={(e) => setDob(e.target.value)}
                  className="placeholder:italic placeholder:text-slate-400 block bg-white md:w-[30rem] sm:w-[20rem] w-[18rem] border border-slate-300 rounded-md py-4 text-gray-400 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-md"
                  type="text"
                  required
                  value={Dob}
                />
              </label>
            </div>

          </div>
          <div className="py-2 flex gap-8 justify-center items-center mt-4 px-8 w-full">
            <Button
            onClick={handleBack}
              size="large"
                variant="contained"
              color="error"
              className="active:scale-90 w-[12rem] flex justify-center items-center gap-3">
              <ArrowBackIcon />
              <span>ກັບຄືນ</span>
            </Button>
            <Button
              size="large"
              variant="contained"
              type="submit"
              className="active:scale-90 w-[12rem] flex justify-center items-center gap-3">
              <UpdateIcon />
              <span>ອັບແດບຂໍ້ມູນ</span>
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
