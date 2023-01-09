import React, { useState, useEffect } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { motion } from "framer-motion"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import UpdateUserLogin from "./UpdateUserLogin"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function UserLogin(props) {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

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

  // ວາງຕົວປ່ຽນເກັບ UserUpdate ເພື່ອສົ່ງໄປຫາຟາຍແກ້ໄຂ UserUpdate
  const UserUpdate = (UserId) => {
    navigate(`/updateuserlogin/${UserId}`)
  }

  // Delete file user (function ການລົບຂໍ້ມູນ)
  const submitDelete = (UserId) => {
    swal({
      title: "ທ່ານແນ່ໃຈລຶບບັນຊີນີ້ບໍ?",
      text: "ບັນຊີທີຖຶກລຶບອອກຈະບໍ່ມີສິດດຳເນີນທຸລະກຳໃນລະບົບໄດ້",
      icon: "warning",
      buttons: {
        cancel: "ບໍ່ຕ້ອງລຶບ",
        catch: {
          text: "ລຶບອອກ",
          value: "catch",
        },
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        var raw = JSON.stringify({
          UserId: UserId,
        })

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        }

        fetch("http://192.168.0.12:8000/apiuser/delete/" + UserId, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            swal("ສຳເລັດແລ້ວ", "ຟິວນີ້ຖຶກລົບອອກແລ້ວ", "success")
            UserGet()
          })
          .catch((error) => console.log("error", error))
      }
    })
  }

  // const [anchorEl, setAnchorEl] = React.useState(null)
  // const open = Boolean(anchorEl)
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  const [enable, setEnable] = useState(true)
  const [manager, setManager] = useState(true)
  const [userCreate, setUserCreate] = useState(true)
  const [userRead, setUserRead] = useState(true)
  const [userEdit, setUserEdit] = useState(true)
  const [userDel, setUserDel] = useState(true)
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
          setEnable(false)
          setManager(true)
        } else if (user.RoleName === "manager") {
          setEnable(true)
          setManager(false)
        } else if (user.RoleName === "user") {
          setEnable(true)
          setManager(true)
          

          if (user.PermCreate === 1 && user.PermRead === 1 && user.PermUpdate === 1 && user.PermDelete === 1) {
            setUserRead(false)
            setUserEdit(false)
            setUserDel(false)
            setUserCreate(false)
          } 
          else if (user.PermCreate === 1 && user.PermRead === 1 && user.PermUpdate === 1 && user.PermDelete ===0) {
            setUserCreate(false)
            setUserRead(false)
            setUserEdit(false)
            setUserDel(true)
          }  else if (user.PermCreate === 1 && user.PermRead === 1 && user.PermUpdate === 0 && user.PermDelete ===0) {
            setUserCreate(false)
            setUserRead(false)
            setUserEdit(true)
            setUserDel(true)
          } else if (user.PermCreate === 1 && user.PermRead === 0 && user.PermUpdate === 0 && user.PermDelete ===0) {
            setUserCreate(false)
            setUserRead(true)
            setUserEdit(true)
            setUserDel(true)
          } else if (user.PermCreate === 0 && user.PermRead === 1 && user.PermUpdate === 1 && user.PermDelete ===1) {
            setUserCreate(true)
            setUserRead(false)
            setUserEdit(false)
            setUserDel(false)
          } else if (user.PermCreate === 0 && user.PermRead === 0 && user.PermUpdate === 1 && user.PermDelete ===1) {
            setUserCreate(true)
            setUserRead(true)
            setUserEdit(false)
            setUserDel(false)
          } else if (user.PermCreate === 0 && user.PermRead === 0 && user.PermUpdate === 0 && user.PermDelete ===1) {
            setUserCreate(true)
            setUserRead(true)
            setUserEdit(true)
            setUserDel(false)
          } else if (user.PermCreate === 0 && user.PermRead === 1 && user.PermUpdate === 1 && user.PermDelete ===0) {
            setUserCreate(true)
            setUserRead(false)
            setUserEdit(false)
            setUserDel(true)
          } else if (user.PermCreate === 1 && user.PermRead === 0 && user.PermUpdate === 0 && user.PermDelete ===1) {
            setUserCreate(false)
            setUserRead(true)
            setUserEdit(true)
            setUserDel(false)
          }  else if (user.PermCreate === 1 && user.PermRead === 0 && user.PermUpdate === 1 && user.PermDelete ===0) {
            setUserCreate(false)
            setUserRead(true)
            setUserEdit(false)
            setUserDel(true)
          } else if (user.PermCreate === 0 && user.PermRead === 0 && user.PermUpdate === 1 && user.PermDelete ===0) {
            setUserCreate(true)
            setUserRead(true)
            setUserEdit(false)
            setUserDel(true)
          } else if (user.PermCreate === 0 && user.PermRead === 1 && user.PermUpdate === 0 && user.PermDelete ===1) {
            setUserCreate(true)
            setUserRead(false)
            setUserEdit(true)
            setUserDel(false)
          } else {
            setUserRead(true)
            setUserEdit(true)
            setUserDel(true)
            setUserCreate(true)
          }
          

        } else {
          setEnable(true)
          setManager(true)
        }
        // console.log(result)
      })
      .catch((error) => console.log("error", error))
  }, [user])

  const [query, setQuery] = useState("")

  let number = 1

  const title = (
    <span className="text-white font-medium w-full text-center">
      ເລືອກບັນຊີທີທ່ານຕ້ອງການເອົາໄປບັນທຶກໂປຣໄຟຣ
    </span>
  )

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (UserId) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      className="lg:pt-0 md:pt-14 sm:pt-14 pt-14 bg-white rounded-md">
      <div className="p-2 w-full flex justify-between items-center">
        <span className="text-gray-500 font-medium py-1 pl-2 border-l-2 border-l-sky-500">
          ລາຍງານຂໍ້ມູນຜູ້ນຳໃຊ້
        </span>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="outline-none border rounded-sm text-gray-500 font-medium md:w-[20rem] sm:w-[16rem] py-2 px-6 placeholder:text-gray-400"
          placeholder="ຊອກຫາ...."
        />
      </div>
      <TableContainer className="lg:pt-0 md:pt-0 sm:pt-[3.45rem]">
        <Table
          className="border"
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span className="font-medium text-md text-gray-700">ລຳດັບ</span>
              </TableCell>
              <TableCell align="center">
                <span className="font-medium text-md text-gray-700">User-ID</span>
              </TableCell>
              <TableCell align="left">
                <span className="font-medium text-md text-gray-700">
                  ຊື່ຜູ້ນຳໃຊ້
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="font-medium text-md text-gray-700">
                  ອີເມວທີຢູ່
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="font-medium text-md text-gray-700">
                  ເບີໂທຕິດຕໍ່
                </span>
              </TableCell>
                <TableCell align="center">
                  {!enable && (
                    <span className="font-medium text-md text-gray-700">
                    ການຄວບຄຸມ
                  </span>
                  )}
                  {!manager && (
                    <span className="font-medium text-md text-gray-700">
                    ການຄວບຄຸມ
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
                  <TableCell component="th" align="center" scope="row">
                    <span className="font-medium text-green-500">{row.randId}</span>
                  </TableCell>
                  <TableCell align="left">
                    <span>{row.UserName}</span>
                  </TableCell>
                  <TableCell align="left">
                    <span>{row.Email}</span>{" "}
                  </TableCell>
                  <TableCell align="left">
                    <span>(+856) {row.Mobile}</span>
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex gap-2 justify-center items-center">
                      {!enable && (
                        <button
                          onClick={() => UserUpdate(row.UserId)}
                          className="bg-sky-400 hover:scale-110 flex jusitify-center items-center hover:ease-in hover:duration-300 py-2 px-4 w-30 drop-shadow-md rounded-md"
                          color="secondary">
                          <EditIcon sx={{ fontSize: 22, color: "#fff" }} />
                        </button>
                      )}
                      {!manager && (
                        <button
                          onClick={() => UserUpdate(row.UserId)}
                          className="bg-sky-400 hover:scale-110 flex jusitify-center items-center hover:ease-in hover:duration-300 py-2 px-4 w-30 drop-shadow-md rounded-sm"
                          color="secondary">
                          <EditIcon sx={{ fontSize: 20, color: "#0088" }} />
                          <span className="text-sm text-white ml-2">ແກ້ໄຂ</span>
                        </button>
                      )}
                      {!enable && (
                        <button
                          onClick={() => submitDelete(row.UserId)}
                          className="bg-rose-500 hover:scale-110 hover:ease-in hover:duration-300 py-2 px-4 w-30 drop-shadow-md rounded-md text-sm"
                          color="secondary">
                          <DeleteIcon sx={{ fontSize: 20, color: "#fff" }} />
                        </button>
                      )}

                      {!userCreate && (
                        <button
                          className="bg-green-500 hover:scale-110 hover:ease-in hover:duration-300 py-2 px-4 w-30 drop-shadow-md rounded-sm text-sm"
                          color="secondary">
                          <span className="text-white text-sm">U-Create</span>
                        </button>
                      )}
                      {!userRead && (
                        <button
                          className="bg-sky-500 hover:scale-110 hover:ease-in hover:duration-300 py-2 px-4 w-30 drop-shadow-md rounded-sm text-sm"
                          color="secondary">
                          <span className="text-white text-sm">U-Read</span>
                        </button>
                      )}
                      {!userEdit && (
                        <button
                          className="bg-pink-500 hover:scale-110 hover:ease-in hover:duration-300 py-2 px-4 w-30 drop-shadow-md rounded-sm text-sm"
                          color="secondary">
                          <span className="text-white text-sm">U-Edit</span>
                        </button>
                      )}
                      {!userDel && (
                        <button
                          className="bg-rose-500 hover:scale-110 hover:ease-in hover:duration-300 py-2 px-4 w-30 drop-shadow-md rounded-sm text-sm"
                          color="secondary">
                          <span className="text-white text-sm">U-Del</span>
                        </button>
                      )} 
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle className="text-center bg-sky-400">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">

              <UpdateUserLogin />
              
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </TableContainer>
    </motion.div>
  )
}
