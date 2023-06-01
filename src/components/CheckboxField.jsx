import { useState } from "react";
import classnames from "classnames";
function CheckboxField({
  inputID,
  label,
  hint,
  checked = false,
  onChange,
}) {

  const [isChecked, setIsChecked] = useState(checked);
  return (
    <div className="grid gap-y-1.5">
      <label htmlFor={inputID} className="text-tsm font-medium text-gray-700">
        {label}
      </label>
      <div
        className={classnames('md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ease-in-out', {
          'bg-primary-700': isChecked,
          'bg-gray-300': !isChecked,
        })}
        onClick={() => {
          setIsChecked(!isChecked);
          onChange(!isChecked);
        }}
      >
        <div
          className={classnames(
            "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform transition duration-300 ease-in-out",
            {
              "transform translate-x-[24.5px]": isChecked,
            })}
        >
        </div>

      </div>

      {
        hint && (
          <span className="text-tsm font-regular text-gray-600">{hint}</span>
        )
      }
    </div >
  );
}

export default CheckboxField;
