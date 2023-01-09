import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import UpdateIcon from "@mui/icons-material/Update"
import swal from "sweetalert"
import { useParams, useNavigate } from "react-router-dom"

const ProvinceUpdate = () => {
  const { ProvinceId } = useParams()
  const navigate = useNavigate()

  // get data
  useEffect(() => {
    fetch("http://192.168.0.12:8000/apiprovince/" + ProvinceId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setProvinceName(res.ProvinceName)
        setDocument(res.document)
        // console.log(res)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [ProvinceId])

  // Update data
  const updateProvince = (e) => {
    e.preventDefault()
    const empdata = { ProvinceId, ProvinceName, document }

    fetch("http://192.168.0.12:8000/apiprovince/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        swal({
          title: "ແກ້ໄຂສຳເລັດແລ້ວ",
          icon: "success",
          button: "OK",
          timer: 8000
        })
        navigate("/Province")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const [ProvinceName, setProvinceName] = useState("")
  const [document, setDocument] = useState("")

  return (
    <React.Fragment>
      <div className="md:pt-0 pt-14">
        <div className="flex justify-center items-center w-full my-4">
          <h1 className="text-xl font-medium text-gray-500 py-2 border-b-2 border-b-sky-400">
            ຟອມແກ້ໄຂຂໍ້ມູນ ແຂວງ
          </h1>
        </div>
        <div className="w-full py-2 px-4 rounded-sm bg-slate-50 mb-4 -mt-2">
          <form
            onSubmit={updateProvince}
            className="flex flex-col justify-between items-center gap-2">
            <input
              defaultValue={ProvinceId}
              type="hidden"
              className="w-16 py-2 placeholder:text-gray-300 focus:outline-1 focus:outline-sky-300 px-4 border rounded-md text-sky-500 font-semibold"
            />
            <input
              onChange={(e) => setProvinceName(e.target.value)}
              Value={ProvinceName}
              type="text"
              name="ProvinceName"
              id="ProvinceName"
              className="w-full py-2 placeholder:text-gray-300 focus:outline-1 focus:outline-sky-300 px-4 border rounded-md text-sky-500 font-semibold"
            />
            <textarea 
            onChange={(e) => setDocument(e.target.value)}
            Value={document}
             className="w-full border p-4 focus:outline-none" placeholder="ປ້ອນຄຳຂັວນໃຫ້ກັບແຂວງນີ້ຖ້າມີ" cols="30" rows="10"></textarea>
            <Button
              size="large"
              variant="contained"
              color="warning"
              type="submit"
              className="active:scale-90 md:mt-0 mt-8 md:w-[20rem] sm:w-auto">
              <span className="mr-2">Update</span>
              <UpdateIcon />
            </Button> <br/>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProvinceUpdate
