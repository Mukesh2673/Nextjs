import Link from "next/link";

function AppDownload() {
  return (
    <div className="AppDownload Section w-full" id="app-download">
      <div
        className="AppDownload-wrapper wrapper padding-x flex flex-col
		items-center row-gap"
      >
        <div className="AppDownload-text w-full flex flex-col items-center">
          <h1 className="title primary">
            Safe and reliable rides to get you where you need to go.
          </h1>
          <p className="text">
            Available for iOS and Android, our app makes it easier than ever to
            book your rides on the go!.
          </p>
        </div>
        <div className="AppDownload-download flex items-center justify-center w-full col-gap">
          <a
            href="https://play.google.com/store/apps/details?id=com.pickmeup.rider"
            target="_blank"
            rel="noopener noreferrer"
            className="no-line"
          >
            <img src="/assets/download_android.svg" alt="Download android" />
          </a>
          <a
            href="https://apps.apple.com/gb/app/pickmeup-rider/id1423542581"
            target="_blank"
            rel="noopener noreferrer"
            className="no-line"
          >
            <img src="/assets/download_ios.svg" alt="Download iOS" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AppDownload;
