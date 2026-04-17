import { Star } from "lucide-react";

interface ReviewProps {
  quantity: number;
}

export default function Review({ quantity }: ReviewProps) {
  return (
    <div className="w-45.5 flex flex-col bg-orange-400 px-2 py-2 rounded-xl gap-1">
      <span className="font-semibold">Adorei, o hambuguer estava delicioso</span>
      <span className="text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut reiciendis
      </span>

      <div className="flex">
        {Array.from({ length: quantity }).map((_, index) => (
          <Star key={index} className="fill-current text-yellow-300"/>
        ))}
      </div>

      <div className="flex gap-2 text-xs items-center text-zinc-700">
        <img
          src="https://github.com/NandoLuisz.png"
          alt="Foto de perfil do GitHub"
          className="w-8 h-8 rounded-full"
        />
        <span>Nando S.</span>
      </div>
    </div>
  );
}