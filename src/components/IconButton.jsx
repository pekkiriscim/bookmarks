import { LoadingIcon } from "./Icons";

function IconButton({ Icon, onClick, isLoading }) {
  return (
    <button
      onClick={onClick && onClick}
      disabled={isLoading}
      className="icon-button hidden h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white p-2.5 outline-none hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 active:bg-white active:ring-4 active:ring-gray-100"
    >
      {isLoading ? <LoadingIcon /> : <Icon />}
    </button>
  );
}

export default IconButton;
