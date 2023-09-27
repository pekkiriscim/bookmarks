function FeaturedCard() {
  return (
    <div className="select-none rounded-lg bg-gray-50 px-4 py-5 hover:bg-gray-100 dark:bg-gray-800/30 dark:hover:bg-gray-800">
      <div className="mb-4 grid gap-y-1">
        <span className="text-tsm font-semibold text-gray-900 dark:text-white">
          Projeye Katkıda Bulunun
        </span>
        <span className="text-tsm font-regular text-gray-600 dark:font-sans dark:text-white/70">
          Bu proje açık kaynaklıdır. Birlikte geliştirmek için katkıda bulunun.
        </span>
      </div>
      <a
        className="text-tsm font-semibold text-primary-700 dark:text-primary-500"
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
