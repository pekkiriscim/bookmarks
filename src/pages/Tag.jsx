import { useState, useEffect } from "react";

import BookmarkCard from "../components/BookmarkCard";
import EmptyState from "../components/EmptyState";

import { LoadingIcon } from "../components/Icons";

import { database } from "../firebase";
import {
  query,
  ref,
  orderByChild,
  equalTo,
  onValue,
  off,
} from "firebase/database";

function Tag({ tag }) {
  const [isTagLoading, setIsTagLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState();

  useEffect(() => {
    const bookmarksRef = query(
      ref(database, "bookmarks"),
      orderByChild("tag"),
      equalTo(tag)
    );

    onValue(bookmarksRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data !== null) {
        const bookmarkArray = Object.values(data);
        bookmarkArray.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        setBookmarks(bookmarkArray);

        setIsTagLoading(false);
      } else {
        setBookmarks(false);

        setIsTagLoading(false);
      }
    });

    return () => {
      off(bookmarksRef);
    };
  }, [tag]);

  return (
    <div className="grid gap-x-4 gap-y-4">
      {isTagLoading ? (
        <div className="m-auto">
          <LoadingIcon />
        </div>
      ) : bookmarks === false ? (
        <EmptyState
          title={`${tag} Etiketi İçin Yolculuk Başlasın!`}
          description={`Bu alanda henüz hiçbir ${tag} etiketli yer işareti bulunmuyor. Paylaşmak için hemen bir tane ekleyebilirsiniz.`}
        />
      ) : (
        bookmarks.map((bookmark) => {
          if (bookmark.id) {
            return <BookmarkCard key={bookmark.id} bookmark={bookmark} />;
          }
        })
      )}
    </div>
  );
}

export default Tag;
