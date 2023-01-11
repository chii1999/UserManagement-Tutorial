import React, { useState, useEffect } from "react"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Divider } from "@mui/material"
import Slide from "@mui/material/Slide"
import EditImage from "../../user/user_Update/EditImage" 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function DetialProfile() {
  // get data from user login  
  const { ProfileId } = useParams()
 
  const [UserName, setUserName] = useState("")
  const [Email, setEmail] = useState("")
  const [Mobile, setMobile] = useState("")
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Gender, setGender] = useState("")
  const [Img, setImg] = useState("")
  const [Dob, setDob] = useState(0)
  const [VillageName, setVillageName] = useState("") 
  const [DistrictName, setDistrictName] = useState("") 
  const [ProvinceName, setProvinceName] = useState("")
  const [document, setDocument] = useState("")

  useEffect(() => {
    fetch("http://192.168.0.12:8000/apiprofile/" + ProfileId)
      .then((res) => {
        return res.json()
      })
      .then((res) => { 
        setUserName(res.UserName)
        setEmail(res.Email)
        setMobile(res.Mobile)
        setFirstName(res.FirstName)
        setLastName(res.LastName)
        setGender(res.Gender)
        setImg(res.Img)
        setDob(res.Dob)
        setVillageName(res.VillageName) 
        setDistrictName(res.DistrictName) 
        setProvinceName(res.ProvinceName)
        setDocument(res.document)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [ProfileId])
         
 

  // const handleEditImg = (UserId) => {
  //   navigate(`/EditImage/${UserId}`)
  // }

 
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }


  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: -100 }}
      className="w-full lg:pt-0 md:pt-14 sm:pt-14 mb-10 pt-14 flex flex-col justify-between items-start gap-4">
      <div className="md:flex justify-between items-start gap-4 w-full">
        <div className="md:w-[25rem] w-full h-auto border rounded-md bg-white flex flex-col justify-start items-center gap-2 p-3">
          <div className="flex flex-col justify-center items-center gap-2 relative">
           
            <img
              alt={UserName}
              src={`http://192.168.0.12:8000/apilogin/${Img}`}
              sx={{ width: 130, height: 130 }}
              className="shadow-lg w-full h-[10rem] object-cover rounded-md"
            /> 
            <h2 className="text-lg flex gap-2 py-2 justify-center items-center font-bold text-gray-600 border-b-2 border-b-sky-500 w-full">
              <span>{FirstName}</span>
              <span className=" uppercase">{LastName}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-2 w-full mt-4">
            <div className="w-full h-auto rounded-md bg-gray-100 border p-2 hover:border-sky-500">
              <span className="text-gray-400 text-sm"> ຊື່ນຳໃຊ້ </span>
              <h2 className="text-gray-500 font-medium text-sm">
                {" "}
                {UserName}{" "}
              </h2>
            </div>
            <div className="w-full h-auto rounded-md bg-gray-100 border p-2 hover:border-sky-500">
              <span className="text-gray-400 text-sm"> ອີເມວທີຢູ່ </span>
              <h2 className="text-gray-500 font-medium text-sm"> {Email} </h2>
            </div>
            <div className="w-full h-auto rounded-md bg-gray-100 border p-2 hover:border-sky-500">
              <span className="text-gray-400 text-sm"> ເບີໂທລະສັບ </span>
              <h2 className="text-gray-500 font-medium text-sm">
                {" "}
                +856 {Mobile}{" "}
              </h2>
            </div>  
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-4">
          <div className="w-full h-auto border rounded-md bg-white md:mt-0 mt-4 p-4 relative"> 
            <div className="py-2 flex flex-col gap-2">
              <h3 className="mb-2 font-medium py-2 pl-2 w-auto border-l-2 border-l-sky-500 text-gray-600">
                ຍິນດີຕ້ອນຮັບ myProfile
              </h3>
              <Divider />
              <ul className="list-disc pl-4 leading-loose">
                <li className="text-gray-600">
                  ຊື່ ແລະ ນາມສະກຸນ:{" "}
                  <i>
                    {FirstName} {LastName}{" "}
                  </i>
                </li>
                <li className="text-gray-600">
                  ເພດ: <i>{Gender}</i>{" "}
                </li>
                <li className="text-gray-600">
                  ວັນທີ, ເດືອນ, ປີເກີດ: <i>{Dob}</i>{" "}
                </li>
                <li className="text-gray-600">
                  ບ້ານ: <i>{VillageName}</i>{" "}
                </li>
                <li className="text-gray-600">
                  ເມືອງ: <i>{DistrictName}</i>{" "}
                </li>
                <li className="text-gray-600">
                  ແຂວງ: <i>{ProvinceName}</i>{" "}
                </li>
              </ul>

              <div className="w-full flex flex-col gap-2 justify-center items-center mt-6">
                <span className="text-green-500 font-medium">
                  ຄຳຂວັນຂອງ ແຂວງ {ProvinceName}
                </span>
                <span>" {document} "</span>
              </div>
            </div>
          </div>
        </div>
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
    </motion.div>
  )
}

export default DetialProfile
