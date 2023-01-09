import * as React from "react"
import Skeleton from "@mui/material/Skeleton"

export default function Variants() {
  return (
    <div className="md:flex flex-col gap-4 justify-center items-center w-full h-screen">
      <div className="md:flex gap-4">
        <Skeleton variant="rounded" width={310} sx={{ height: "30vh" }} />
        <Skeleton variant="rounded" width={310} sx={{ height: "30vh" }} />
      </div>
      <div className="md:flex gap-4">
        <Skeleton variant="rounded" width={310} sx={{ height: "30vh" }} />
        <Skeleton variant="rounded" width={310} sx={{ height: "30vh" }} />
      </div>
    </div>
  )
}
