import { Search } from "lucide-react"
import { useState } from "react"

import { User, LogOut } from 'lucide-react';
import { NavLink } from "react-router";

export default function Header() {
  const [modalProfile, setModalProfile] = useState<boolean>(false)
  return (
    <div className="w-full h-[10vh] flex justify-between items-start relative">
      {modalProfile && (
        <div className="absolute w-40 h-auto bg-white border border-amber-200 flex flex-col items-start justify-center gap-2 p-2 right-0 top-15 rounded shadow-md
                before:content-[''] before:absolute before:-top-2 before:right-4 
                before:w-4 before:h-4 before:bg-white before:border-t before:border-l 
                before:border-amber-200 before:rotate-45">
          <NavLink to="/profile">
            <div className="w-full flex gap-2 text-sm items-center hover:text-zinc-500 cursor-pointer">
              <User className="size-4"/>
              <span>Conta</span>
            </div>
          </NavLink>
          <div className="w-full flex gap-2 text-sm items-center hover:text-red-700 cursor-pointer">
            <LogOut className="size-4"/>
            <span>Log out</span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between border rounded-3xl bg-zinc-200 gap-2 text-amber-950 px-2 py-2">
        <Search />
        <input placeholder="Pesquisar..." className="outline-none"></input>
      </div>
      <div 
        className="flex items-center justify-center bg-amber-200 
                    rounded-full gap-2 text-amber-950 cursor-pointer"
                    onClick={() => setModalProfile(!modalProfile)}>
        <img
          src="https://github.com/NandoLuisz.png"
          alt="Foto de perfil do GitHub"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col pr-4">
          <span className="text-sm">Bem-vindo</span>
          <span className="font-semibold">Luis Fernando</span>
        </div>
      </div>
    </div>
  )
}
