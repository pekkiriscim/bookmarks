import Logomark from "./Logomark";

function ModalHeader({ title, description, avvvatars }) {
  return (
    <div className="grid gap-y-4">
      <Logomark size={3} value={avvvatars && avvvatars} radius={0.5} />
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
