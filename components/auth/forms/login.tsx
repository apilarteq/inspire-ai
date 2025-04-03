import React from "react";
import { toast } from "sonner";
import AuthInputs from "../inputs";
import Checkboxes from "../checkbox";
import AuthButton from "../button";
import AuthFooter from "../footer";
import { LoginFormData } from "types/auth";
import { useModal } from "context/modal";
import { useAuth } from "context/auth";

interface Props {
  handleActiveTab: (tab: "login" | "register") => void;
}

const LoginForm = ({ handleActiveTab }: Props) => {
  const [formData, setFormData] = React.useState<LoginFormData>({
    username: "",
    password: "",
    remember: false,
  });
  const { closeModal } = useModal();
  const { handleLogin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success, error } = await handleLogin(formData);

    if (!success) {
      toast.error(error, { position: "top-center" });
    } else {
      toast.success("Login exitoso", { position: "top-center" });
      closeModal();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-lg px-3">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-[#bfbfbf]">
          Bienvenido de nuevo
        </h2>
        <p className="text-base text-[#aaaaaa]">
          Ingresa tus credenciales para acceder
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInputs formData={formData} onFormChange={handleChange} />
        <Checkboxes checked={formData.remember!} onFormChange={handleChange} />
        <AuthButton>Iniciar sesión</AuthButton>
      </form>

      <AuthFooter
        title="¿No tienes una cuenta?"
        handleActiveTab={() => handleActiveTab("register")}
        buttonLabel="Regístrate"
      />
    </div>
  );
};

export default LoginForm;
