import Avvvatars from "avvvatars-react";

function Avatar({ size, value, radius }) {
  return (
    <div className="flex items-center">
      <div>
        <Avvvatars size={size} value={value} radius={radius} style="shape" />
      </div>
      <span className="ml-3 text-tsm font-semibold text-gray-700">{value}</span>
    </div>
  );
}

export default Avatar;
