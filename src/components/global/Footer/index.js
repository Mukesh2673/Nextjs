import Logo from "./Logo";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import Link from "next/link";
import nav from "data/footerNav.json";

const socialMedia = [
  {
    icon: <BsFacebook />,
    url: "https://www.facebook.com/pickmeupngr",
  },
  {
    icon: <BsTwitter />,
    url: "https://twitter.com/pickmeupng",
  },
  {
    icon: <BsInstagram />,
    url: "https://www.instagram.com/pickmeupng/",
  },
  {
    icon: <BsYoutube />,
    url: "https://www.youtube.com/c/pickmeupng",
  },
];

function Footer() {
  return (
    <footer
      className="Footer w-full flex items-center justify-center"
      id="footer"
    >
      <div className="Footer-wrapper wrapper w-full flex flex-col row-gap items-start">
        <div className="Footer-section-1 w-full flex items-start justify-between">
          <div className="flex flex-col items-start">
            <Logo />
            <p className="font-normal">
              The smartest way to move around in your city!
            </p>
            <div className="Footer-sm flex items-center col-gap">
              <span>Follow us on</span>
              <div className="Footer-sm-icons flex items-center col-gap">
                {socialMedia.map((item, i) => (
                  <a
                    href={item.url}
                    className="white no-line"
                    target="_blank"
                    rel="noreferrer noopener"
                    key={i}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="AppDownload-download flex items-center justify-start w-full col-gap pt-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.pickmeup.rider"
                target="_blank"
                rel="noopener noreferrer"
                className="no-line"
              >
                <img
                  src="/assets/download_android.svg"
                  alt="Download android"
                  height="250"
                  width="150"
                />
              </a>
              <a
                href="https://apps.apple.com/gb/app/pickmeup-rider/id1423542581"
                target="_blank"
                rel="noopener noreferrer"
                className="no-line"
              >
                <img
                  src="/assets/download_ios.svg"
                  alt="Download iOS"
                  height="250"
                  width="150"
                />
              </a>
            </div>
          </div>
          <div className="Footer-navigation flex items-start justify-between">
            {nav.map((item, i) => (
              <div className="column flex flex-col" key={i}>
                <h4 className="font-bold">{item.title}</h4>
                {item.links.map((link, index) => (
                  <div className="link" key={index}>
                    <Link href={link.url}>
                      <a className="white">{link.title}</a>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="Footer-section-2">
          <div className="line w-full hide-for-mobile"></div>
        </div>
        <div className="Footer-section-3 flex flex-col items-start row-gap -mt-4 -mb-2">
          <div className="Footer-copyright w-full flex items-center justify-between">
            <p className="text">&copy; 2022 Pickmeup Technologies Inc.</p>
            <p className="text">
              <Link href="/privacy-policy">
                <a className="white font-normal">Privacy</a>
              </Link>
              <span className="font-normal">|</span>
              <Link href="/tos">
                <a className="white font-normal">Terms</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
