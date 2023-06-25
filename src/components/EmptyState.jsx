function EmptyState({ title, description }) {
  return (
    <div className="m-auto max-w-[22rem] select-none p-6">
      <div className="mb-5 flex justify-center">
        <svg
          className="inline-block h-12 w-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="inline-block h-12 w-12 fill-primary-50 dark:fill-gray-800/50"
            rx="10"
          />
          <path
            className="stroke-primary-600"
            d="M31 31.2674V19.845C31 17.6415 29.4253 15.7449 27.2391 15.3152C25.1006 14.8949 22.8994 14.8949 20.7609 15.3152C18.5747 15.7449 17 17.6415 17 19.845V31.2674C17 32.6038 18.4675 33.4355 19.6342 32.7604L22.8211 30.9159C23.5492 30.4945 24.4508 30.4945 25.1789 30.9159L28.3658 32.7604C29.5325 33.4355 31 32.6038 31 31.2674Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center text-center">
        <span className="mb-2 text-tlg font-semibold text-gray-900 dark:text-white">
          {title}
        </span>
        <span className="text-tsm font-regular text-gray-600 dark:text-white/70">
          {description}
        </span>
      </div>
    </div>
  );
}

export default EmptyState;
