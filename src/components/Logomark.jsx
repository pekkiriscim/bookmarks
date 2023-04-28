import Avvvatars from "avvvatars-react";

function Logomark({ size, value, radius }) {
  return (
    <div style={{ width: `${size}rem`, height: `${size}rem` }}>
      {value && value !== "" ? (
        <Avvvatars value={value} size={size} radius={radius} style="shape" />
      ) : (
        <div
          className="flex items-center justify-center bg-primary-700"
          style={{
            width: `${size}rem`,
            height: `${size}rem`,
            borderRadius: `${radius}rem`,
          }}
        >
          <svg
            width={`${size / 2}rem`}
            height={`${size / 2}rem`}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-white"
              d="M5.30838 0.269072C7.08705 -0.0896907 8.91794 -0.0896907 10.6966 0.269072C12.7475 0.682746 14.2247 2.50872 14.2247 4.63017V13.8926C14.2247 15.5181 12.4854 16.5298 11.1028 15.7085L8.58466 14.2129C8.22509 13.9993 7.7799 13.9993 7.42033 14.2129L4.90224 15.7085C3.51956 16.5298 1.78027 15.5181 1.78027 13.8926V4.63016C1.78027 2.50872 3.25748 0.682746 5.30838 0.269072Z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default Logomark;
