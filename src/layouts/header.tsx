import { FunctionComponent } from "react";
import Head from "next/head";

type HeaderProps = {
  children?: any;
};

export const metadata = {
  title: "Subhendu.io",
  description: "Full-Stack Developer",
  keywords: "developer",
  websiteURL: "/",
};

const Header: FunctionComponent<HeaderProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, target-densityDpi=device-dpi, minimal-ui"
        />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta
          data-hid="twitter:title"
          name="twitter:title"
          property="twitter:title"
          content={metadata.title}
        />
        <meta
          data-hid="twitter:description"
          name="twitter:description"
          property="twitter:description"
          content={metadata.description}
        />
        <meta
          data-hid="twitter:image"
          name="twitter:image"
          property="twitter:image"
          content={`${metadata.websiteURL}logo.png`}
        />
        <meta
          data-hid="twitter:image:alt"
          name="twitter:image:alt"
          property="twitter:image:alt"
          content={metadata.title}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          data-hid="og:title"
          name="og:title"
          property="og:title"
          content={metadata.title}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          data-hid="og:description"
          name="og:description"
          property="og:description"
          content={metadata.description}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          data-hid="og:image"
          name="og:image"
          property="og:image"
          content={`${metadata.websiteURL}logo.png`}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          data-hid="og:image:secure_url"
          name="og:image:secure_url"
          property="og:image:secure_url"
          content={`${metadata.websiteURL}logo.png`}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          data-hid="og:image:alt"
          name="og:image:alt"
          property="og:image:alt"
          content={metadata.title}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta name="twitter:card" content="summary" />
        {children}
      </Head>
      <header className="bg-light">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          id="header-nav"
          role="navigation"
        >
          <div className="container">
            <a className="link-dark navbar-brand site-title mb-0" href="#">
              <img width="45" src="./images/logo.png" alt="" /> Subhendu.io
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto me-2">
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#services">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#skills">
                    Skills
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#portfolio">
                    Portfolio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#experience">
                    Experience
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
