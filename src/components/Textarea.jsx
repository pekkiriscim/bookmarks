function Textarea({
  inputID,
  label,
  hint,
  placeholder,
  min,
  max,
  onChange,
  rows,
}) {
  return (
    <div className="grid gap-y-1.5">
      <label
        htmlFor={inputID}
        className="text-tsm font-medium text-gray-700 dark:text-white"
      >
        {label}
      </label>
      <textarea
        autoComplete="off"
        spellCheck={false}
        required
        id={inputID}
        placeholder={placeholder}
        minLength={min}
        maxLength={max}
        onChange={onChange}
        rows={rows}
      ></textarea>
      {hint && (
        <span className="text-tsm font-regular text-gray-600">{hint}</span>
      )}
    </div>
  );
}

export default Textarea;
