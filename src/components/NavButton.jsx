function NavButton({ text, Icon }) {
  return (
    <button className="flex items-center rounded-md px-3 py-2 text-tmd font-semibold text-gray-700 hover:bg-gray-25">
      {Icon && <Icon />}
      <span className={Icon ? "ml-3" : "ml-9"}>{text}</span>
    </button>
  );
}

export default NavButton;
