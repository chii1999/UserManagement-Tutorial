import axios from "axios"
import React, { useState, useEffect } from "react"
import Datatable from "react-data-table-component"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"

function DatatableProfile() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [profiledata, setProfiledata] = useState([])
  const [filterprofile, setFilterprofile] = useState("")

  // action table profile
  const [enable, setEnable] = useState(true)
  const [manager, setManager] = useState(true)
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
        } else if (user.RoleName === "user") setEnable(true)
      })
      .catch((error) => console.log("error", error))
  }, [user])
  

  //   action button
  const clickUpdate = (ProfileId) => {
    navigate(`/updateprofile/${ProfileId}`)
  }

  const deleteProfile = (ProfileId) => {
    swal({
      title: "ທ່ານໝັ່ນໃຈແລ້ວບໍ?",
      text: "ລາຍຊື່ໂປຣໄຟຣນີ້ຈະຖຶກລຶບອອກຈາກລະບົບ ພ້ອມກັບຂໍ້ມູນບັນຊີ!",
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

        fetch("http://192.168.0.12:8000/apiprofile/delete/" + ProfileId, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "ok") {
              swal({
                title: "ສຳເລັດແລ້ວ",
                text: "ຟິວນີ້ໄດ້ຖຶກລົບອອກໄປແລ້ວ!",
                icon: "success",
                button: false,
              })
              getProfile()
            }
          })
          .catch((error) => console.log("error", error))
      }
    })
  }

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      const response = await axios.get("http://192.168.0.12:8000/apiprofile")
      setProfiledata(response.data)
      setFilterprofile(response.data)
    } catch (error) {
      console.log(error)
    }
  }

// map data to table
  let number = 1
  const columns = [
    {
      name: "ລຳດັບ",
      selector: (row) => number++,
    },
    {
      name: "ຮູບພາບ",
      selector: (row) => (
        <span className="p-[.4rem]">
          <img
            src={`http://192.168.0.12:8000/apiprofile/${row.Img}`}
            alt="pic"
            className="w-14 h-14 border shadow-md rounded-xl object-cover"
          />
        </span>
      ),
      sortable: true,
    }, 
    {
      name: "ຊື່",
      selector: (row) => row.FirstName,
      sortable: true,
    },
    {
      name: "ນາມສະກຸນ",
      selector: (row) => row.LastName,
    },
    {
      name: "ເພດ",
      selector: (row) => row.Gender,
    },
    {
      name: "ວັນທີ,ເດືອນ,ປີເກີດ",
      selector: (row) => row.Dob,
    },
    {
      name: "ຊື່ບ້ານ",
      selector: (row) => row.VillageName,
    },
    {
      name: "ຊື່ເມືອງ",
      selector: (row) => row.DistrictName,
    },
    {
      name: "ຊື່ແຂວງ",
      selector: (row) => row.ProvinceName,
    },
    {
      name: <div className="text-red-500 font-medium text-md"> {!enable && (<span>ການຄວບຄຸມ</span>)} {!manager && (<span>ການຄວບຄຸມ</span>)} </div>,
      cell: (row) => (
        <div className="flex justify-center items-center gap-4 py-2 w-full">
          {!enable && (
            <button
              className="p-1 rounded-sm hover:scale-110 hover:ease-in hover:duraction-300 bg-sky-500 text-white"
              onClick={() => clickUpdate(row.ProfileId)}>
              <EditIcon sx={{ fontSize: 22, color: "#fff" }} />
            </button>
          )}
          {!manager && (
            <button
              className="p-1 rounded-sm hover:scale-110 hover:ease-in hover:duraction-300 bg-sky-500 text-white"
              onClick={() => clickUpdate(row.ProfileId)}>
              <EditIcon sx={{ fontSize: 22, color: "#fff" }} />
            </button>
          )}
          {!enable && (
            <button
              className="p-1 rounded-sm hover:scale-110 hover:ease-in hover:duraction-300 bg-red-500 text-white"
              onClick={() => deleteProfile(row.ProfileId)}>
              <DeleteIcon sx={{ fontSize: 20, color: "#fff" }} />
            </button>
          )}
        </div>
      ),
    },
  ]


  useEffect(() => {
    const result = profiledata.filter((Profile) => {
      return (
        Profile.FirstName.toLowerCase().match(search.toLowerCase()) ||
        Profile.LastName.toLowerCase().match(search.toLowerCase()) ||
        Profile.Gender.toLowerCase().match(search.toLowerCase()) ||
        Profile.FirstName.toLowerCase().match(search.toLowerCase()) ||
        Profile.Dob.toLowerCase().match(search.toLowerCase()) ||
        Profile.VillageName.toLowerCase().match(search.toLowerCase()) ||
        Profile.DistrictName.toLowerCase().match(search.toLowerCase()) ||
        Profile.ProvinceName.toLowerCase().match(search.toLowerCase())
      )
    })

    setFilterprofile(result)
  }, [search])
  
  return (
    <div>
      <div className="py-4 flex justify-between items-center">
        <h3 className="text-gray-500 font-medium py-2 border-l-2 border-l-sky-500 pl-2">
          ຂໍ້ມູນໂປຣໄຟຣຂອງພະນັກງານ
        </h3>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="ຊອກຫາຫຍັງ"
          className="border placeholder:font-normal outline-none font-medium text-gray-500 py-2 px-6 rounded-sm w-1/4"
        />
      </div>
      <Datatable
        columns={columns}
        data={filterprofile}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="570px"
        selectableRowsHighlight
        highlightOnHover
      />
    </div>
  )
}

export default DatatableProfile
