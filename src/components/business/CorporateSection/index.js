import { Button } from "components";
import { MdArrowForward } from "react-icons/md";

function CorporateSection() {
  return (
    <div className="Business-Section__content-content flex flex-col flex-start row-gap">
      <div className="titles">
        <h3 className="title tertiary">Corporate business</h3>
        <h1 className="title primary">Employee Transportation</h1>
      </div>
      <p className="text">
        Pickmeup came into existence at the time when ride-hailing services in
        Nigeria had just begun to boom. When we launched in 2018, we had just
        one goal - to build a 21st-century transport company to combat the
        current ride-hailing challenges faced by urban & rural users. Making
        fair, safe, and comfortable rides available to our customers became our
        priority. Over the years, we have grown with operation in seven major
        cities in Nigeria and over a thousand users daily. Our users - drivers
        and customers - enjoy our services which we are constantly improving on.
        Interestingly, we only got started - join us!
      </p>
      <div className="button-wrapper">
        <Button
          type="secondary"
          onClick={() => window.open("https://forms.gle/CuR2rFYMRKVpNEWq5")}
        >
          Join as a corporate partner
          <span>
            <MdArrowForward />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default CorporateSection;
