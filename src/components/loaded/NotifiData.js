import React, { useEffect, useState } from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function NotifiData() {
  const [profiledata, setProfiledata] = useState([])
  const history = useNavigate()
  const getProfile = async () => {
    try {
      const response = await axios.get("http://192.168.0.12:8000/apiprofile")
      setProfiledata(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const handleDetial = (ProfileId) => {
    history(`/detialprofile/${ProfileId}`)
  }

  return (
    <div classNamw="w-full h-[60rem] snap-y">
      <h2 className="text-md text-gray-500 font-medium m-2">ບັນຊີສ້າງຂື້ນໃໝ່ New Accounts</h2>
      {profiledata.map((el, index) => (
        <div
          key={index}
          className=" snap-center flex justify-between items-center w-full border-t hover:bg-gray-100 pr-6 group">
          <div className="flex justify-start items-center gap-2 p-2">
            <img
              src={`http://192.168.0.12:8000/apiprofile/${el.Img}`}
              alt=""
              className="w-12 h-12 rounded-full object-cover bg-gray-300 border"
            />
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">
                {" "}
                {el.FirstName} <i className="uppercase"> {el.LastName} </i>{" "}
              </span>
              <span className="text-gray-400 text-[.75rem]"> {el.Email} </span>
            </div>
          </div>
          <button onClick={() => handleDetial(el.ProfileId)} className="flex gap-2 justify-center items-center py-1 px-4 rounded-md border group-hover:bg-white">
            <VisibilityIcon className="text-green-500" sx={{ fontSize: 20 }} />
            <span className="text-[.68rem]">Detial</span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotifiData
