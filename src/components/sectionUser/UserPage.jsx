import React, { useEffect, useState } from "react"
import "../../App.css"
import MenuUser from "./MenuUser"
import { Routes, Route } from "react-router-dom"
import Dashboard from "../Dashboard"
import ProductSale from "./ProductSale"
import AccountMenu from "../AccountMenu"
import BannerProfile from "../loaded/BannerProfile"
import EditImage from "../../user/user_Update/EditImage"
import UserLogin from "../../user/UserLogin"
import HistoryHome from "../../info_history/HistoryHome"
import DataRoleUser from "../../user/DataRoleUser"
import UpdateForme from "../loaded/UpdateForme"
import UpdateBec from "../../user/user_Update/UpdateBec"
import RessPassword from "../loaded/RessPassword"

function UserPage() {
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

    fetch("http://192.168.0.236:8000/apilogin/gettoken/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUser(result.userlogin)
      })
      .catch((error) => console.log("error", error))
  }, [user])

  return (
    <div className="w-full">
      <section className="w-full sticky top-0 z-50 h-auto py-3 md:px-6 px-2 bg-sky-500 flex justify-between items-center">
        <MenuUser />
        {/* <button className="py-2 px-10 rounded-md bg-red-500 flex justify-center items-center gap-4  text-white font-medium active:scale-95">
          <AddIcon />
          <span>Stoke</span>
        </button> */}
        <div className="flex justify-center items-center">
          <span className="text-white font-medium">
            {user.FirstName} {user.LastName}
          </span>
          <AccountMenu />
        </div>
      </section>
      <div className="w-full h-auto p-4">
        <Routes>
          <Route path="/manager" element={<Dashboard />} />
          <Route path="/productsale" element={<ProductSale />} />
          <Route path="/bannerprofile" element={<BannerProfile />} />
          <Route path="EditImage/:UserId" element={<EditImage />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="historyhome" element={<HistoryHome />} />
          <Route path="/dataroleuser" element={<DataRoleUser />} />
          <Route path="updateforme/:UserId" element={<UpdateForme />} />
          <Route path="resspassword/:UserName" element={<RessPassword />} />
          <Route path="updatebec/:ProfileId" element={<UpdateBec />} />
        </Routes>
      </div>
    </div>
  )
}

export default UserPage
