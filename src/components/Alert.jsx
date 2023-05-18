function Alert({ title, description }) {
  return (
    <div className="flex flex-col">
      <span className="mb-1 text-tsm font-semibold text-gray-900">{title}</span>
      <span className="text-tsm font-regular text-gray-600">{description}</span>
    </div>
  );
}

export default Alert;
