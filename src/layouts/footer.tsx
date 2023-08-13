import { FunctionComponent } from "react";

type FooterProps = {
  children?: any;
};

const Footer: FunctionComponent<FooterProps> = ({ children }) => {
  return <footer>{children}</footer>;
};

export default Footer;
