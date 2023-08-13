import React from "react";
import type { AppProps } from "next/app";

import Home from "./home";

const App = ({ Component, ...props }: AppProps) => {
  return (
    <main id="main-container">
      <Home />
    </main>
  );
};

export default App;
