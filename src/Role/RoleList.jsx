import React, { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
// import Button from "@mui/material/Button"
// import swal from "sweetalert"

// import { Link } from "react-router-dom"

export default function RoleList() {
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

  // delete data Provinces Table
  // const deleteRole = (RoleId) => {
  //   swal({
  //     title: "ທ່ານແນ່ໃຈລຶບບົດບາດນີ້ບໍ່?",
  //     text: "ບັນຊີທີ່ມີບົດບາດນີ້ຈະບໍ່ສາມາດນຳໃຊ້ລະບົບໄດ້",
  //     icon: "info",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       var myHeaders = new Headers()
  //       myHeaders.append("Content-Type", "application/json")

  //       var raw = JSON.stringify({
  //         ProvinceId: RoleId,
  //       })

  //       var requestOptions = {
  //         method: "DELETE",
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: "follow",
  //       }

  //       fetch("http://localhost:8000/apiroles/delete" + RoleId, requestOptions)
  //         .then((response) => response.json())
  //         .then((result) => {
  //           swal("ສຳເລັດແລ້ວ", "ຟິວນີ້ຖຶກລົບອອກແລ້ວ", "success")
  //           UserGet()
  //         })
  //         .catch((error) => console.log("error", error))
  //     }
  //   })
  // }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 490 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span className="text-gray-500 font-semibold">
                  ລຳດັບ
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="text-gray-500 font-semibold">
                  ຖານະບົດບາດ
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  {row.RoleId}
                </TableCell>
                <TableCell align="left">
                  <span className="text-gray-400 font-medium">
                    {row.RoleName}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
