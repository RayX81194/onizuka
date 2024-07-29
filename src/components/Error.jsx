import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="bg-zinc-700 text-white flex flex-col p-[21rem] items-center justify-center">
      <h1 className="text-bold text-3xl mb-2">404 Error Not Found</h1>
      <h2 className="text-xl mb-2">Are you sure you're at right place?</h2>
      <Link to="/onizuka/">
      <h2 className="text-blue-500 underline">Go To Home</h2>
      </Link>
    </div>
  );
};

export default Error;
