import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import UpdateIcon from "@mui/icons-material/Update"
import swal from "sweetalert"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const UpdateDistrict = () => {
  const { DistrictId } = useParams()
  const navigate = useNavigate()
  const [ProvinceId, setProvinceId] = useState("")
  const [ProvinceName, setProvinceName] = useState("")
  const [DistrictName, setDistrictName] = useState("")

  // get data
  useEffect(() => {
    fetch("http://192.168.0.12:8000/apidistrict/" + DistrictId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setProvinceId(res.ProvinceId)
        setProvinceName(res.ProvinceName)
        setDistrictName(res.DistrictName)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [DistrictId])

  // Update data
  const updateDistrict = (e) => {
    e.preventDefault()
    const empdata = { DistrictId, ProvinceId, DistrictName }

    fetch("http://192.168.0.12:8000/apidistrict/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        swal({
          title: "ແກ້ໄຂເມືອງສຳເລັດແລ້ວ",
          icon: "success",
          button: "OK",
        })
        navigate("/District")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const [proname, setProName] = useState([])
  useEffect(() => {
    UserGet()
  }, [])

  const UserGet = () => {
    fetch("http://192.168.0.12:8000/apiprovince")
      .then((res) => res.json())
      .then((result) => {
        setProName(result)
      })
  }

 

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: -100 }}
      className="md:pt-0 pt-14 h-screen">
      <div className="flex gap-4 justify-center items-center w-full my-4">
        <h1 className="text-xl font-medium text-gray-500 py-2 border-b-2 border-b-sky-400">
          ຟອມແກ້ໄຂຂໍ້ມູນ ເມືອງ
        </h1>
      </div>
      <div className="w-full py-2 px-4 rounded-sm bg-slate-50 mb-4 mt-6">
        <form
          onSubmit={updateDistrict}
          className="flex flex-col justify-between items-center gap-4">
          <select
            onChange={(e) => setProvinceId(e.target.value)}
            className="md:w-[25rem] sm:w-full w-full py-2 placeholder:text-gray-400 placeholder:font-normal focus:outline-1 focus:outline-sky-300 px-4 border rounded-sm text-gray-500 font-semibold">
            <option value={ProvinceId}>{ProvinceName}</option>
            {proname.length > 0 &&
              proname.map((row) => {
                return (
                  <option id="ProvinceId" value={row.ProvinceId}>
                    ແຂວງ {row.ProvinceName}
                  </option>
                )
              })}
          </select>
          <input
            onChange={(e) => setDistrictName(e.target.value)}
            value={DistrictName}
            type="text"
            name="DistrictName"
            id="DistrictName"
            className="md:w-[25rem] sm:w-full w-full py-2 placeholder:text-gray-300 focus:outline-1 focus:outline-sky-300 px-4 border rounded-sm text-sky-500 font-semibold"
          />
          <Button
            size="large"
            variant="contained"
            color="success"
            type="submit"
            className="active:scale-90 md:mt-0 mt-8 md:w-[25rem] sm:w-auto">
            <span className="mr-2">ແກ້ໄຂ</span>
            <UpdateIcon />
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

export default UpdateDistrict
