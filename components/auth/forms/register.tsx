import React from "react";
import { toast } from "sonner";
import AuthInputs from "../inputs";
import Checkboxes from "../checkbox";
import AuthButton from "../button";
import AuthFooter from "../footer";
import { RegisterFormData } from "types/auth";
import { useModal } from "context/modal";
import { useAuth } from "context/auth";

interface Props {
  handleActiveTab: (tab: "login" | "register") => void;
}

const RegisterForm = ({ handleActiveTab }: Props) => {
  const [formData, setFormData] = React.useState<RegisterFormData>({
    username: "",
    password: "",
    terms: false,
  });
  const { closeModal } = useModal();
  const { handleRegister } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { success, error } = await handleRegister(formData);
      if (!success) {
        toast.error(error);
      } else {
        toast.success("Usuario registrado exitosamente");
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to register");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-3 rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-auth-text-primary">
          Crear una cuenta
        </h2>
        <p className="text-base text-auth-text-secondary">
          ¡Tus chats sin autenticar te esperan por 30 días!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInputs formData={formData} onFormChange={handleChange} />
        <Checkboxes
          checked={formData.terms!}
          onFormChange={handleChange}
          register
        />
        <AuthButton>Registrarse</AuthButton>
      </form>

      <AuthFooter
        title="¿Ya tienes una cuenta?"
        handleActiveTab={() => handleActiveTab("login")}
        buttonLabel="Inicia sesión"
      />
    </div>
  );
};

export default RegisterForm;
