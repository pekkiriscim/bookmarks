import { useState, useContext } from "react";

import Alert from "./Alert";
import ModalHeader from "./ModalHeader";
import InputField from "./InputField";
import ModalButton from "./ModalButton";

import { motion } from "framer-motion";

import { toast } from "sonner";

import { ModalContext } from "./Dashboard";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn({ forwardRef }) {
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
          <Alert
            title={"Hey!"}
            description={"Seni burada tekrar görmek harika!"}
          />
        );
      })
      .catch((error) => {
        setModal({ ...modal, isLoading: false });

        console.log(error);

        toast(
          <Alert
            title={"Oops!"}
            description={`Giriş yaparken bir hata oluştu. ${error.message}`}
          />
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full max-h-[28.5rem] max-w-[25rem] cursor-auto overflow-auto rounded-xl bg-white p-6 max-sm:w-full max-sm:max-w-full"
      ref={forwardRef}
    >
      <form onSubmit={handleSignIn} className="grid gap-y-8">
        <div className="grid gap-y-5">
          <ModalHeader
            title="Hoş Geldiniz!"
            description="Hesabınıza giriş yapın ve yer işaretlerinizi görüntüleyin, diğer kullanıcılarla paylaşın veya yeni içerikleri keşfedin."
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
    </motion.div>
  );
}

export default SignIn;
