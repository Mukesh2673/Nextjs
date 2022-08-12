function SectionContent({ firstCity, secondCity }) {
  return (
    <div className="Cities-Section__content-content">
      {firstCity && (
        <>
          <h5 className="title tertiary">{firstCity?.attributes?.name}</h5>
          <p className="text">{firstCity?.attributes?.description}</p>
        </>
      )}
      <div className="line"></div>
      {secondCity && (
        <>
          <h5 className="title tertiary">{secondCity?.attributes?.name}</h5>
          <p className="text">{secondCity?.attributes?.description}</p>
        </>
      )}
      <div className="line"></div>
    </div>
  );
}

export default SectionContent;
