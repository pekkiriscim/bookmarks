import { useContext } from "react";

import HeaderButton from "./HeaderButton";

import { PageContext, ModalContext, AuthStateContext } from "./Dashboard";

function PageHeader() {
  const { page } = useContext(PageContext);
  const { modal, setModal } = useContext(ModalContext);
  const { authState } = useContext(AuthStateContext);

  return (
    <div className="mb-8 flex items-center justify-between">
      <span className="text-dsm font-semibold">{page}</span>
      {!(authState.isLoggedIn && authState.activeUser) && (
        <div className="grid grid-cols-2 gap-x-3">
          <HeaderButton
            text={"Giriş Yap"}
            isPrimary={false}
            onClick={() => {
              setModal({ ...modal, activeModal: "signIn" });
            }}
          />
          <HeaderButton
            text={"Kaydol"}
            isPrimary={true}
            onClick={() => {
              setModal({ ...modal, activeModal: "signUp" });
            }}
          />
        </div>
      )}
    </div>
  );
}

export default PageHeader;
