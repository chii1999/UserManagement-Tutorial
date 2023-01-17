import * as React  from "react"
import ProvinceInfo from "./ProvinceInfo"
import Box from "@mui/material/Box"
// import Button from "@mui/material/Button"
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
// import { useNavigate } from "react-router-dom"
// import swal from "sweetalert"

export default function Province() {

  // const [validation, validationchange] = useState(false);
  // const [ProvinceName, ProvinceNamechange] = useState('');
  // const [document, Documentchange] = useState('');
  
  // const createProvince=(e) => {
  //   e.preventDefault();
  //   const empdata ={ProvinceName, document};

  //   fetch("http://192.168.0.236:8000/apiprovince/create", {
  //     method: "POST",
  //     headers: {'Content-Type':'application/json'},
  //     body:JSON.stringify(empdata)
  //   }).then((res)=> {
  //       swal({
  //         title: "Successfully",
  //         text: "ບັນທຶກຂໍ້ມູນແຂວງສຳແລັດ",
  //         icon: "success",
  //         button: "OK",
  //       })
  //   }).catch((err) => {
  //     console.log(err.message)
  //   })

  // }

  // const [enable, setEnable] = useState(true)
  // const handleKey = ()=>{
  //   setEnable(false)
  // }
  
  return (
    <div className="lg:pt-0 md:pt-14 sm:pt-14 pt-14">
      {/* <div className="w-full py-2 px-4 rounded-sm bg-slate-50 mb-4 -mt-2">
        <form
          onSubmit={createProvince}
          className="flex justify-between items-center gap-2 relative">
          <input
            onChange={(e) => ProvinceNamechange(e.target.value)}
            value={ProvinceName}
            onKeyDown={handleKey}
            type="text"
            placeholder="ເພິ່ມແຂວງ...."
            required
            className="w-full py-2 placeholder:text-gray-400 placeholder:font-normal focus:outline-1 focus:outline-sky-300 px-4 border rounded-md text-sky-400 font-semibold"
          />
          <Button
            size="large"
            variant="contained"
            color="info"
            type="submit"
            disabled={enable}
            className="active:scale-90 md:mt-0 mt-8 md:w-[20rem] sm:w-auto">
            <span className="mr-2">ເພິ່ມແຂວງ</span>
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </form>
      </div> */}
      <Box className="mt-4">
        <ProvinceInfo />
      </Box>
    </div>
  )
}
