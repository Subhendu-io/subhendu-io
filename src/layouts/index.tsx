import { Fragment, FunctionComponent } from "react";
import Script from "next/script";
import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  children?: any;
};

const RootLayout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" />
      <Script src="/scripts/imagesloaded.pkgd.min.js?ver=1.2.0" />
      <Script src="/scripts/masonry.pkgd.min.js?ver=1.2.0" />
      <Script src="/scripts/BigPicture.min.js?ver=1.2.0" />
      <Script src="/scripts/purecounter.min.js?ver=1.2.0" />
      <Script src="/scripts/bootstrap.bundle.min.js?ver=1.2.0" />
      <Script src="/scripts/aos.min.js?ver=1.2.0" />
      <Script src="/scripts/main.js?ver=1.2.0" />
    </Fragment>
  );
};

RootLayout.defaultProps = {};
export default RootLayout;
