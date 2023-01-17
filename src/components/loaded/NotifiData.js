import React, { useEffect, useState } from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"
import axios from "axios"
import Avatar from "@mui/material/Avatar"
import { blue } from "@mui/material/colors"
import { useNavigate } from "react-router-dom"

function NotifiData() {
  const [profiledata, setProfiledata] = useState([])
  const history = useNavigate()
  const getProfile = async () => {
    try {
      const response = await axios.get("http://192.168.0.236:8000/apiprofile")
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
    <div classNamw="w-full h-screen">
      <div id="scrollBar" className="overflow-hidden overflow-y-auto">
        {profiledata.map((el, index) => (
          <div
            key={index}
            className=" snap-center flex justify-between items-center w-full border-t hover:bg-gray-100 pr-6 group">
            <div className="flex justify-start items-center gap-2 p-2">
              <Avatar
                sx={{ bgcolor: blue[500] }}
                alt="Remy Sharp"
                src={`http://192.168.0.236:8000/apiprofile/${el.Img}`}>
                {el.UserName}
              </Avatar>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">
                  {" "}
                  {el.FirstName} <i className="uppercase"> {el.LastName} </i>{" "}
                </span>
                <span className="text-gray-400 text-[.75rem]">
                  {" "}
                  {el.Email}{" "}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleDetial(el.ProfileId)}
              className="flex gap-2 justify-center items-center py-1 px-4 rounded-md border group-hover:bg-white">
              <VisibilityIcon
                className="text-green-500"
                sx={{ fontSize: 20 }}
              />
              <span className="text-[.68rem]">Detial</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotifiData
