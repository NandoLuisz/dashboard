import { Outlet } from "react-router";

export default function LayoutSign() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-100 px-5 py-5 font-pattern">
      <div className="w-[30%] min-h-160 shadow-2xl rounded-sm flex px-3 py-3">
        <div className="w-full h-full flex items-start justify-start">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
