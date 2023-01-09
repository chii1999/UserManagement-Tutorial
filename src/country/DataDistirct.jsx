import axios from "axios"
import React, { useState, useEffect } from "react"
import Datatable from "react-data-table-component"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import FormDisT from "./FormDisT"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function DataDistrict() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [profiledata, setProfiledata] = useState([])
  const [filterprofile, setFilterprofile] = useState("")

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // action table profile
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
          setEnable(false)
        } else if (user.RoleName === "manager") {
          setEnable(false)
        } else if (user.RoleName === "user") setEnable(true)
      })
      .catch((error) => console.log("error", error))
  }, [user])
  // action table profile

  const getProfile = async () => {
    try {
      const response = await axios.get("http://192.168.0.12:8000/apidistrict")
      setProfiledata(response.data)
      setFilterprofile(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  let number = 1

  const columns = [
    {
      name: "ລຳດັບ",
      selector: (row) => number++,
    },
    {
      name: "ຊື່ເມືອງ",
      selector: (row) => <span>ເມືອງ {row.DistrictName}</span>,
      sortable: true,
    },
    {
      name: "ຊື່ແຂວງ",
      selector: (row) => <span>ແຂວງ {row.ProvinceName}</span>,
    },
    {
      name: "ການຄວບຄຸມ",
      cell: (row) => (
        <div className="flex gap-2 py-2">
          {!enable && (
            <button
              className="py-2 px-6 rounded-sm hover:scale-110 hover:ease-in hover:duraction-300 bg-sky-500 text-white"
              onClick={() => updateDistrict(row.DistrictId)}>
              <EditIcon sx={{ fontSize: 22, color: "#fff" }} />
            </button>
          )}
          {!enable && (
            <button
              className="p-2 rounded-sm hover:scale-110 hover:ease-in hover:duraction-300 bg-red-500 text-white"
              onClick={() => deleteProfile(row.ProfileId)}>
              <DeleteIcon sx={{ fontSize: 20, color: "#fff" }} />
            </button>
          )}
        </div>
      ),
    },
  ]

  const updateDistrict = (DistrictId) => {
    navigate(`/UpdateDistrict/${DistrictId}`)
  }

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    const result = profiledata.filter((District) => {
      return (
        District.DistrictName.toLowerCase().match(search.toLowerCase()) ||
        District.ProvinceName.toLowerCase().match(search.toLowerCase())
      )
    })

    setFilterprofile(result)
  }, [search])
  
  const deleteProfile = (ProfileId) => {
    swal({
      title: "ທ່ານແນ່ໃຈແລ້ວບໍ່?",
      text: "ລາຍຊື່ໂປຣໄຟຣນີ້ຈະຖຶກລຶບອອກຈາກລະບົບ!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
          ProfileId: ProfileId,
        })

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        }

        fetch(
          "http://192.168.0.12:8000/apiprofile/delete/" + ProfileId,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "ok") {
              swal("ລົບຂໍ້ມູນສຳເລັດ")
              getProfile()
            }
          })
          .catch((error) => console.log("error", error))
      }
    })
  }

  return (
    <div>
      <div className="py-4 flex justify-between items-center">
        <h3 className="text-gray-500 font-medium py-2 border-l-2 border-l-sky-500 pl-2">
          ລາຍງານຂໍ້ມູນເມືອງ ແລະ ແຂວງ
        </h3>
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="ຊອກຫາ ເມືອງ, ແຂວງ"
            className="border placeholder:font-normal outline-none font-medium text-gray-500 py-2 px-6 rounded-sm w-52"
          />
          <button
            type="submit"
            onClick={handleClickOpen}
            className="py-2 px-6 rounded-md bg-sky-500 text-white ml-4">
            ເພິ່ມເມືອງ
          </button>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="w-full bg-sky-500 text-white">
          <span>ເພິ່ມຂໍ້ມມູນເມືອງ</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <FormDisT />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Datatable
        columns={columns}
        data={filterprofile}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="470px"
        selectableRowsHighlight
        highlightOnHover
      />
    </div>
  )
}

export default DataDistrict
