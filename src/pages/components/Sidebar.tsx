import { LayoutDashboard, ScrollText, Menu, SquarePen } from "lucide-react"
import { NavLink } from "react-router"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Pedidos", icon: ScrollText, to: "/orders" },
  { label: "Registros", icon: Menu, to: "/register" },
  { label: "Estoque", icon: SquarePen, to: "/stock" },
]

export default function Sidebar() {
  return (
    <nav className="w-70 h-full flex flex-col py-10 gap-10 bg-amber-950 rounded-2xl px-2">
      <h2 className="text-white px-4 text-3xl">NFL's Menu</h2>

      <ul className="w-full flex flex-col gap-2 h-screen items-center px-3">
        {menuItems.map(({ label, icon: Icon, to }) => (
          <li key={label} className="w-full">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `
                w-full px-4 py-2
                flex items-center gap-2
                rounded-sm
                transition-all duration-200
                ${
                  isActive
                    ? "bg-orange-400 text-white shadow-lg scale-105"
                    : "bg-orange-700 text-white hover:bg-orange-400 hover:scale-105 hover:shadow-lg"
                }
              `
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
