function InputField({
  inputID,
  label,
  type,
  hint,
  placeholder,
  min,
  max,
  onChange,
}) {
  return (
    <div className="grid gap-y-1.5">
      <label
        htmlFor={inputID}
        className="text-tsm font-medium text-gray-700 dark:text-white/80"
      >
        {label}
      </label>
      <input
        spellCheck={false}
        autoComplete="off"
        type={type}
        required
        id={inputID}
        placeholder={placeholder}
        minLength={min}
        maxLength={max}
        onChange={onChange}
      />
      {hint && (
        <span className="text-tsm font-regular text-gray-600 dark:text-white/40">
          {hint}
        </span>
      )}
    </div>
  );
}

export default InputField;
