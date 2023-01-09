import React, { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
// import Link from "@mui/material/Link"
// import swal from "sweetalert"
// import { useNavigate } from "react-router-dom"

export default function ProvinceInfo() {
  const [items, setItems] = useState([])
  // const navigate = useNavigate()

  useEffect(() => {
    UserGet()
  }, [])

  const UserGet = () => {
    fetch("http://192.168.0.12:8000/apiprovince")
      .then((res) => res.json())
      .then((result) => {
        setItems(result)
      })
  }

  // const updateProvince = (ProvinceId) => {
  //   navigate(`/ProvinceUpdate/${ProvinceId}`)
  // }
  // // delete data Provinces Table
  // const deleteData = (ProvinceId) => {
  //   swal({
  //     title: "ເຈົ້າແນ່ໃຈແລ້ວບໍ?",
  //     text: "ຂໍ້ມູນແຂວງຈະຖຶກລຶບອອກຈາກລະບົບທັນທີ!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       var myHeaders = new Headers()
  //       myHeaders.append("Content-Type", "application/json")

  //       var raw = JSON.stringify({
  //         ProvinceId: ProvinceId,
  //       })

  //       var requestOptions = {
  //         method: "DELETE",
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: "follow",
  //       }

  //       fetch(
  //         "/apiprovince/delete/" + ProvinceId,
  //         requestOptions
  //       )
  //         .then((response) => response.json())
  //         .then((result) => {
  //           swal("ສຳເລັດແລ້ວ", "ຟິວນີ້ຖຶກລົບອອກແລ້ວ", "success")
  //           UserGet()
  //         })
  //         .catch((error) => console.log("error", error))
  //     }
  //   })
  // }

  // action status datatable user login
  // const [enable, setEnable] = useState(true)
  // const [user, setUser] = useState([])

  // useEffect(() => {
  //   const token = localStorage.getItem("Token")
  //   var myHeaders = new Headers()
  //   myHeaders.append("Authorization", "Bearer " + token)
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   }

  //   fetch("/apilogin/gettoken", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setUser(result.userlogin)
  //       if (user.RoleName === "admin") {
  //         // console.log(user.RoleName)
  //         setEnable(false)
  //       } else if (user.RoleName === "manager") {
  //         setEnable(false)
  //       } else if (user.RoleName === "user") setEnable(true)
  //     })
  //     .catch((error) => console.log("error", error))
  // }, [user])

  const [query, setQuery] = useState("")

  let number = 1

  return (
    <Paper sx={{ width: "100%" }}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="ຊອກຫາ..."
          className="my-4 mx-2 py-2 px-4 text-gray-400 font-medium border rounded-md outline-none w-52"
        />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span className="text-gray-500 font-semibold">ລຳດັບ</span>
              </TableCell>
              <TableCell align="left" sx={{ width: 200 }}>
                <span className="pl-4 text-gray-500 font-semibold">
                  ຊື່ແຂວງ
                </span>
              </TableCell>
              <TableCell align="center">
                <span className="pl-4 text-lg text-red-500 font-semibold">
                  ຄຳຂັວນຂອງແຕ່ລະແຂວງ
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.filter((user) => user.ProvinceName.toLowerCase().includes(query)).map((row) => (
              <TableRow
                key={row.ProvinceId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  {number++}
                </TableCell>
                <TableCell align="left">
                  <span className="pl-4 text-gray-500 font-medium">
                    ແຂວງ {row.ProvinceName}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className="pl-4 text-gray-500 font-medium">
                    " {row.document} "
                  </span>
                  {/* <div className="flex gap-2 justify-cneter items-right w-full">
                  <button
                      disabled={enable}
                      onClick={() => updateProvince(row.ProvinceId)}
                      className="py-1 px-4 rounded-sm bg-sky-500 text-white font-medium">
                      Edit
                    </button>
                    <button
                      disabled={enable}
                      onClick={() => deleteData(row.ProvinceId)}
                      className="py-1 px-4 rounded-sm bg-red-500 text-white font-medium">
                      Del
                    </button>
                  </div> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
