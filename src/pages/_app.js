import "styles/globals.scss";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { windowState } from "atoms/states";
import Router from "next/router";
import NProgress from "nprogress";
import { MobileMenu, Header, PopUp } from "components";

// Setting up NProgress : that really cool progress
// bar at the top of the page!
NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function WinStateListener() {
  // Import global set function of windowState
  const setWindowState = useSetRecoilState(windowState);

  useEffect(() => {
    // This will happen only when the component is first mounted
    const resetWindowState = () => {
      // This function sets the windowState
      setWindowState({
        width:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        height:
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight,
        scroll: document.documentElement.scrollTop || document.body.scrollTop,
      });
    };
    // reset windowState the first time when component mounted.
    resetWindowState();
    // The reset function will get executed in
    // the scroll and resize events.
    window.addEventListener("resize", resetWindowState);
    window.addEventListener("scroll", resetWindowState);
  }, [setWindowState]);
  return <div style={{ display: "none" }}></div>;
}

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <WinStateListener />
      <PopUp />
      <MobileMenu />
      <Header />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
