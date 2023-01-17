import React, { useState, useEffect } from "react"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, Divider } from "@mui/material"
import QuestionApp from "../QuestionApp"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import Slide from "@mui/material/Slide"
import EditImage from "../../user/user_Update/EditImage"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function BannerProfile() {
  // get data from user login
  const [user, setUser] = useState([])
  const navigate = useNavigate()

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
        if (result.status === "ok") {
          setUser(result.userlogin)
        }
      })
      .catch((error) => console.log("error", error))
  }, [user])

  const handleEdit = (UserId) => {
    navigate(`/UpdateForme/${UserId}`)
  }
  const editProfile = (ProfileId) => {
    navigate(`/updatebec/${ProfileId}`)
  }
  // const editProfileName = (ProfileId) => {
  //   navigate(`/EditProfile/${ProfileId}`)
  // }
  // const handleAddProfile = () => {
  //   navigate(`/AddProfile`)
  // }
  const changeNewpass = (UserName) => {
    navigate(`/RessPassword/${UserName}`)
  }

  // security token
  useEffect(() => {
    const token = localStorage.getItem("Token")
    var myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }

    fetch("http://192.168.0.236:8000/apilogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUser(result.userlogin)
      })
      .catch((error) => console.log("error", error))
  }, [user])

  const handleEditImg = (UserId) => {
    navigate(`/EditImage/${UserId}`)
  }

  const handleSignUp = () => {
    setOpen(true)
  }
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const animateForm = { opacity: 0, y: -40 }
  const animateTo = { opacity: 1, y: 0 } 

  return (
    <div className="w-full lg:pt-4 md:pt-14 sm:pt-14 my-8 pt-14 flex flex-col justify-between items-start gap-4 bg-white">
      <div className="md:flex justify-between items-start gap-4 w-full">
        <div className="md:w-[25rem] w-full h-auto border rounded-md bg-white flex flex-col justify-start items-center gap-2 p-3">
          <div className="flex flex-col justify-center items-center gap-2 relative">
            <button
              onClick={() => handleEditImg(user.UserId)}
              className="absolute top-[6rem] z-10 right-3">
              <PhotoCameraIcon
                className="text-sky-500 stroke-gray-200"
                sx={{ fontSize: 30 }}
              />
            </button>
            <Avatar
              alt={user.UserName}
              src={`http://192.168.0.236:8000/apilogin/${user.Img}`}
              sx={{ width: 130, height: 130 }}
              className="shadow-lg border-t border-t-sky-500"

            />
            {/* <img src="" alt="" /> */}
            <h2 className="text-lg flex gap-2 justify-center items-center font-bold text-gray-600 w-full">
              <span>{user.FirstName}</span>
              <span className=" uppercase">{user.LastName}</span>
            </h2>
            <span className="py-1 px-4 rounded-md text-green-600 font-medium text-sm bg-green-200 text-center">
              {" "}
              {user.RoleName}{" "}
            </span>
          </div>

          <div className="flex flex-col gap-2 w-full mt-4">
            <div className="w-full h-auto rounded-md bg-gray-100 border p-2 hover:border-sky-500">
              <span className="text-gray-400 text-sm"> ຊື່ນຳໃຊ້ </span>
              <h2 className="text-gray-500 font-medium text-sm">
                {" "}
                {user.UserName}{" "}
              </h2>
            </div>
            <div className="w-full h-auto rounded-md bg-gray-100 border p-2 hover:border-sky-500">
              <span className="text-gray-400 text-sm"> ອີເມວທີຢູ່ </span>
              <h2 className="text-gray-500 font-medium text-sm">
                {" "}
                {user.Email}{" "}
              </h2>
            </div>
            <div className="w-full h-auto rounded-md bg-gray-100 border p-2 hover:border-sky-500">
              <span className="text-gray-400 text-sm"> ເບີໂທລະສັບ </span>
              <h2 className="text-gray-500 font-medium text-sm">
                {" "}
                +856 {user.Mobile}{" "}
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleEdit(user.UserId)}
                className="py-2 px-4  rounded-md border text-sky-500 text-[.76rem] font-medium">
                ແກ້ໄຂຂໍ້ມູນ
              </button>
              <button
                onClick={() => changeNewpass(user.UserName)}
                className="py-2 px-4  rounded-md border text-sky-500 text-[.76rem] font-medium">
                ປ່ຽນລະຫັດຜ່ານ
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-4">
          <div className="w-full h-42 md:mt-0 mt-4">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
              <motion.div
                initial={animateForm}
                animate={animateTo}
                transition={{ delay: 0.05 }}
                className="lg:w-[10rem] md:w-[6rem] sm:w-full h-20 bg-green-500 border rounded-md flex gap-4 flex-col justify-center items-center text-white">
                <span className=" font-bold text-xl">{user.PermCreate}</span>
                <span>ບັນທຶກຂໍ້ມູນ</span>
              </motion.div>
              <motion.div
                initial={animateForm}
                animate={animateTo}
                transition={{ delay: 0.1 }}
                className="lg:w-[10rem] md:w-[6rem] sm:w-full h-20 bg-sky-500 border rounded-md flex gap-4 flex-col justify-center items-center text-white">
                <span className=" font-bold text-xl"> {user.PermRead} </span>
                <span>ອ່ານຂໍ້ມູນ</span>
              </motion.div>
              <motion.div
                initial={animateForm}
                animate={animateTo}
                transition={{ delay: 0.2 }}
                className="lg:w-[10rem] md:w-[6rem] sm:w-full h-20 bg-orange-500 border rounded-md flex gap-4 flex-col justify-center items-center text-white">
                <span className=" font-bold text-xl"> {user.PermUpdate} </span>
                <span>ແກ້ໄຂຂໍ້ມູນ</span>
              </motion.div>
              <motion.div
                initial={animateForm}
                animate={animateTo}
                transition={{ delay: 0.3 }}
                className="lg:w-[10rem] md:w-[6rem] sm:w-full h-20 bg-pink-500 border rounded-md flex gap-4 flex-col justify-center items-center text-white">
                <span className=" font-bold text-xl"> {user.PermDelete} </span>
                <span>ລຶບຂໍ້ມູນ</span>
              </motion.div>
            </div>
          </div>
          <div className="w-full h-auto border rounded-md bg-white md:mt-0 mt-4 p-4 relative">
            <div className="flex gap-2 absolute right-3 top-3">
              <button
                onClick={() => editProfile(user.ProfileId)}
                className="py-2 px-4  rounded-md border border-sky-500 text-sky-500 text-[.76rem] font-medium">
                ແກ້ໄຂໂປຣໄຟຣ
              </button>
            </div>
            <div className="py-2 flex flex-col gap-2">
              <h3 className="mb-2 font-medium py-2 pl-2 w-auto border-l-2 border-l-green-500 text-gray-600">
                ຂໍ້ມູນໂປຣໄຟຣຂອງຂ້ອຍ
              </h3>
              <Divider />
              <ul className="list-disc pl-4 leading-loose">
                <li className="text-gray-600">
                  ຊື່ ແລະ ນາມສະກຸນ: {user.FirstName} {user.LastName}{" "}
                </li>
                <li className="text-gray-600">ເພດ: {user.Gender} </li>
                <li className="text-gray-600">
                  ວັນທີ, ເດືອນ, ປີເກີດ: {user.Dob}{" "}
                </li>
                <li className="text-gray-600">ບ້ານ: {user.VillageName} </li>
                <li className="text-gray-600">ເມືອງ: {user.DistrictName} </li>
                <li className="text-gray-600">ແຂວງ: {user.ProvinceName} </li>
              </ul>

              <div className="w-full flex flex-col gap-2 justify-center items-center mt-8">
                <span className="text-green-500 font-medium">
                  ຄຳຂວັນຂອງ ແຂວງ {user.ProvinceName}
                </span>
                <span>" {user.document} "</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 mt-6 w-full">
        <span className="text-xl font-medium text-gray-500 py-4 w-full flex justify-center items-center">
          ຄຳຖາມ ແລະ ຄຳອະທີບາຍການນຳໃຊ້ ລະບົບ Software
        </span>
        <QuestionApp />
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="text-center w-full bg-sky-500 text-white">
          <span>ປ່ຽນຮູບພາບໂປຣໄຟຣ</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <EditImage />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BannerProfile
