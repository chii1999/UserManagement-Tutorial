import React, { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"

export default function DistrictV() {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    UserGet()
  }, [])

  const UserGet = () => {
    fetch("http://192.168.0.236:8000/apidistrict")
      .then((res) => res.json())
      .then((result) => {
        setItems(result)
      })
  }

  const updateDistrict = (DistrictId) => {
    navigate(`/UpdateDistrict/${DistrictId}`)
  }

  // delete data Provinces Table
  const deleteData = (DistrictId) => {
    swal({
      title: "ເຈົ້າແນ່ໃຈແລ້ວບໍ?",
      text: "ຂໍ້ມູນເມືອງນີ້ຈະຖຶກລຶບອອກຈາກລະບົບທັນທີ!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
          DistrictId: DistrictId,
        })

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        }

        fetch(
          "http://192.168.0.236:8000/apidistrict/delete/" + DistrictId,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            swal("ສຳເລັດແລ້ວ", "ຂໍ້ມຸນເມືອງນີ້ຖຶກລຶບອອກແລ້ວ", "success")
            UserGet()
          })
          .catch((error) => console.log("error", error))
      }
    })
  }

  // action status datatable user login
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

    fetch("http://192.168.0.236:8000/apilogin/gettoken", requestOptions)
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

  let number = 1

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span className="text-md text-gray-500 font-semibold">
                  ລຳດັບ ເມືອງ
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="text-lg text-gray-500 font-semibold">
                  ຊື່ເມືອງທັງໝົດ
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="text-lg text-gray-500 font-semibold">
                  ຊື່ແຂວງທັງໝົດ
                </span>
              </TableCell>
              <TableCell align="right">
                <span>ຄອບຄຸມ</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  {number++}
                </TableCell>
                <TableCell align="left">
                  <span className="text-gray-500 font-medium">
                    ເມືອງ {row.DistrictName}
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-gray-500 font-medium">
                    ແຂວງ {row.ProvinceName}{" "}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <div className="flex gap-2 justify-end items-center w-full">
                    <button
                      disabled={enable}
                      onClick={() => updateDistrict(row.DistrictId)}
                      className="py-1 px-4 rounded-sm bg-sky-500 text-white font-medium">
                      Edit
                    </button>
                    <button
                      disabled={enable}
                      onClick={() => deleteData(row.DistrictId)}
                      className="py-1 px-4 rounded-sm bg-red-500 text-white font-medium">
                      Del
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
