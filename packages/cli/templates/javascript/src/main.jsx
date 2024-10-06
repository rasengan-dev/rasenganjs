import "@rasenganjs/image/lib/styles/index.css";
import "@/styles/index.css";
import React from "react";
import AppRouter from "@/app/app.router";

export default function App({ Component, children }) {
  return <Component router={AppRouter}>{children}</Component>;
}
