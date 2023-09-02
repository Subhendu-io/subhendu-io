import { Fragment, FunctionComponent } from "react";
import AppHead from "./head";

type LayoutProps = {
  children?: any;
};

const RootLayout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <AppHead />
      {children}
    </Fragment>
  );
};

RootLayout.defaultProps = {};
export default RootLayout;
