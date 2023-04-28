function InputField({ inputID, label, type, hint, placeholder, min }) {
  return (
    <div className="grid gap-y-1.5">
      <label htmlFor={inputID} className="text-tsm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        required
        id={inputID}
        placeholder={placeholder}
        minLength={min}
      />
      {hint && (
        <span className="text-tsm font-regular text-gray-600">{hint}</span>
      )}
    </div>
  );
}

export default InputField;
