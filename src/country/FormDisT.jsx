import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'

function FormDisT() {

     const handleSubmit = (event) => {
    event.preventDefault()
    if(!Provinceid){
      swal({
        title: "ທ່ານລືມບາງຢ່າງແລ້ວ!",
        text: "ເລືອກແຂວງກ່ອນ!",
        icon: "info",
        button: "ເຂົ້າໃຈແລ້ວ",
      })
    } else if(!DistrictName){
      swal({
        title: "ທ່ານລືມບາງຢ່າງແລ້ວ!",
        text: "ປ້ອນຊື່ເມືອງກ່ອນ!",
        icon: "info",
        button: "ເຂົ້າໃຈແລ້ວ",
      })
    } else {
      var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    var raw = JSON.stringify({
      ProvinceId: Provinceid,
      DistrictName: DistrictName,
    })

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }
    fetch(
      "http://192.168.0.12:8000/apidistrict/create/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        swal({
          title: "ສຳເລັດແລ້ວ",
          icon: "success",
          button: "OK",
        })
      })
      .catch((error) => console.log("error", error))
    }
  }

  // select data from groups box select
  const [proname, setProName] = useState([])
  useEffect(() => {
    UserGet()
  }, [])

  const UserGet = () => {
    fetch("http://192.168.0.236:8000/apiprovince")
      .then((res) => res.json())
      .then((result) => {
        setProName(result)
      })
  }

  const [Provinceid, setProvinceId] = useState("")
  const [DistrictName, setDistrictName] = useState("")
  const [enable, setEnable] = useState(true)
  const handleKey = ()=>{
    setEnable(false)
  }
  return (
    <div className="w-full py-2 px-4 rounded-sm mt-8 mb-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between items-center gap-4">
          <select 
           onChange={(e) => setProvinceId(e.target.value)}
           onKeyDown={handleKey}
           className="w-[23rem] py-2 placeholder:text-gray-400 placeholder:font-normal focus:outline-1 focus:outline-sky-300 px-4 border rounded-md text-gray-500 font-semibold">
            <option value="">--ເລືອກແຂວງ--</option>
            {proname.length > 0 &&
              proname.map((row) => {
                return (
                  <option
                    id="ProvinceId"
                    value={row.ProvinceId}>
                    ແຂວງ {row.ProvinceName}
                  </option>
                )
              })}
          </select>
          <input
            onChange={(e) => setDistrictName(e.target.value)}
            type="text"
            onKeyDown={handleKey}
            placeholder="ປ້ອນຊື່ເມືອງ..."
            id="DistrictName"
            className="w-full py-2 placeholder:text-gray-400 placeholder:font-normal focus:outline-1 focus:outline-sky-300 px-4 border rounded-md text-sky-400 font-semibold"
          />
          <Button
            size="large"
            variant="contained"
            color="info"
            type="submit"
            className="active:scale-90 md:mt-0 mt-8 w-full">
            <span className="mr-2">ເພິ່ມເມືອງ</span>
          </Button>
        </form>
      </div>
  )
}

export default FormDisT
