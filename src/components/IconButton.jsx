function IconButton({ Icon, onClick }) {
  return (
    <button
      onClick={onClick && onClick}
      className="icon-button hidden h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white p-2.5 outline-none hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 active:bg-white active:ring-4 active:ring-gray-100"
    >
      <Icon />
    </button>
  );
}

export default IconButton;
