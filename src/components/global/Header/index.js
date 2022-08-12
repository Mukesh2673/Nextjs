import { windowState } from "atoms/states";
import { useRecoilValue } from "recoil";
import Logo from "./Logo";
import Nav from "./Nav";

function Header() {
  // scroll global state, to add class when user scrolls
  const { scroll } = useRecoilValue(windowState);

  return (
    <div className={`Header ${scroll > 20 ? "with-bg" : ""}`}>
      <div className="Header-content flex items-center justify-between padding-x">
        <Logo />
        <Nav />
      </div>
    </div>
  );
}

export default Header;
