import { useContext } from "react";

import HeaderButton from "./HeaderButton";
import { PageContext } from "./Dashboard";

function PageHeader() {
  const { page } = useContext(PageContext);

  return (
    <div className="flex items-center justify-between">
      <span className="text-dsm font-semibold">{page}</span>
      <div className="grid grid-cols-2 gap-x-3">
        <HeaderButton text={"Giriş Yap"} isPrimary={false} />
        <HeaderButton text={"Kaydol"} isPrimary={true} />
      </div>
    </div>
  );
}

export default PageHeader;
