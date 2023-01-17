import { Table } from "@mui/material"
import axios from "axios"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import { Box } from "@mui/system"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"

function DataRoleUser() {
  const [search, setSearch] = useState("")
  const [roledata, setRoledata] = useState([])
  const [nonedata, setNonedata] = useState(false)

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.236:8000/apiroles/select/perm"
      )
      setRoledata(response.data)
      setNonedata(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  let number = 1

  const classThead =
    "text-white p-2 font-medium text-md border border-slate-200 text-center"
  const classTbody =
    "text-gray-500 py-3 px-2 font-normal border border-slate-200 text-sm text-center"

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: -100 }}
      className=" lg:mt-0 md:mt-20 mt-20 md:h-screen bg-white rounded-md h-auto p-1">
      <span className="font-medium text-gray-500 mt-6 px-4">
      📶 ບົດບາດ ແລະ ສິດທີ ຂອງແຕ່ລະບັນຊີຜູ້ນຳໃຊ້
      </span>
      {/* <div className="w-full flex flex-col justify-center items-start p-2 -mb-12 text-sm   font-medium text-sky-500 gap-2">
        <span>ໝາຍເລກ 1 ແມ່ນໝາຍຄວາມວ່າ ສາມາດເຮັດໃນສິ່ງນັ້ນໄດ້</span>
        <span>ໝາຍເລກ 0 ແມ່ນໝາຍຄວາມວ່າ ບໍ່ມີສິດເຄື່ອນໄຫວໃນສິ່ງນັ້ນ</span>
      </div> */}
      {/* <RoleAll /> */}
      <Box className="flex justify-end items-end mb-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="ຊອກຫາ......"
          className="border outline-none font-medium text-sky-500 py-2 px-6 rounded-md md:w-52 w-32"
        />
      </Box>
      <TableContainer className="bg-white">
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          className="overflow-hidden">
          <TableHead className="bg-sky-400">
            <tr>
              <th rowSpan="3" className={classThead}>
                ລຳດັບ
              </th>
              <th rowSpan="3" className={classThead}>
                ID ບັນຊີ
              </th>
              <th rowSpan="3" className={classThead}>
                ຊື່ບັນຊີ
              </th>
              <th rowSpan="3" className={classThead}>
                ອີເມວທີ່ຢູ່
              </th>
              <th rowSpan="3" className={classThead}>
                ບົດບາດ
              </th>
            </tr>
            <tr>
              <th colSpan="4" className={classThead}>
                ສິດທີໃນການນຳໃຊ້
              </th>
            </tr>
            <tr>
              <th rowSpan="2" className={classThead}>
                ສ້າງ
              </th>
              <th rowSpan="2" className={classThead}>
                ອ່ານ
              </th>
              <th rowSpan="2" className={classThead}>
                ແກ້ໄຂ
              </th>
              <th colSpan="4" className={classThead}>
                ລົບ
              </th>
            </tr>
          </TableHead>
          <TableBody>
            {roledata
              .filter(
                (users) =>
                  users.UserName.toLowerCase().includes(search) ||
                  users.Email.toLowerCase().includes(search)
              )
              .map((getData, index) => {
                return (
                  <tr key={index}>
                    <td className={classTbody}> {number++} </td>
                    <td className="text-green-500 py-3 px-2 font-normal border border-slate-200 text-sm text-center">
                      {" "}
                      {getData.randId}{" "}
                    </td>
                    <td className={classTbody}> {getData.UserName} </td>
                    <td className={classTbody}> {getData.Email} </td>
                    <td className={classTbody}>
                      {getData.RoleName === "admin" ? (
                        <span className="py-1 px-4 rounded-md bg-red-400 text-white">
                          ຜູ້ບໍລິຫານ
                        </span>
                      ) : getData.RoleName === "manager" ? ( 
                        <span className="py-1 px-4 rounded-sm bg-sky-400 text-gray-600">
                          ຜູ້ຈັດການ
                        </span>
                       ) : (
                        <span className="py-1 px-4 rounded-sm bg-yellow-400">
                          ຜູ້ນຳໃຊ້
                        </span>
                      )}
                    </td>
                    <td className={classTbody}> {getData.PermCreate} </td>
                    <td className={classTbody}> {getData.PermRead} </td>
                    <td className={classTbody}> {getData.PermUpdate} </td>
                    <td className={classTbody}> {getData.PermDelete} </td>
                  </tr>
                )
              })}
          </TableBody>
        </Table>
        {!nonedata && (
          <div className="w-full h-auto py-6 flex flex-col gap-2 justify-center drop-shadow-md items-center text-red-400 text-xl font-medium">
            <AutoStoriesIcon sx={{ fontSize: 100 }} />
            <span className="text-lg font-medium text-sky-500">
              ບໍ່ມີຂໍ້ມູນແລ້ວ!
            </span>
          </div>
        )}
      </TableContainer>
    </motion.div>
  )
}

export default DataRoleUser
