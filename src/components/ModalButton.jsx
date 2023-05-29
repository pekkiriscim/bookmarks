import { LoadingIcon } from "./Icons";

function ModalButton({ text, isLoading, danger }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`h-11 select-none rounded-lg px-[1.125rem] py-2.5 text-tmd font-semibold text-white outline-none focus:ring-4 active:ring-4 ${
        danger
          ? "bg-danger-600 hover:bg-danger-700 focus:ring-danger-100 active:bg-danger-600 active:ring-danger-100"
          : "bg-primary-600 hover:bg-primary-700 focus:ring-primary-100 active:bg-primary-600 active:ring-primary-100"
      }`}
    >
      {isLoading ? <LoadingIcon light={true} /> : text}
    </button>
  );
}

export default ModalButton;
