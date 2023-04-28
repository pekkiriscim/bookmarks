import InputField from "./InputField";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";

function SignUp() {
  return (
    <div className="w-[25rem] p-6">
      <form className="grid gap-y-8">
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
            />

            <InputField
              inputID="sign-up-email"
              label="E-posta"
              type="email"
              placeholder="E-postanızı giriniz"
            />

            <InputField
              inputID="sign-up-password"
              label="Şifre"
              type="password"
              placeholder="Bir şifre oluşturun"
              hint="Şifreniz en az 6 karakter uzunluğunda olmalıdır."
              min={6}
            />
          </div>
        </div>
        <ModalButton text="Kaydol" />
      </form>
    </div>
  );
}

export default SignUp;
