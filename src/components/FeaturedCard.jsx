function FeaturedCard() {
  return (
    <div className="rounded-lg bg-gray-50 px-4 py-5">
      <div className="mb-4 grid gap-y-1">
        <span className="text-tsm font-semibold text-gray-900">
          Projeye Katkıda Bulunun
        </span>
        <span className="text-tsm font-regular text-gray-600">
          Bu proje açık kaynaklıdır. Birlikte geliştirmek için katkıda bulunun.
        </span>
      </div>
      <a
        className="text-tsm font-semibold text-primary-700"
        href="https://github.com/pekkiriscim/bookmarks"
        target="_blank"
        rel="noreferrer"
      >
        Katkıda Bulun
      </a>
    </div>
  );
}

export default FeaturedCard;
