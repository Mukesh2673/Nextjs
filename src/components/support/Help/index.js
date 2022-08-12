import React from "react";

function Help() {
  return (
    <div className="Help Section w-full padding-x">
      <div className="Help-wrapper w-full flex items-center justify-center">
        <img
          src="/assets/support/woman.png"
          alt="Support Woman"
          className="Help-image hide-for-mobile"
        />
        <div className="Help-text flex flex-col items-start row-gap md:ml-[50%] lg:ml-[40%]">
          <h3 className="title tertiary">
            Need Help?
            <br />
            Just reach out.
          </h3>
          <p>
            At Pickmeup, we enjoy working on hard problems together because the
            hardest challenges are often the most rewarding.
          </p>
          <div className="Help-contact flex flex-col items-start row-gap-s">
            <p className="text">
              Call us on <b>+234 706 755 8936</b>
            </p>
            <p className="text">
              Email: <b>support@pickmeup.ng</b>
            </p>
            <p className="text">
              Address: <b>42 Airport Road, Warri, Delta</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
