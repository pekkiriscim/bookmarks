import ModalHeader from "./ModalHeader";
import Textarea from "./Textarea";
import InputField from "./InputField";
import ModalButton from "./ModalButton";
import Dropdown from "./Dropdown";

const badges = [
  { text: "react", color: "#026AA2", backgroundColor: "#F0F9FF" },
  { text: "css", color: "#027A48", backgroundColor: "#ECFDF3" },
  { text: "javascript", color: "#B54708", backgroundColor: "#FFFAEB" },
];

function BookmarkModal() {
  return (
    <div className="w-[25rem] rounded-xl bg-white p-6">
      <form onSubmit={null} className="grid gap-y-8">
        <div className="grid gap-y-5">
          <ModalHeader
            title="Yer İşareti Ekleyin"
            description="Yeni bir yer işareti ekleyin ve diğerleriyle paylaşın."
          />
          <div className="grid gap-y-4">
            <Textarea
              inputID={"bookmark-title"}
              label={"Başlık"}
              placeholder={"Başlık giriniz"}
              min={10}
              max={150}
              rows={2}
            />

            <Textarea
              inputID={"bookmark-description"}
              label={"Açıklama"}
              placeholder={"Açıklama giriniz"}
              min={10}
              max={300}
              rows={3}
            />

            <InputField
              inputID="bookmark-url"
              label="URL"
              type="url"
              placeholder="URL giriniz"
              hint={"Örn: https://www.example.com şeklinde bir URL girin."}
            />

            <Dropdown
              text={"Etiket seçiniz"}
              label={"Etiket"}
              hint={"En az bir, en fazla üç etiket seçin."}
              badges={badges}
            />
          </div>
        </div>
        <ModalButton text="Yer İşareti Ekle" isLoading={false} />
      </form>
    </div>
  );
}

export default BookmarkModal;
