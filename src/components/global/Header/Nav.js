import { windowState, menuState } from "atoms/states";
import { useRecoilValue, useRecoilState } from "recoil";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import nav from "data/nav.json";
import { useEffect, useState } from "react";

function Nav() {
  // next.js router
  const router = useRouter();
  const [url, setUrl] = useState("");

  // get width of screen
  const { width } = useRecoilValue(windowState);

  // get menu open global state
  const [menuOpen, setMenuOpen] = useRecoilState(menuState);

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

  if (width > 768) {
    return (
      <div className="Header-Nav h-full flex flex-grow items-center justify-end col-gap">
        <ul className="nav flex items-center col-gap">
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
                <a>{item.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="Header-Nav-Support">
          <Link href="/support">
            <a className="flex items-center col-gap-s">
              <img src="/assets/ChatCircleText.svg" alt="Support" />
              Support
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="Header-ham-menu" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? <FiX /> : <FiMenu />}
    </div>
  );
}

export default Nav;
