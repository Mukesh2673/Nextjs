function Car({ carMoving }) {
  return (
    <div className={`Info-car absolute ${carMoving ? "moving" : ""}`}>
      <img
        src="/assets/home/info/car/front_light.png"
        className="light absolute covered-img"
        alt="Light"
        loading="lazy"
      />
      <img
        src="/assets/home/info/car/car.png"
        className="car absolute covered-img"
        alt="Car"
        loading="lazy"
      />
      <img
        src="/assets/home/info/car/front_tire.png"
        className="front tire absolute covered-img"
        alt="Front Tire"
        loading="lazy"
      />
      <img
        src="/assets/home/info/car/back_tire.png"
        className="back tire absolute covered-img"
        alt="Back Tire"
        loading="lazy"
      />
    </div>
  );
}

export default Car;
