import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useModal } from "context/modal";
import { deleteChat } from "utils/api";
import { revalidate } from "utils/lib/revalidation";
import { SelectedChat } from "types/chat";

interface Props {
  chat: SelectedChat;
  currentChatUuid: string | null;
}

const DeleteChatForm = ({ chat, currentChatUuid }: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { closeModal } = useModal();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const success = await deleteChat(chat._id);

      if (!success) {
        toast.error("Failed to delete chat");
        return;
      }

      toast.success("Chat deleted successfully");
      revalidate("/");
      if (chat._id === currentChatUuid) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete chat");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <div className="w-full rounded-xl shadow-xl overflow-hidden border border-gray-700 text-white">
      <div className="p-5 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-full">
            <InformationCircleIcon className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Confirmar eliminación
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-gray-300 leading-relaxed">
          ¿Estás seguro que deseas eliminar{" "}
          <span className="font-semibold text-white">{chat.title}</span>?
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Esta acción no se puede deshacer y todos los datos asociados serán
          eliminados permanentemente.
        </p>
      </div>

      <div className="p-5 bg-gray-800/30 flex justify-end gap-3">
        <button
          onClick={closeModal}
          disabled={loading}
          className="px-4 py-2.5 text-sm font-medium text-gray-300 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#18181b] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#18181b] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <TrashIcon className="h-5 w-5 text-white" />
          )}
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default DeleteChatForm;
