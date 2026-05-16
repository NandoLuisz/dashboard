import { menuFetch, saveToken } from "@/config/axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { EyeOff, Eye } from "lucide-react";
import { Link } from "react-router";
import { z } from "zod";
import { useState } from "react";

const userLoginFormSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
});

type LoginFormFields = z.infer<typeof userLoginFormSchema>;

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const result = userLoginFormSchema.safeParse(data);
    if (!result.success) return console.log("credenciais erradas");

    const { username, password } = data;
    const userLogin = {
      username,
      password,
    };

    try {
      const response = await menuFetch.post(
        "/auth/sign-in",
        JSON.stringify(userLogin),
      );
      if (response.status === 200) {
        const token = response.data.accessToken;
        saveToken(token);
        window.location.href = "/";
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <form
      className="w-[400px] h-full px-6 py-6 flex flex-col gap-6 -mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="rounded px-6 py-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <p>Digite seus dados abaixo</p>
        <div className="w-full flex flex-col gap-2">
          <div
            className="w-full flex justify-center items-center 
                               gap-4 bg-zinc-300 py-2 rounded-md cursor-pointer"
          >
            <FcGoogle className="size-6" />
            <span className="font-semibold">Entrar com Google</span>
          </div>
          <div
            className="w-full flex justify-center items-center 
                               gap-4 bg-zinc-300 py-2 rounded-md cursor-pointer"
          >
            <FaGithub className="size-6" />
            <span className="font-semibold">Entrar com GitHub</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-2">
            <span className="font-semibold">Usuário</span>
            <input
              {...register("username", { required: "Usuário obrigatório" })}
              type="text"
              placeholder="Digite seu usuário"
              className="py-2 px-2 outline-none border-b-[1px] border-zinc-400"
            />
            {errors.username && (
              <span className="text-red-700 text-xs">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <span className="font-semibold">Senha</span>
            <input
              {...register("password", { required: "Senha é obrigatória" })}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Digite sua senha"
              className="py-2 px-2 outline-none border-b-[1px] border-zinc-400"
            />
            <EyeOff
              className={`absolute right-2 top-10 size-5 ${isPasswordVisible ? "hidden" : "block"}`}
              onClick={() => setIsPasswordVisible(true)}
            />
            <Eye
              className={`absolute right-2 top-10 size-5 ${isPasswordVisible ? "block" : "hidden"}`}
              onClick={() => setIsPasswordVisible(false)}
            />
            {errors.password && (
              <span className="text-red-700 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-400 w-[50%] py-1 mb-5"
        >
          esqueci minha senha
        </a>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-full text-white font-semibold 
                        ${isSubmitting ? "bg-orange-500" : "bg-orange-700"} rounded-lg py-2 cursor-pointer`}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
        {errors.root && (
          <span className="text-red-700 text-xs">{errors.root.message}</span>
        )}
      </div>
      <div className="w-full flex justify-center gap-2 -mt-7">
        <span className="text-zinc-500">Ainda não possui conta?</span>
        <Link
          to="/sign-up"
          className="text-zinc-900 font-semibold border-b-2 border-zinc-900"
        >
          Criar
        </Link>
      </div>
    </form>
  );
}
