function Section({ imgs, reversed, children }) {
  return (
    <div
      className={`Cities-Section Section w-full padding-x flex flex-col  items-center col-gap my-4 md:my-16 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="Cities-Section__image flex flex-col items-center  w-full">
        {imgs.map((img, i) => (
          <img src={img} key={i} alt="Pickmeup Cities" />
        ))}
      </div>
      <div className="Cities-Section__content w-full">{children}</div>
    </div>
  );
}

export default Section;
