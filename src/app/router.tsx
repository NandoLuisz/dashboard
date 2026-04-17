import Dashboard from "@/pages/Dashboard"
import HomeLayout from "@/pages/HomeLayout"
import Orders from "@/pages/Orders"
import { createBrowserRouter } from "react-router"
import Register from "@/pages/Register"
import Stock from "@/pages/Stock"
import Profile from "@/pages/profile/Profile"
import LayoutSign from "@/pages/auth/LayoutSign"
import SignIn from "@/pages/auth/SignIn"
import SignUp from "@/pages/auth/SignUp"

export const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/register", element: <Register /> },
      { path: "/stock", element: <Stock /> },
      { path: "/orders", element: <Orders /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    element: <LayoutSign />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ]
  }
])
