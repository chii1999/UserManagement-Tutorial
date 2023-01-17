import React, { useState, useEffect } from "react"
import "../App.css"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import Button from "@mui/material/Button"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import UpdateIcon from '@mui/icons-material/Update'
import { useParams, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { motion } from "framer-motion"

export default function EditProfile() {
  //  Start Get Data to Input for update
  const { ProfileId } = useParams()
  const [VillageName, setVillageName] = useState("")
  const [ProvinceId, setProvinceId] = useState("")
  const [DistrictId, setDistrictid] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://192.168.0.236:8000/apiprofile/" + ProfileId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setVillageName(res.VillageName)
        setProvinceId(res.ProvinceName)
        setDistrictid(res.DistrictName)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [ProfileId])

  // update profile data
  const updateProfile = (e) => {
    e.preventDefault()
      const empdata = { ProfileId,  VillageName, DistrictId, ProvinceId  }

    fetch("http://192.168.0.236:8000/apiprofile/editpd", {
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
          })
          // navigate("UserList")
        }else if(result.status === "error"){
          swal({
            title: "ຂໍອາໄພ!",
            text:"ເກີດຂໍ້ຜິດພາດທາງ server",
            icon: "info",
            button: "OK",
          })
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  
  const [statedata, setStetedata] = useState([])
  const [countrydata, setCountrydata] = useState([])
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

  const handleBack = () => {
    navigate("/bannerprofile")
  }

  return (
    <motion.div 
      animate={{ y: 0}}
      initial={{ y: -100}}
    className="lg:pt-0 md:pt-14 sm:pt-14 pt-14">
      <div className="border rounded-md p-4 bg-white h-screen">
        <header className="w-full text-center py-2 px-4 rounded-sm mb-4 border-b ">
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
                <CheckCircleIcon className="text-sky-400" />
              </span>
              <select
                onChange={(e) => handlecountry(e)}
                id="provinceid"
                className="placeholder:italic text-gray-500 block border md:w-[30rem] sm:w-[20rem] w-[18rem] pl-12 py-3 outline-none">
                <option value="">{ProvinceId}</option>

                {countrydata.map((getcountry, index) => (
                  <option key={index} value={getcountry.ProvinceId}>
                    ແຂວງ {getcountry.ProvinceName}{" "}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="my-2 mx-6">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <CheckCircleIcon className="text-sky-400" />
              </span>
              <select
                onChange={(e) => handleDistrict(e)}
                id="provinceid"
                disabled={enable}
                className="placeholder:italic text-gray-500 block border md:w-[30rem] sm:w-[20rem] w-[18rem] pl-12 py-3 outline-none">
                <option value="">{DistrictId}</option>

                {statedata.map((getdistrict, index) => (
                  <option key={index} value={getdistrict.DistrictId}>
                    ເມືອງ {getdistrict.DistrictName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="my-2 mx-6">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <TextFieldsIcon className="text-gray-400" />
              </span>
              <input
                onChange={(e) => setVillageName(e.target.value)}
                className="placeholder:italic text-gray-500 block border md:w-[30rem] sm:w-[20rem] w-[18rem] pl-12 py-3 outline-none"
                value={VillageName}
                type="text"
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
