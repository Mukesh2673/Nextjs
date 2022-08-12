function GetARide() {
  // img sizes
  const iphone = "/assets/home/get-a-ride/iPhone@3x.png";

  // blue UI Element
  const blueElem = "/assets/home/get-a-ride/UI-Element-Blue.svg";
  // light UI Element
  const lightElem = "/assets/home/get-a-ride/UI-Element-Light.svg";

  // contents
  const content = [
    {
      title: "Book a Ride Now",
      content:
        "The Pickmeup App automatically detects your current location and you can request to be picked up from that location.",
    },
    {
      title: "Schedule a Ride",
      content: `Use the "Ride Later" feature to schedule a future ride. Whether it's later on, on any given day, or a future date.`,
    },
    {
      title: "Pay by Cash or Card",
      content:
        "Ride-shaPickmeup knows that everyone feels different about paying with their cards. That's why Pickmeup gives you a choice of paying with cash or card.",
    },
    {
      title: "Get Discounts on Rides",
      content:
        "Use Promo Codes To Get Trip Discounts. Tap the RIDE NOW or RIDE LATER button. Tap Promo Code. Enter your promo code and tap Apply.",
    },
  ];

  return (
    <div className="GetARide Section w-full">
      <div className="GetARide-content wrapper flex flex-col md:flex-row items-center w-full">
        <div className="GetARide-image w-full">
          <div className="GetARide-image-iphone">
            <img
              src={blueElem}
              alt="Blue Element"
              className="blue elem"
              loading="lazy"
            />
            <img
              src={lightElem}
              alt="Light Element"
              className="light elem"
              loading="lazy"
            />
            <img
              src={iphone}
              alt="iPhone Screen"
              className="iphone"
              loading="lazy"
            />
          </div>
        </div>
        <div className="GetARide-text w-full">
          <div className="GetARide-text-title w-full">
            <h1 className="title primary">How to get a ride</h1>
            <p className="text">
              Pickmeup is a great way to make your travel plans stress-free.
              Request a ride on-demand or schedule one ahead of time.
            </p>
          </div>
          <div className="GetARide-text-content w-full">
            {content.map((item, i) => (
              <div
                className="GetARide-text-content-item flex flex-col items-start row-gap-s"
                key={i}
              >
                <p className="sub-title">{item.title}</p>
                <p className="text">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetARide;
