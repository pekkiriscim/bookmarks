import { useState, useContext } from "react";

import Alert from "./Alert";
import InputField from "./InputField";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";

import { motion } from "framer-motion";

import { toast } from "sonner";

import { ModalContext } from "./Dashboard";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function SignUp({ forwardRef }) {
  const [signUp, setSignUp] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { modal, setModal } = useContext(ModalContext);

  const updateDisplayName = async () => {
    await updateProfile(auth.currentUser, {
      displayName: signUp.fullName,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setModal({ ...modal, isLoading: true });

    await createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
      .then(async () => {
        await updateDisplayName();

        setModal({ activeModal: null, isLoading: false });

        toast(
          <Alert
            title={"Merhaba!"}
            description={`Yer işaretlerini paylaşarak diğer kullanıcılarla etkileşimde
        bulunabilir, yeni içerikler keşfedebilir ve birlikte ilham dolu
        bir deneyim yaşayabiliriz!`}
          />
        );
      })
      .catch((error) => {
        setModal({ ...modal, isLoading: false });

        console.log(error);

        toast(
          <Alert
            title={"Oops!"}
            description={`Kayıt olurken bir hata oluştu. ${error.message}`}
          />
        );
      });
  };

  const handleFullName = (e) => {
    setSignUp({ ...signUp, fullName: e.target.value });
  };

  const handleEmail = (e) => {
    setSignUp({ ...signUp, email: e.target.value });
  };

  const handlePassword = (e) => {
    setSignUp({ ...signUp, password: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full max-h-[35.875rem] max-w-[25rem] cursor-auto overflow-auto rounded-xl bg-white p-6 dark:bg-gray-900 max-sm:w-full max-sm:max-w-full"
      ref={forwardRef}
    >
      <form onSubmit={handleSignUp} className="grid gap-y-8">
        <div className="grid gap-y-5">
          <ModalHeader
            title="Hemen kaydol"
            description="Yer işaretlerinizi paylaşın, yeni içerikleri keşfedin ve daha önce hiç olmadığı kadar ilham dolu olun!"
            avvvatars={signUp.fullName}
          />

          <div className="grid gap-y-4">
            <InputField
              inputID="sign-up-full-name"
              label="Ad"
              type="text"
              placeholder="Adınızı giriniz"
              hint="Adınız diğer kullanıcılar tarafından görünecektir."
              min={2}
              max={50}
              onChange={handleFullName}
            />

            <InputField
              inputID="sign-up-email"
              label="E-posta"
              type="email"
              placeholder="E-postanızı giriniz"
              min={5}
              max={255}
              onChange={handleEmail}
            />

            <InputField
              inputID="sign-up-password"
              label="Şifre"
              type="password"
              placeholder="Bir şifre oluşturun"
              hint="Şifreniz en az 6 karakter uzunluğunda olmalıdır."
              min={6}
              max={128}
              onChange={handlePassword}
            />
          </div>
        </div>
        <ModalButton isLoading={modal.isLoading} text="Kaydol" />
      </form>
    </motion.div>
  );
}

export default SignUp;
