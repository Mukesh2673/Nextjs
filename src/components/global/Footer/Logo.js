import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <a className="Footer-Logo no-line">
        <div>
          <img src="/assets/logo_light.svg" alt="Pickmeup" />
        </div>
      </a>
    </Link>
  );
}

export default Logo;
