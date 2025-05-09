import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FormData } from "types/auth";

interface Props {
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInputs = ({ formData, onFormChange }: Props) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Nombre de usuario
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={onFormChange}
          className="w-full px-3 py-2 border border-auth-input-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-auth-input-border bg-auth-input-bg"
          placeholder="ej: silver123"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={onFormChange}
            className="w-full px-3 py-2 border border-auth-input-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-auth-input-border bg-auth-input-bg"
            placeholder={showPassword ? "my-password" : "•••••••••••"}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthInputs;
