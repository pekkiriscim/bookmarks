import { useState, useContext } from "react";

import ModalHeader from "./ModalHeader";
import InputField from "./InputField";
import ModalButton from "./ModalButton";

import { toast } from "sonner";

import { ModalContext } from "./Dashboard";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const { modal, setModal } = useContext(ModalContext);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setModal({ ...modal, isLoading: true });

    await signInWithEmailAndPassword(auth, signIn.email, signIn.password)
      .then(() => {
        setModal({ activeModal: null, isLoading: false });

        toast(
          <div className="flex flex-col">
            <span className="mb-1 text-tsm font-semibold text-gray-900">
              Hey!
            </span>
            <span className="text-tsm font-regular text-gray-600">
              Seni burada tekrar görmek harika!
            </span>
          </div>
        );
      })
      .catch((error) => {
        setModal({ ...modal, isLoading: false });

        console.log(error);

        toast(
          <div className="flex flex-col">
            <span className="mb-1 text-tsm font-semibold text-gray-900">
              Oops!
            </span>
            <span className="text-tsm font-regular text-gray-600">
              Giriş yaparken bir hata oluştu. {error.message}
            </span>
          </div>
        );
      });
  };

  const handleEmail = (e) => {
    setSignIn({ ...signIn, email: e.target.value });
  };

  const handlePassword = (e) => {
    setSignIn({ ...signIn, password: e.target.value });
  };

  return (
    <div className="w-[25rem] rounded-xl bg-white p-6">
      <form onSubmit={handleSignIn} className="grid gap-y-8">
        <div className="grid gap-y-5">
          <ModalHeader
            title="Hoş Geldiniz!"
            description="Hesabınıza giriş yapın ve yer imlerinizi görüntüleyin, diğer kullanıcılarla paylaşın veya yeni içerikleri keşfedin."
          />

          <div className="grid gap-y-4">
            <InputField
              inputID="sign-in-email"
              label="E-posta"
              type="email"
              placeholder="E-postanızı giriniz"
              min={5}
              max={255}
              onChange={handleEmail}
            />

            <InputField
              inputID="sign-in-password"
              label="Şifre"
              type="password"
              placeholder="Şifrenizi giriniz"
              min={6}
              max={128}
              onChange={handlePassword}
            />
          </div>
        </div>
        <ModalButton isLoading={modal.isLoading} text="Giriş Yap" />
      </form>
    </div>
  );
}

export default SignIn;
