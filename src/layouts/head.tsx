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

const AppHead: FunctionComponent<HeaderProps> = ({ children }) => {
  return (
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
        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,300&display=swap"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap"
        rel="stylesheet"
      ></link>
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
  );
};

export default AppHead;
