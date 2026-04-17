import { useEffect, useState } from "react"

interface ToastProp {
  text: string
  duration?: number
  color?: string
}

export function Toast({ text, duration = 5000, color = "green" }: ToastProp) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timeout)
  }, [duration])

  if (!visible) return null

  const progressBarClass = `bg-${color}-700`
  console.log(progressBarClass)

  return (
    <div
      className={`w-87.5 bg-white h-16 flex items-center justify-center shadow-toastShadow rounded-sm
                        fixed bottom-10 right-10 ${visible ? "animate-slideInRight" : "animate-fadeOut"} z-20 max-md:hidden`}
    >
      <h1>{text}</h1>
      <div
        className={`absolute bottom-0 left-0 h-1 ${color === "green" ? "bg-green-500" : null} 
            ${color === "yellow" ? "bg-yellow-500" : null} ${color === "red" ? "bg-red-500" : null}
            animate-progressBar`}
      ></div>
    </div>
  )
}
