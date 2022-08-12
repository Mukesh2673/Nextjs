import { cookiesState } from "atoms/states";
import { Button } from "components";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import Cookies from "js-cookie";

function PopUp() {
  // cookies global state
  const [showPopup, setShowPopup] = useRecoilState(cookiesState);

  useEffect(() => {
    // if the user accepts our cookie policy
    // we create a cookie named "accepted"
    const importedCookie = Cookies.get("accepted");

    if (importedCookie) return;

    setTimeout(() => {
      setShowPopup(true);
    }, 3000);
  });

  return (
    <div
      className={`PopUp fixed bottom-0 right-0 left-0 flex flex-col items-center ${
        showPopup ? "visible" : ""
      }`}
    >
      <div className="PopUp-wrapper w-full">
        <div className="PopUp-content w-full flex items-center justify-between col-gap">
          <p className="text">
            By browsing our website, you agree to the use of cookies, with the
            conditions{" "}
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>{" "}
            and{" "}
            <Link href="/cookie-policy">
              <a>Cookie Policy</a>
            </Link>
          </p>
          <Button
            type="secondary"
            onClick={() => {
              // gets removed after 1 day
              Cookies.set("accepted", "true", { expires: 1 });
              setShowPopup(false);
            }}
          >
            Ok, Got it!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
