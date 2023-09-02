import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

import { Post } from "@/services/ApiService";

const Login = ({ Component, ...props }: AppProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      router.push("/console");
    }
  });

  const handleSubmit = async () => {
    const result = await Post("/api/auth", { username, password });
    if (result.success) {
      localStorage.setItem("TOKEN", result.token);
    } else {
      window.alert(result.message);
    }
  };

  return (
    <main id="main-container">
      <section className="h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
          <div className="w-full rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-800 text-md rounded-lg block w-full p-3"
                    value={username}
                    onChange={(e: any) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    className="bg-gray-800 text-md rounded-lg block w-full p-3"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
