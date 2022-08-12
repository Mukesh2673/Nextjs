import React from "react";

function Testimonial({ text }) {
  return (
    <div className="Testimonial Section w-full flex flex-col md:flex-row-reverse items-center padding-x">
      <div className="Testimonial-image w-full h-full">
        <img
          src="/assets/about/testimonial.png"
          alt="Testimonial by The Pickmeup Management Team"
        />
      </div>
      <div className="Testimonial-content w-full h-full flex flex-col items-start justify-between row-gap">
        <div className="Testimonial-content-content flex flex-col items-start row-gap">
          <p className="text">
            {text ||
              "We were tired of seeing passengers being ripped off by cab drivers overcharge and that comes with bargained transactions. So we decided to create a platform more favorable to the drivers and the customers. Convinced there was a better way to service passengers and treat drivers while increasing their pay so that drivers can be making more profits and not employee like wages, we made his platform available to drivers. Together, we all intend to create a new, “21st-century” transport company."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
