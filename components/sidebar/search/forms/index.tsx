import React from "react";
import { toast } from "sonner";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SearchChatList from "./list";
import SearchInput from "./input";
import useDebounce from "hooks/useDebounce";
import { searchChats } from "utils/api";
import { useGlobal } from "context/global";
import { useModal } from "context/modal";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { filterChats, addChats } = useGlobal();
  const { closeModal } = useModal();

  React.useEffect(() => {
    if (searchTerm.length > 0) setLoading(true);
  }, [searchTerm]);

  React.useEffect(() => {
    if (debouncedSearchTerm.length === 0) return;

    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleSearch = React.useCallback(
    async (value: string) => {
      try {
        const res = await searchChats(value);

        if (!res) return;

        addChats(res.chats);
      } catch (error) {
        console.log(error);
        toast.error("Failed to search chats");
      } finally {
        setLoading(false);
      }
    },
    [addChats]
  );

  return (
    <div className="relative rounded-lg shadow-xl w-full  flex flex-col">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Chats
        </h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="overflow-y-auto flex-grow">
        <h3 className="px-4 pt-2 pb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          Chats recientes
        </h3>

        <SearchChatList
          filteredChats={filterChats(searchTerm)}
          loading={loading}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default SearchForm;
