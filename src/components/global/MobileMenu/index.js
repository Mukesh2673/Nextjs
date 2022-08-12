import { menuState, windowState } from "atoms/states";
import { useRecoilState, useRecoilValue } from "recoil";
import Link from "next/link";
import { useRouter } from "next/router";
import nav from "data/nav.json";
import { useEffect, useState } from "react";

function MobileMenu() {
  //next.js router
  const router = useRouter();
  const [url, setUrl] = useState("");

  // importing state of menu
  const [menuOpen, setMenuOpen] = useRecoilState(menuState);

  // scroll global state, to add class when user scrolls
  const { scroll } = useRecoilValue(windowState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
        setUrl("https://apps.apple.com/gb/app/pickmeup-rider/id1423542581");
      }
      if (/Android|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
        setUrl(
          "https://play.google.com/store/apps/details?id=com.pickmeup.rider"
        );
      }
    }
  }, []);

  const scrollToDownload = () => {
    if (typeof document !== "undefined") {
      let section = document.querySelector("#app-download");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        let section = document.querySelector("#footer");
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      className={`MobileMenu hide-for-desktop ${menuOpen ? "open" : ""} ${
        scroll > 20 ? "with-bg" : ""
      } flex flex-col justify-between w-full`}
    >
      <div className="MobileMenu-Nav w-full flex flex-col items-start justify-end">
        <ul className="nav flex flex-col items-start w-full">
          <li>
            {url?.length > 0 ? (
              <Link href={url}>
                <a target="_blank">Ride with us</a>
              </Link>
            ) : (
              <a onClick={scrollToDownload} className="cursor-pointer">
                Ride with us
              </a>
            )}
          </li>
          {nav.map((item, i) => (
            <li
              className={router.pathname === item.url ? "active" : ""}
              key={i}
            >
              <Link href={item.url}>
                <a className="no-line" onClick={() => setMenuOpen(false)}>
                  {item.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="MobileMenu-Nav-Support">
          <Link href="/support">
            <a
              className="flex items-center col-gap-s no-line"
              onClick={() => setMenuOpen(false)}
            >
              <img src="/assets/ChatCircleText.svg" alt="Support" />
              Support
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
