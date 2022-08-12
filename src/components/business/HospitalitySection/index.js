import { Button } from "components";
import { MdArrowForward } from "react-icons/md";

function CorporateSection() {
  return (
    <div className="Business-Section__content-content flex flex-col flex-start row-gap">
      <div className="titles">
        <h3 className="title tertiary">Hospitality business</h3>
        <h1 className="title primary">Guest Transportation</h1>
      </div>
      <p className="text">
        Owners of hotels, resorts, retreats, theme parks etc can now register
        their guests on the app to avail special transportation services powered
        by Pickmeup via the app. Each guest is provided a live-tracking link to
        track their taxi ride. Staff members can book & pre-book taxi services
        for their guests. They can add guests using the associated room number,
        name & phone number of the guest. Staff members can provide fixed
        transportation credit lines for their guests to use. Guests will have to
        pay the due amount via cash, to the taxi driver once the limit has been
        crossed
      </p>
      <div className="button-wrapper">
        <Button
          type="secondary"
          onClick={() => window.open("https://forms.gle/CuR2rFYMRKVpNEWq5")}
        >
          Join as a hospitality partner
          <span>
            <MdArrowForward />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default CorporateSection;
