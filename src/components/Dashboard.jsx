import React, { useState, useEffect } from "react"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import ChartData from "./ChartData"
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { motion } from "framer-motion"
import Calendar from 'react-calendar'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import 'react-calendar/dist/Calendar.css'

import "../App.css"
import axios from "axios"

export default function Dashboard() {
  const [profile, setProfile] = useState("")
  const [cuser, setCuser] = useState("")
  const [noprofile, setNoprofile] = useState("")
  const [crole, setCrole] = useState("")

  const [value, onChange] = useState(new Date())

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    // count profile
    try {
      const rescoutProfile = await axios.get("http://192.168.0.12:8000/countprofile")
      setProfile(rescoutProfile.data)
    } catch (error) {
      console.log(error)
    }
    // count user
    try {
      const rescoutUser = await axios.get("http://192.168.0.12:8000/countuser")
      setCuser(rescoutUser.data)
    } catch (error) {
      console.log(error)
    }
    try {
      const rescoutNoprofile = await axios.get("http://192.168.0.12:8000/countnoprofile")
      setNoprofile(rescoutNoprofile.data)
    } catch (error) {
      console.log(error)
    }
    // count user role where status = user
    try {
      const rescoutRole = await axios.get("http://192.168.0.12:8000/countuserhr")
      setCrole(rescoutRole.data)
    } catch (error) {
      console.log(error)
    }

  }

  // get data from user login
  const [user, setUser] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("Token")
    var myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    }

    fetch("http://192.168.0.12:8000/apilogin/gettoken", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setUser(result.userlogin)
        }
        // console.log(result)
      })
      .catch((error) => console.log("error", error))
  }, [])

  // copy Right
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'V0.1.0 '}
        {'Copyright © '}
        <Link className="text-sky-500" href="#">
          Manager Software
        </Link>{' '}
        2022-{new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  return (
    <motion.div
    animate={{ y: 0}} 
    initial={{ y: -100}}
    className="lg:pt-0 md:pt-14 sm:pt-14 pt-14">
      <div className="w-full relative py-2 px-4 flex justify-between items-center rounded-sm bg-white mb-4" >
        <span className="text-gray-400 text-sm">
          Dashboard / Welcome to Project Manager
        </span>
        <i className="py-1 px-4 rounded-sm border text-gray-400 text-sm">{user.RoleName}</i>
        <span className="absolute right-3 top-1 w-3 h-3 bg-sky-400 rounded-full"></span>
        <span className="animate-ping absolute right-3 top-1 w-3 h-3 bg-sky-400 rounded-full"></span>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-2">

        <div className="flex justify-end border items-center group p-4 relative h-36 overflow-hidden shadow-gray-100 shadow-md hover:shadow-gray-200 rounded-md bg-gradient-to-b from-gray-200 bg-gray-300">
          <div className="absolute top-2 left-2 z-10 rounded-full bg-rose-500 group-hover:scale-125 group-hover:ease-in group-hover:duration-300 shadow-md p-2 flex justify-center items-center">
            <PeopleAltIcon className="text-white" />
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="pl-8 text-gray-500 text-2xl font-medium">
              {cuser.count}
            </span>
            <span className="font-bold text-gray-500 text-xl">ບັນຊີ</span>
          </div>
          <div className="w-full group-hover:bg-gray-50 group-hover:ease-in group-hover:duration-300 h-10 bg-white absolute bottom-0 left-0 flex justify-center items-center">
            <span className="font-semibold text-sky-600 text-sm">
              ລວມບັນຊີທັງໝົດໃນລະບົບ
            </span>
          </div>
        </div>

        <div className="flex justify-end border items-center group p-4 relative h-36 overflow-hidden shadow-gray-100 shadow-md hover:shadow-gray-200 rounded-md bg-gradient-to-b from-gray-200 bg-gray-300">
          <div className="absolute top-2 left-2 z-10 rounded-full bg-green-500 group-hover:scale-125 group-hover:ease-in group-hover:duration-300 shadow-md p-2 flex justify-center items-center">
            <AssignmentIndIcon className="text-white" />
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="pl-8 text-gray-500 text-2xl font-medium">
            {profile.count}
            </span>
            <span className="font-bold text-gray-500 text-xl">ທ່ານ</span>
          </div>
          <div className="w-full group-hover:bg-gray-50 group-hover:ease-in group-hover:duration-300 h-10 bg-white absolute bottom-0 left-0 flex justify-center items-center">
            <span className="font-semibold text-sky-600 text-sm">
              ຜູ້ນຳໃຊ້ ເພດຍິງ
            </span>
          </div>
        </div>

        <div className="flex justify-end border items-center group p-4 relative h-36 overflow-hidden shadow-gray-100 shadow-md hover:shadow-gray-200 rounded-md bg-gradient-to-b from-gray-200 bg-gray-300">
          <div className="absolute top-2 left-2 z-10 rounded-full bg-sky-500 group-hover:scale-125 group-hover:ease-in group-hover:duration-300 shadow-md p-2 flex justify-center items-center">
            <AutoStoriesIcon className="text-white" />
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="pl-8 text-gray-500 text-2xl font-medium">
            {noprofile.count}
            </span>
            <span className="font-bold text-gray-500 text-xl">ທ່ານ</span>
          </div>
          <div className="w-full group-hover:bg-gray-50 group-hover:ease-in group-hover:duration-300 h-10 bg-white absolute bottom-0 left-0 flex justify-center items-center">
            <span className="font-semibold text-sky-600 text-sm">
              ຜູ້ນຳໃຊ້ ເພດຊາຍ
            </span>
          </div>
        </div>

        <div className="flex justify-end border items-center group p-4 relative h-36 overflow-hidden shadow-gray-100 shadow-md hover:shadow-gray-200 rounded-md bg-gradient-to-b from-gray-200 bg-gray-300">
          <div className="absolute top-2 left-2 z-10 rounded-full bg-gray-500 group-hover:scale-125 group-hover:ease-in group-hover:duration-300 shadow-md p-2 flex justify-center items-center">
            <AdminPanelSettingsIcon className="text-white" />
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="pl-8 text-gray-500 text-2xl font-medium">
              {crole.count}
            </span>
            <span className="font-bold text-gray-500 text-xl">ທ່ານ</span>
          </div>
          <div className="w-full group-hover:bg-gray-50 group-hover:ease-in group-hover:duration-300 h-10 bg-white absolute bottom-0 left-0 flex justify-center items-center">
            <span className="font-semibold text-sky-600 text-sm">
              ຜູ້ທີໄດ້ຮັບບົດບາດເປັນ user
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8">
        <div className="h-[23rem] relative overflow-hidden w-full shadow-sm">
          <Calendar onChange={onChange} value={value} className="w-full leading-loose text-sm p-4 sm:w-full text-center h-full border-noner rounded-md" />
          {/* <div className="absolute top-0 left-0 capitalize p-2 w-full bg-sky-400 text-center text-white">
            Status: {user.RoleName}
          </div>
          <div 
            className="absolute top-14 left-0 w-full flex justify-center items-center">
          <Avatar
            alt={user.UserName}
            src="/m"
            sx={{ width: 120, height: 120 }}
          />
          </div>
          <div className="absolute bottom-0 left-0 w-full flex flex-col">
            <div className="flex justify-start items-center pl-3 py-2 border-y">
              <div className="p-2 w-10 flex justify-center items-center">
                <PersonIcon className="text-gray-400 text-sm" fontSize="28px" />
              </div>
              <div>
                <span className="pl-2 text-sm font-normal capitalize">
                  {user.UserName}
                </span>
              </div>
            </div>
            <div className="flex justify-start items-center pl-3 py-2 border-b">
              <div className="p-2 w-10 flex justify-center items-center">
                <EmailIcon className="text-gray-400 text-sm" fontSize="28px" />
              </div>
              <div>
                <span className="pl-2 text-sm font-normal normal-case">
                  {user.Email}
                </span>
              </div>
            </div>
            <div className="flex justify-start items-center pl-3 py-2">
              <div className="p-2 w-10 flex justify-center items-center">
                <CallIcon className="text-gray-400 text-sm" fontSize="28px" />
              </div>
              <div>
                <span className="pl-2 text-sm font-normal">{user.Mobile}</span>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-span-2 h-auto rounded-md shadow-sm border  p-3">
          <ChartData />
        </div>
      </div>
      
      <div className="w-full flex justify-end items-center mt-6">
        <Copyright />
      </div>
    </motion.div>
  )
}
