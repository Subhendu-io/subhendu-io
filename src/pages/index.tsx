import React from "react";
import type { AppProps } from "next/app";

import Layout from "@/layouts";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import Hero from "@/components/home/Hero";

const Home = ({ Component, ...props }: AppProps) => {
  return (
    <Layout>
      <Header />
      <Hero />
      <Footer />
    </Layout>
  );
};

export default Home;
