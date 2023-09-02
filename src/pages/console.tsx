import React from "react";
import type { AppProps } from "next/app";

import Terminal from "@/components/console/Terminal";

const Console = ({ Component, ...props }: AppProps) => {
  return (
    <main id="main-container">
      <Terminal />
    </main>
  );
};

export default Console;
