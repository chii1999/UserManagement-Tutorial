import axios from "axios"
import React, { useState, useEffect } from "react"
import Datatable from "react-data-table-component"
// import { useNavigate } from "react-router-dom"
// import swal from "sweetalert"

function RoleAll() {
  // const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [profiledata, setProfiledata] = useState([])
  const [filterprofile, setFilterprofile] = useState("")

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
  // action table profile

  const getProfile = async () => {
    try {
      const response = await axios.get("http://192.168.0.236:8000/apialltable")
      setProfiledata(response.data)
      setFilterprofile(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  let number =1;

  const columns = [
    {
      name: "ລຳດັບ",
      selector: (row) => number++,
    },
    {
      name: "ຊື່ນຳໃຊ້ລະບົບ",
      selector:(row) => row.UserName,
    },
    {
      name: "E-mail Address",
      selector: (row) => row.Email,
    },
    {
      name: "ເບີໂທຕິດຕໍ່",
      selector: (row) => row.Mobile,
    },
    {
      name: "ບົດບາດ",
      selector: (row) => row.RoleName,
    }
  ]

  useEffect(() => {
    getProfile()
  }, [])


  useEffect(() => {
    const result = profiledata.filter((Users) => {
      return (
        Users.UserName.toLowerCase().match(search.toLowerCase()) || 
        Users.RoleName.toLowerCase().match(search.toLowerCase()) || 
        Users.Email.toLowerCase().match(search.toLowerCase())
      )
    })

    setFilterprofile(result)
  }, [search])

  return (
    <Datatable
      title="ບົດບາດຂອງ Users"
      columns={columns}
      data={filterprofile}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="ຊອກຫາ......"
          className="border outline-none font-medium text-orange-500 py-2 px-6 rounded-sm w-[20rem]"
        />
      }
    />
  )
}

export default RoleAll
