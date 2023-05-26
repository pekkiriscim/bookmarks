import { useContext } from "react";

import Logomark from "./Logomark";

import { CloseIcon } from "./Icons";

import { ModalContext } from "./Dashboard";

function ModalHeader({ title, description, avvvatars }) {
  const { modal, setModal } = useContext(ModalContext);

  return (
    <div className="grid select-none gap-y-4">
      <div className="flex justify-between">
        <Logomark size={3} value={avvvatars && avvvatars} radius={0.5} />
        <button
          type="button"
          className="ml-auto h-11 w-11 items-center justify-center rounded-lg hover:bg-gray-25 max-xl:flex"
          onClick={(e) => {
            e.preventDefault();

            setModal({ ...modal, activeModal: null });
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="grid gap-y-1">
        <span className="text-tlg font-semibold text-gray-900">{title}</span>
        <span className="text-tsm font-regular text-gray-600">
          {description}
        </span>
      </div>
    </div>
  );
}

export default ModalHeader;
