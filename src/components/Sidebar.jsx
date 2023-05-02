import Avatar from "./Avatar";
import NavButton from "./NavButton";
import {
  ExploreIcon,
  BookmarksIcon,
  FavoritesIcon,
  SignOutIcon,
} from "./Icons";

const tags = ["react", "node-js", "javascript", "css", "html", "typescript"];

function Sidebar() {
  return (
    <div className="flex flex-col justify-between border-r border-gray-200">
      <div className="grid gap-y-6 pt-8">
        <div className=" pl-6">
          <Avatar size={2.5} value={"John Doe"} radius={0.5} />
        </div>
        <div className="grid gap-y-1 px-4">
          <NavButton Icon={ExploreIcon} text="Keşfet" route="explore" />
          {tags.map((tag, index) => {
            return <NavButton text={tag} key={index} route={tag} />;
          })}
          <NavButton
            Icon={BookmarksIcon}
            text="Yer İşaretleri"
            route="bookmarks"
          />
          <NavButton Icon={FavoritesIcon} text="Favoriler" route="favorites" />
        </div>
      </div>
      <div className="grid px-4 pb-8">
        <NavButton Icon={SignOutIcon} text={"Çıkış Yap"} />
      </div>
    </div>
  );
}

export default Sidebar;
