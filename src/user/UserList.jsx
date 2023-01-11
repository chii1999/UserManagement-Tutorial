import React from "react"
import DatatableProfile from "./DatatableProfile"
import { motion } from "framer-motion"
// import axios from "axios"

export default function UserList() {
  
  // const [profiledata, setProfiledata] = useState([])

  
  // const getProfile = async () => {
  //   try {
  //     const response = await axios.get("http://192.168.0.12:8000/apiprofile")
  //     setProfiledata(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getProfile()
  // }, [])


  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: -100 }}
      className="lg:pt-0 md:pt-14 sm:pt-14 pt-14 h-screen">
        {/* <div className="w-full bg-white rounded-md p-4 border">
        {profiledata.map((getData, index) => (
          <div key={index} className="flex gap-4 justify-start items-center w-full my-2">
             <img src={`/apiprofile/${getData.Img}`} alt="pic" className="w-16 h-16 shadow-md rounded-full object-cover" />
             <span className="w-32">{getData.FirstName} {getData.LastName}</span>
             <span className="w-20">{getData.Gender}</span>
             <span className="w-32">{getData.Dob}</span>
             <span className="w-32">{getData.VillageName}</span>
             <span className="w-32">{getData.DistrictName}</span>
             <span className="w-32">{getData.ProvinceName}</span>
          </div>
        ))}
        </div> */}
      <DatatableProfile className="bg-white rounded-lg" />
    </motion.div>
  )
}
