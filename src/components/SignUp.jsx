import { useState, createContext } from "react";

import InputField from "./InputField";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export const SignUpContext = createContext(null);

function SignUp() {
  const [signUp, setSignUp] = useState({
    fullName: "",
    email: "",
    password: "",
    isLoading: false,
  });

  const writeUserData = async (userId, fullName) => {
    const db = getDatabase();

    await set(ref(db, "users/" + userId), {
      fullName: fullName,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSignUp({ ...signUp, isLoading: true });

    await createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
      .then((userCredential) => {
        const user = userCredential.user;

        writeUserData(user.uid, signUp.fullName);

        setSignUp({ ...signUp, isLoading: false });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);

        setSignUp({ ...signUp, isLoading: false });
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
    <SignUpContext.Provider value={{ state: signUp, setState: setSignUp }}>
      <div className="w-[25rem] p-6">
        <form onSubmit={handleSubmit} className="grid gap-y-8">
          <div className="grid gap-y-5">
            <ModalHeader
              title="Hemen Kaydol"
              description="Yer imlerinizi paylaşın, yeni içerikleri keşfedin ve daha önce hiç olmadığı kadar ilham dolu olun!"
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
          <ModalButton isLoading={signUp.isLoading} text="Kaydol" />
        </form>
      </div>
    </SignUpContext.Provider>
  );
}

export default SignUp;
