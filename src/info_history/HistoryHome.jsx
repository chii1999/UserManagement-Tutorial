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
            className="group overflow-hidden relative w-ful h-auto hover:py-10 hover:ease-in hover:duration-500 py-4 px-6 my-3 md:flex justify-between items-center text-pink-500  rounded-md bg-white hover:bg-gray-200 shadow-sm">
            <span className="w-6 h-4 group-hover:h-8 bg-sky-500 group-hover:w-full group-hover:bg-sky-400 group-hover:ease-in group-hover:duration-500 absolute left-0 top-0 flex justify-center group-hover:justify-start items-center group-hover:items-center text-white px-3">
              {number++}
            </span>
            <div className="flex gap-2">
              <span>{rows.UserName}</span>
            </div>
            <span>{rows.Email}</span>
            <div className="flex flex-col justify-center items-end gap-2">
              <h2>ເວລາ ວັນທີ,ເດືອນ,ປີ</h2>
              <div className="flex gap-2">
                <span>{rows.Htime}</span>
                <span>{rows.History}</span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default HistoryHome
