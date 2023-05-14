import { useState, useContext } from "react";

import InputField from "./InputField";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";

import { ModalContext } from "./Dashboard";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function SignUp() {
  const [signUp, setSignUp] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { modal, setModal } = useContext(ModalContext);

  const updateDisplayName = async () => {
    await updateProfile(auth.currentUser, {
      displayName: signUp.fullName,
    })
      .then(() => {
        console.log("Profile updated!");
      })
      .catch((error) => {
        console.log("An error occurred.", error);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setModal({ ...modal, isLoading: true });

    await createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log("Signed in.", user);

        updateDisplayName();

        setModal({ ...modal, isLoading: false });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);

        setModal({ ...modal, isLoading: false });
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
    <div className="w-[25rem] rounded-xl bg-white p-6">
      <form onSubmit={handleSignUp} className="grid gap-y-8">
        <div className="grid gap-y-5">
          <ModalHeader
            title="Hemen Kaydol"
            description="Yer imlerinizi paylaşın, yeni içerikleri keşfedin ve daha önce hiç olmadığı kadar ilham dolu olun!"
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
    </div>
  );
}

export default SignUp;
