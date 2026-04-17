import { Outlet } from "react-router"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

export default function HomeLayout() {
  return (
    <div className="w-full h-screen bg-zinc-100 flex px-5 py-5 font-pattern">
      <Sidebar />

      <div className="flex-1 flex flex-col px-5">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
