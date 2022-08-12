function Section({ img, reversed, children }) {
  return (
    <div
      className={`Business-Section Section w-full padding-x flex flex-col items-start row-gap col-gap ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="Business-Section__image flex flex-col items-center row-gap w-full">
        <img src={img} alt="Pickmeup Business" />
      </div>
      <div className="Business-Section__content w-full">{children}</div>
    </div>
  );
}

export default Section;
