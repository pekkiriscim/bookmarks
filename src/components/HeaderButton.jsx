function HeaderButton({ text, isPrimary, onClick }) {
  return (
    <button
      onClick={onClick && onClick}
      className={`flex h-10 items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-tsm font-semibold outline-none focus:ring-4 active:ring-4 ${
        isPrimary
          ? "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-100 active:bg-primary-600 active:ring-primary-100"
          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-100 active:bg-white active:ring-gray-100"
      } `}
    >
      {text}
    </button>
  );
}

export default HeaderButton;
