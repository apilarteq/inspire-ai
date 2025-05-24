import React from "react";

interface Props {
  checked: boolean;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: boolean;
}

const Checkboxes = ({ checked, onFormChange, register = false }: Props) => {
  return register ? (
    <div className="flex items-center">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        required
        checked={checked}
        onChange={onFormChange}
        className="h-4 w-4 accent-secondary cursor-pointer rounded"
      />
      <label
        htmlFor="terms"
        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
      >
        Acepto los{" "}
        <a
          href="#"
          className="font-medium text-secondary hover:text-secondary-hover"
        >
          términos y condiciones
        </a>
      </label>
    </div>
  ) : (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          className="h-4 w-4 rounded accent-secondary cursor-pointer"
          checked={checked}
          onChange={onFormChange}
        />
        <label
          htmlFor="remember"
          className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
        >
          Recordarme
        </label>
      </div>

      {/* <div className="text-sm">
        <a
          href="#"
          className="font-medium text-secondary hover:text-secondary-hover cursor-pointer"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div> */}
    </div>
  );
};

export default Checkboxes;
