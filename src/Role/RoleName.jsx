import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
//import Box from "@mui/material/Box"
// import swal from "sweetalert"
// import Button from "@mui/material/Button"
//import RoleList from "./RoleList"

export default function RoleName() {
  // const [RoleName, RoleNamechange] = useState('');

  // const createProvince=(e) => {
  //   e.preventDefault();
  //   const empdata ={RoleName};

  //   fetch("http://192.168.0.236:8000/apiroles/create", {
  //     method: "POST",
  //     headers: {'Content-Type':'application/json'},
  //     body:JSON.stringify(empdata)
  //   }).then((res)=> {
  //       swal({
  //         text: "ບັນທຶກບົດບາດສຳເລັດ",
  //         icon: "success",
  //         button: "OK",
  //       })
  //   }).catch((err) => {
  //     console.log(err.message)
  //   })

  // }

  // const [enable, setEnable] = useState(true)
  // const handleKey = ()=>{
  //   setEnable(false)
  // }

  const [items, setItems] = useState([])

  useEffect(() => {
    UserGet()
  }, [])

  const UserGet = () => {
    fetch("http://192.168.0.236:8000/apiroles")
      .then((res) => res.json())
      .then((result) => {
        setItems(result)
      })
  }

  let number = 1

  return (
    <div className="md:pt-0 pt-12">
      {/* <div className="w-full py-2 px-4 rounded-sm bg-slate-50 mb-4 -mt-2">
        <form
          onSubmit={createProvince}
          className="flex justify-between items-center gap-2 relative">
          <input
            onChange={(e) => RoleNamechange(e.target.value)}
            value={RoleName}
            onKeyDown={handleKey}
            type="text"
            placeholder="ປ້ອນຂໍ້ມູນບົດບາດ...."
            required
            className="w-full py-2 placeholder:text-gray-400 placeholder:font-normal focus:outline-1 focus:outline-sky-300 px-4 border rounded-md text-sky-400 font-semibold"
          />
          <Button
            size="large"
            variant="contained"
            color="info"
            type="submit"
            disabled={enable}
            className="active:scale-90 md:mt-0 mt-8 md:w-[20rem] sm:w-auto">
            <span className="mr-2">ບັນທຶກບົດບາດ</span>
          </Button>
        </form>
      </div> */}
      <div className="w-full h-auto bg-white rounded-md p-4 mb-8">
        {items.map((el, index) => (
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: -100 }}
            key={index}
            className="w-full h-40 border-b rounded-sm relative flex flex-col justify-center items-center gap-2">
            <div className="w-14 h-14 text-xl font-bold absolute top-4 left-4 rounded-full bg-sky-400 text-white flex justify-center items-center shadow-md">
              {" "}
              {number++}{" "}
            </div>
            <span className="text-md text-sky-500 font-medium">
              ສະຖານະ ຫຼື ບົດບາດ
            </span>
            <h2 className="text-xl font-bold text-red-500 capitalize">
              {el.RoleName === "admin" ? (
                <span className="capitalize">
                  (Admin) ຜູ້ບໍລິຫານ
                </span>
              ) : el.RoleName === "manager" ? (
                <span className="capitalize">
                  (Manager) ຜູ້ຈັດການ
                </span>
              ) : (
                <span className="capitalize">
                  (User) ຜູ້ນຳໃຊ້
                </span>
              )}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* <Box className="mt-4">
        <RoleList />
      </Box> */}
    </div>
  )
}
