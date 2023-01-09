import * as React from "react"
import Dialog from "@mui/material/Dialog"
import SearchIcon from "@mui/icons-material/Search"
export default function FormDialog() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="border rounded-md group flex justify-between items-center gap-2 py-1 px-4 bg-slate-50 hover:bg-slate-100">
        <SearchIcon className="text-sky-300 group-hover:text-sky-500" />
        <span className="text-gray-400 text-sm">ຄົ້ນຫາ....</span>
      </button>
      <Dialog open={open} onClose={handleClose} className="rounded-md p-2">
        <form className="h-[25rem] bg-slate-100 relative text-sky-300 font-medium border-b-2 rounded-lg overflow-hidden">
          <input
            type="text"
            name="search"
            placeholder="Search here..."
            className="py-4 px-6 placeholder:font-normal placeholder:text-gray-400 w-[40rem] border-none outline-none text-sky-600"
          />

          <div className="absolute bottom-0 left-0 w-full bg-slate-200 h-16 px-4 flex justify-end items-center">
            <button onClick={handleClose} className="font-medium bg-sky-500 hover:scale-110 hover:ease-in hover:duration-200 drop-shadow-md text-white py-2 px-8 rounded-sm">
              Close
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
