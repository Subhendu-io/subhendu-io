import { FC } from "react";
import router from "next/router";

const Custom404: FC = () => {
  return (
    <div className="page-content h-screen">
      <h1
        style={{
          paddingTop: "100px",
          textAlign: "center",
          fontSize: "150px",
          fontWeight: 800,
          color: "rgb(255 255 255 / 29%)",
        }}
      >
        404 Page not found!
      </h1>
      <div className="text-center">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Custom404;
