import Badge from "./Badge";
import Avatar from "./Avatar";
import { HeartIcon, DeleteIcon } from "./Icons";
import IconButton from "./IconButton";

const badges = [
  { text: "react", color: "#026AA2", backgroundColor: "#F0F9FF" },
  { text: "css", color: "#027A48", backgroundColor: "#ECFDF3" },
  { text: "javascript", color: "#B54708", backgroundColor: "#FFFAEB" },
];

function BookmarkCard() {
  return (
    <div className="bookmark-card flex rounded-2xl p-6 hover:bg-gray-25">
      <div className="mr-6 h-auto w-[10.5rem] min-w-[10.5rem]">
        <img
          className="h-full w-full rounded-lg object-cover"
          src="src/assets/bookmark.svg"
          alt="Bookmark"
        />
      </div>
      <div className="flex w-full flex-col">
        <div className="mb-4 flex items-center">
          {badges.map((badge, index) => {
            return (
              <Badge
                text={badge.text}
                color={badge.color}
                backgroundColor={badge.backgroundColor}
                key={index}
              />
            );
          })}
        </div>
        <span className="mb-2 text-dxs font-semibold text-gray-900">
          Mükemmel yer işareti başlığı.
        </span>
        <span className="mb-6 text-tmd font-regular text-gray-600">
          Mükemmel yer işareti için mükemmel kısa açıklama.
        </span>
        <div className="flex items-center justify-between">
          <Avatar size={2.5} value={"Mükemmel Kullanıcı"} radius={1.25} />
          <div className="grid grid-cols-[auto_auto] gap-x-3">
            <IconButton Icon={DeleteIcon} />
            <IconButton Icon={HeartIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;
