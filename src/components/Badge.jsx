function Badge({ text, color, backgroundColor }) {
  return (
    <div
      style={{ color: color, backgroundColor: backgroundColor }}
      className="mr-2 inline-block h-6 rounded-2xl px-2.5 py-0.5 text-tsm font-medium last:mr-0"
    >
      {text}
    </div>
  );
}

export default Badge;
