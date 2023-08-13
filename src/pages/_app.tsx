import type { AppProps } from "next/app";

import Layout from "@/layouts";

import "bootstrap/dist/css/bootstrap.css";
import "@/css/aos.css";
import "@/css/style.css";

function App({ Component, ...props }: AppProps) {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
}
export default App;
