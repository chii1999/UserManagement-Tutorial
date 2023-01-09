import React, { useState, useEffect } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function SettringRole() {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  // ພາກສ່ວນການ  fetch ຂໍ້ມູນຈາກ  API ໃນຮູບແບບຂອງ JSON
  // ເພື່ອຈະສົ່ງກັບມາສະແດງຢູ່ Web Browser ( ເຊິ່ງຄ່າທີໄດ້ມາແມ່ນເກັບໄວ້ໃນ function ຂອງ items)
  useEffect(() => {
    UserGet()
  }, [])

  const UserGet = () => {
    fetch("http://192.168.0.12:8000/apiuser")
      .then((res) => res.json())
      .then((result) => {
        setItems(result)
      })
  }

  const UserRole = (UserId) => {
    navigate(`/SettingUser/${UserId}`)
  }
  const UserPermission = (RoleId) => {
    navigate(`/SettingsPer/${RoleId}`)
  }

  const [enable, setEnable] = useState(true)
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
        setUser(result.userlogin)
        if (user.RoleName === "admin") {
          // console.log(user.RoleName)
          setEnable(false)
        } else if (user.RoleName === "manager") {
          setEnable(false)
        } else if (user.RoleName === "user") setEnable(true)
      })
      .catch((error) => console.log("error", error))
  }, [user])

  const [query, setQuery] = useState("")

  let number = 1

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: -100 }}
      className="lg:pt-0 md:pt-14 sm:pt-14 pt-14 ">
      <TableContainer className="py-4 px-2">
        <div className="flex justify-between items-center p-2">
          <span className="text-gray-500 font-medium">
            ການກຳນົດບົດບາດ ແລະ ໃຫ້ສິດທີກັບ user
          </span>
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="ຊອກຫາຊື່ທີຕ້ອງການ..."
            className=" placeholder:text-gray-400 placeholder:font-normal placeholder:text-sm outline-none text-sky-500 font-medium text-lg py-2 px-4 bg-white rounded-sm border md:w-52 w-20"
          />
        </div>
        <Table
          className="border rounded-md overflow-hidden"
          sx={{ minWidth: 650, backgroundColor: "#fff" }}
          stickyHeader
          aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span className="font-medium md:text-lg sm:text-md text-gray-500">
                  ລຳດັບ
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="font-medium md:text-lg sm:text-md text-gray-500">
                  ຊື່ຜູ້ນຳໃຊ້
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="font-medium md:text-lg sm:text-md text-gray-500">
                  ອີເມວທີຢູ່
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="font-medium md:text-lg sm:text-md text-gray-500">
                  ເບີໂທຕິດຕໍ່
                </span>
              </TableCell>
              <TableCell align="center" className="py-0">
                {!enable && (
                  <span className="font-medium md:text-lg sm:text-md text-gray-500">
                    ປຸ່ມກຳນົດການໃຊ້ງານ
                  </span>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .filter(
                (users) =>
                  users.UserName.toLowerCase().includes(query) ||
                  users.Email.toLowerCase().includes(query) ||
                  users.Mobile.toLowerCase().includes(query)
              )
              .map((row) => (
                <TableRow
                  key={row.UserId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" align="center" scope="row">
                    {number++}
                  </TableCell>
                  <TableCell align="left">
                    <span>{row.UserName}</span>
                  </TableCell>
                  <TableCell align="left">
                    <span>{row.Email}</span>{" "}
                  </TableCell>
                  <TableCell align="left">
                    <span className="text-green-500">+856 {row.Mobile}</span>
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex gap-3 justify-end items-center">
                      {!enable && (
                        <button
                          onClick={() => UserRole(row.UserId)}
                          className="bg-gray-500 hover:scale-110  hover:ease-in hover:duration-300 text-white py-2 px-6 w-auto rounded-sm text-sm"
                          color="secondary">
                          ບົດບາດ
                        </button>
                      )}
                      {!enable && (
                        <button
                          onClick={() => UserPermission(row.UserId)}
                          className="bg-indigo-500 hover:scale-110  hover:ease-in hover:duration-300 text-white py-2 px-6 w-auto rounded-sm text-sm"
                          color="secondary">
                          ສິດທີ
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  )
}
