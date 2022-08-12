import { Button } from "components";
import { useRouter } from "next/router";
import { BsCheck2 } from "react-icons/bs";

function ReadySection() {
  // next.js router
  const router = useRouter();

  return (
    <div className="ReadySection Section w-full flex items-center justify-center">
      <div className="ReadySection-wrapper wrapper flex flex-col md:flex-row items-start row-gap padding-x">
        <div className="ReadySection-main flex flex-col items-start row-gap">
          <div className="ReadySection-main-title flex flex-col items-start">
            <h1 className="title primary">
              Ready to grow and develop with Pickmeup?
            </h1>
            <article className="text">
              There are several factors that we consider when assessing the
              eligibility of applicants for a franchisee. If you think you
              qualify as a potential Pickmeup franchise owner, please fill in
              the application form.
            </article>
          </div>
          <div className="ReadySection-main-button flex items-start">
            <Button
              type="primary"
              onClick={() =>
                window.open("https://forms.gle/4UFnZwfFDzTW148F8", "_blank")
              }
            >
              Apply Here
            </Button>
          </div>
        </div>
        <div className="ReadySection-list flex flex-col items-start row-gap">
          {checkmarks.map((item, i) => (
            <div
              className="ReadySection-list-item flex items-center col-gap"
              key={i}
            >
              <div className="ReadySection-list-item-icon">
                <BsCheck2 />
              </div>
              <p className="text">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const checkmarks = [
  "A solid personal and financial reputation",
  "Commitment to the Pickmeup Brand",
  "A vast network of local connections",
  "A growth mindset",
  "Financial commitment",
  "International recognition",
];

export default ReadySection;
