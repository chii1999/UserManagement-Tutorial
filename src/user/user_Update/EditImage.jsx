import React, { useEffect, useState } from "react"
import swal from "sweetalert"
import axios from "axios"
import "../../App.css"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function AddProfile() {
  const { UserId } = useParams()
  const history = useNavigate()

  // create profile
  const [image, setImage] = useState("")
  // useEffect(() => {
  //   fetch("http://192.168.0.236:8000/apiprofile/" + UserId)
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((res) => {
  //       setImage(res.Img)
  //     })
  //     .catch((err) => {
  //       console.log(err.message)
  //     })
  // }, [UserId])

  const setimgfile = (e) => {
    setImage(e.target.files[0])
  }

  const backGo = () => {
    history("/BannerProfile")
  }

  const handleChangeImage = async (e) => {
    e.preventDefault()
    if (!image) {
      swal({
        title: "ແຈ້ງເຕືອນ",
        text: "ເລືອກຮູບພາບໃນຟິວກ່ອນ!",
        icon: "warning",
        button: false,
      })
    } else {
      var formData = new FormData()
      formData.append("UserId", UserId)
      formData.append("image", image)

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

      const res = await axios
        .put("http://192.168.0.236:8000/apiprofile/update/img", formData, config)
        .then((res) => {
          if (res.data.status === "ok") {
            swal({
              title: "ສຳເລັດແລ້ວ",
              text: "ການປ່ຽນແປງຮູບໂປຣໄຟສຳເລັດ",
              icon: "success",
              button: "OK",
            })
          } else if (res.data.status === "error") {
            swal({
              title: "ເຕືອນໄພ!",
              text: "ເກີດຂໍ້ຜິດພາດທາງ Server",
              icon: "error",
              button: "OK",
            })
          }
        })
      console.log(res)
    }
  }

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: -100 }}
      className="rounded-md w-full h-auto overflow-hidden bg-white md:pt-0 pt-10 mb-20"> 
        {/* <div className="w-full h-auto flex justify-center items-center p-4">
          <div className="w-[16rem] h-[13rem] overflow-hidden rounded-[2rem] border shadow-md">
            <img src={`http://192.168.0.236:8000/apiprofile/${image}`} alt="" className="w-full h-full object-cover" />
          </div>
        </div>  */}
      <form
        onSubmit={handleChangeImage}
        className="flex flex-col gap-4 md:w-[30rem] w-full pt-6 px-4">
        <span>ອັບໂຫລດຮູບພາບໃໝ່: </span>
        <input
          type="file"
          id="image"
          className="w-full py-2 px-4 file:cursor-pointer file:rounded-full file:border-none file:text-white file:bg-pink-500 rounded-sm border bg-gray-200"
          accept="image/jpg, image/png, image/jpeg"
          onChange={setimgfile}
          name="image"
        />
        <div className="py-2 px-4 mt-10 w-full flex gap-4">
          <button className="py-2 px-6 rounded-sm bg-sky-500 text-white">
            ບັນທຶກຮູບພາບ
          </button>
          <button onClick={() => backGo()} className="py-2 px-6 rounded-sm bg-gray-400">
            ກັບຄືນ
          </button>
        </div>
      </form>
    </motion.div>
  )
}
