import { menuFetch } from "@/config/axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { EyeOff, Eye } from "lucide-react";
import { Link } from "react-router";
import { z } from "zod";
import { useState } from "react";

const userRegisterFormSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

type RegisterFormFields = z.infer<typeof userRegisterFormSchema>;

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    defaultValues: {
      email: "teste@email.com",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    const result = userRegisterFormSchema.safeParse(data);
    if (!result.success) return;

    const { username, email, password } = data;
    const userRegister = {
      username,
      password,
      email,
    };

    console.log(userRegister);

    try {
      const response = await menuFetch.post(
        "/auth/sign-up",
        JSON.stringify(userRegister),
      );
      if (response.status === 201) {
        reset();
        window.location.href = "/";
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        const errorMessage = error.response.data;

        if (errorMessage === "User already registered.") {
          setError("username", {
            message: errorMessage,
          });
        } else if (errorMessage === "Email already registered.") {
          setError("email", {
            message: errorMessage,
          });
        }
      } else {
        setError("root", { message: "Erro de conexão com o servidor." });
      }
    }
  };
  return (
    <form
      className="w-[400px] min-h-full px-6 py-6 flex flex-col gap-6 -mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="rounded px-6 py-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Registro</h1>
        <p>Digite seus dados abaixo</p>
        <div className="w-full flex flex-col gap-2">
          <div
            className="w-full flex justify-center items-center 
                                gap-4 bg-zinc-300 py-2 rounded-md cursor-pointer"
          >
            <FcGoogle className="size-6" />
            <span className="font-semibold">Registrar com Google</span>
          </div>
          <div
            className="w-full flex justify-center items-center 
                                gap-4 bg-zinc-300 py-2 rounded-md cursor-pointer"
          >
            <FaGithub className="size-6" />
            <span className="font-semibold">Registrar com GitHub</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="`w-full flex flex-col gap-2">
            <span className="font-semibold">Usuário</span>
            <input
              {...register("username", {
                required: "Usuário obrigatório",
                minLength: {
                  value: 3,
                  message: "Usuário precisa ter no mínimo 6 caracteres",
                },
              })}
              type="text"
              placeholder="Digite seu usuário"
              className="py-2 px-2 border-b-[1px] outline-none border-zinc-400"
            />
            {errors.username && (
              <span className="text-red-700 text-xs">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="font-semibold">Email</span>
            <input
              {...register("email", {
                required: "Email obrigatório!",
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Email precisa ser válido";
                  }
                  return true;
                },
              })}
              type="email"
              placeholder="Digite seu email"
              className="py-2 px-2 border-b-[1px] outline-none border-zinc-400"
            />
            {errors.email && (
              <span className="text-red-700 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <span className="font-semibold">Senha</span>
            <input
              {...register("password", {
                required: "Senha obrigatória",
                minLength: {
                  value: 6,
                  message: "Senha precisa ter no minímo 6 digitos",
                },
              })}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Digite sua senha"
              className="py-2 px-2 border-b-[1px] outline-none border-zinc-400"
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
        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-full text-white font-semibold ${isSubmitting ? "bg-orange-500" : "bg-orange-700"} rounded-lg py-2 cursor-pointer`}
        >
          {isSubmitting ? "Cadastrando..." : "Criar"}
        </button>
        {errors.root && (
          <span className="text-red-700 text-xs">{errors.root.message}</span>
        )}
      </div>
      <div className="w-full flex justify-center gap-2 -mt-7">
        <span className="text-zinc-500">Já possui uma conta?</span>
        <Link
          to="/sign-in"
          className="text-zinc-900 font-semibold border-b-2 border-zinc-900"
        >
          Log in
        </Link>
      </div>
    </form>
  );
}
