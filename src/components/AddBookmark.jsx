import { AddIcon } from "./Icons";

function AddBookmark({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex select-none items-center justify-center whitespace-nowrap rounded-md bg-primary-600 px-4 py-2.5 outline-none hover:bg-primary-600/90 focus:ring-4 focus:ring-primary-100 active:bg-primary-600 active:ring-4 active:ring-primary-100"
    >
      <AddIcon />
      <span className="text-tsm font-semibold text-white">
        Yer İşareti Ekle
      </span>
    </button>
  );
}

export default AddBookmark;
