import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#0404A9" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="author" content="Pickmeup Technologies Inc." />
        <meta property="og:site_name" content="Pickmeup Technologies Inc." />
        <meta property="og:site" content="www.pickmeup.ng" />
        <meta
          property="og:title"
          content="Pickmeup - The smartest way to move around in your city."
        />
        <meta
          property="og:description"
          content="Ride Smart, Ride Fast, Pay less! Pickmeup is the smartest way to move around in your city. Get the app for iPhone and Android."
        />
        <meta property="og:image" content="/assets/icon.png" />
        <meta property="og:url" content="www.pickmeup.ng" />
        <meta property="og:type" content="article" />
        <link rel="apple-touch-icon" href="/assets/icon.png" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <body className="relative">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
