import * as React from "react"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"

export default function LinearIndeterminate() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-4">
      <div className="flex  justify-center items-center">
        <span className="md:text-2xl sm:text-xl font-bold text-sky-500 uppercase">
          l
        </span>
        <span className="md:text-2xl sm:text-xl font-bold text-red-500 uppercase">
          o
        </span>
        <span className="md:text-2xl sm:text-xl font-bold text-green-500 uppercase">
          a
        </span>
        <span className="md:text-2xl sm:text-xl font-bold text-pink-500 uppercase">
          d
        </span>
        <span className="md:text-2xl sm:text-xl font-bold text-orange-500 uppercase">
          ing...
        </span>
      </div>
      <LinearProgress
        color="info"
        sx={{ height: 8 }}
        className="rounded-full md:w-[30rem] w-[20rem]"
      />
    </div>
  )
}
