import React, { useEffect, useState } from "react"
import "../../App.css"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

export default function ProductSale() {
  const retail = <span>ຂາຍຍ່ອຍ</span>
  const wholesale = <span>ຂາຍສົ່ງ</span>
  const discount = <span>ສ່ວນຫຼຸດ:</span>
  const total = <span>ເງິນລວມທີຕ້ອງຈ່າຍ:</span>
  const saveProducts = <span>ຊຳລະເງິນ</span>

  const [count, setCount] = useState(0)
  const inc = () => {
    setCount(count + 1)
  }
  const dec = () => {
    setCount(count - 1)
  }

  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    UserGet()
  }, [])

  const UserGet = () => {
    fetch("http://192.168.0.236:8000/apiprofile")
      .then((res) => res.json())
      .then((result) => {
        setItems(result)
      })
  }

  return (
    <div className="w-full h-auto bg-white rounded-md p-2 md:block hidden">
      <div className="flex justify-center items-start gap-2">
        <div className="w-[70%] h-auto rounded-md bg-white">
          <head className="w-full py-2 px-4 flex justify-between items-center">
            <div className="flex justify-center items-start w-[70%]">
              <select className="p-2 w-42 border outline-none text-md font-normal rounded-tl-md rounded-bl-md bg-gray-100 text-gray-500">
                <option value="">--ເລືອກປະເພດ--</option>
                <option value="">Technology</option>
                <option value="">Furniture</option>
              </select>
              <div className="relative w-[70%]">
                <SearchIcon className=" absolute top-3 right-3 text-gray-500" />
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="ຄົ້ນຫາສິນຄ້າ..."
                  className=" w-full pl-8 p-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal rounded-tr-md rounded-br-md border border-l-none outline-none text-lg font-medium text-sky-500"
                />
              </div>
            </div>
            <div className="flex justify-center-items-center gap-4">
              <button className="py-2 px-8 border rounded-md bg-gray-300 text-gray-500 font-medium active:scale-95">
                {retail}
              </button>
              <button className="py-2 px-8 border rounded-md bg-gray-300 text-gray-500 font-medium active:scale-95">
                {wholesale}
              </button>
            </div>
          </head>

          <div
            id="scrollProduct"
            className="w-full h-[77vh] p-4 rounded-sm overflow-hidden overflow-y-auto">
            <div className="w-full h-auto grid grid-cols-4 gap-6">
              {items
                .filter((users) =>
                  users.FirstName.toLowerCase().includes(query)
                )
                .map((rows, index) => (
                  <div
                    key={index}
                    className="w-52 h-58 bg-slate-50 shadow-lg border rounded-md p-2 cursor-pointer active:scale-95">
                    <img
                      className="w-full h-[8.75rem] object-cover"
                      src={`http://192.168.0.236:8000/apiprofile/${rows.Img}`}
                      alt="product"
                    />
                    <div className="flex flex-col justify-center items-star pt-4">
                      <h4 className="text-green-500 font-medium">
                        {rows.FirstName}
                      </h4>
                      <h1 className="text-red-500 font-medium text-xl">
                        ₭ 6,000
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="w-[30%] h-auto rounded-md bg-white border p-2">
          <div className="w-full h-auto">
            <div className="flex flex-col justify-start items-start">
              <label className="font-medium text-gray-400">{discount}</label>
              <input
                type="number"
                className="py-2 px-4 font-medium w-full rounded-md border border-l border-l-green-500 outline-none"
              />
            </div>
            <div className="flex flex-col justify-start items-start mt-2">
              <label className="font-medium text-gray-400">{total}</label>
              <input
                type="text"
                value="2,500,000"
                readOnly
                className="py-3 px-4 text-2xl font-medium w-full rounded-md bg-gray-100 border border-l-2 text-sky-500  border-l-sky-500 outline-none"
              />
            </div>

            <button className="py-3 px-8 mt-6 w-full rounded-sm text-white bg-sky-500 hover:bg-sky-600 font-medium shadow-md active:scale-95 text-center">
              {saveProducts}
            </button>
          </div>

          <div className="w-full h-52 mt-6">
            <div className="relative w-full py-3 px-2 h-auto flex justify-between items-center gap-2 bg-gray-100 shadow-md">
              {/* <div className="absolute right-[50%] -top-3 w-7 h-7 flex justify-center items-center rounded-full bg-red-400 text-white cursor-pointer">
                <ClearIcon sx={{ fontSize: 18 }} />
              </div> */}

              <div className="flex flex-col justify-start items-start w-30">
                <span>1. Sponsort</span>
                <h3 className="font-medium text-orange-500 pl-4">15,000 ₭</h3>
              </div>

              <div className="w-[12vw] h-14 flex justify-center items-center gap-1">
                <div
                  onClick={dec}
                  className="w-10 h-10 rounded-full flex justify-center bg-sky-500 items-center text-white cursor-pointer active:scale-95">
                  <RemoveIcon />
                </div>
                <div className="w-16 h-10 bg-white border flex justify-center items-center rounded-sm text-xl">
                  {count < 0 ? (
                    <span className="text-red-500 font-medium">{count}</span>
                  ) : count === 0 ? (
                    <span className="text-green-500 font-bold">{count}</span>
                  ) : (
                    <span className="text-sky-500 font-medium">{count}</span>
                  )}
                </div>
                <div
                  onClick={inc}
                  className="w-10 h-10 rounded-full flex justify-center bg-sky-500 items-center text-white cursor-pointer active:scale-95">
                  <AddIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
