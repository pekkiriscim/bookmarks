import { LoadingIcon } from "./Icons";

function ModalButton({ text, isLoading }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="h-11 rounded-lg bg-primary-600 px-[1.125rem] py-2.5 text-tmd font-semibold text-white outline-none hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 active:bg-primary-600 active:ring-4 active:ring-primary-100"
    >
      {isLoading ? <LoadingIcon light={true} /> : text}
    </button>
  );
}

export default ModalButton;
