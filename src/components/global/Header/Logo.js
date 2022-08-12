import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <a className="Header-Logo">
        <div>
          <img src="/assets/logo.svg" alt="Pickmeup" />
        </div>
      </a>
    </Link>
  );
}

export default Logo;
