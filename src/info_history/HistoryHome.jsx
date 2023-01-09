import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

function HistoryHome() {
  const [items, setItems] = useState([])
  const getUserLogin = async () => {
    const reqdata = await fetch("http://192.168.0.12:8000/apilogin/select")
    const resdata = await reqdata.json()
    setItems(resdata)
    // console.log(resdata)
  }

  useEffect(() => {
    getUserLogin()
  }, [])

  let number = 1

  return (
    <div className="lg:pt-0 md:pt-14 sm:pt-14 pt-14">
      <div className="w-full text-center p-4">
        <h2 className="text-xl font-medium text-gray-500">
          ປະຫວັດການລ໋ອກອີນຂອງ USER
        </h2>
      </div>
      {items.map((rows) => {
        return (
          <motion.div
            animate={{ x: 0 }}
            initial={{ x: -100 }}
            key={rows.LoginId}
            className="group w-ful h-auto py-4 px-6 my-3 md:flex justify-between items-center text-white  rounded-md bg-pink-500 hover:bg-pink-600 shadow-md">
            <div className="flex gap-2">
              <b className="mr-4 w-8 h-8 group-hover:scale-110 rounded-full bg-sky-500 flex justify-center items-center">
                {number++}
              </b>
              <span>{rows.UserName}</span>
            </div>
            <span>{rows.Email}</span>
            <div className="flex gap-2">
              <span>{rows.History}</span>
              <span>{rows.Htime}</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default HistoryHome
