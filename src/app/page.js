"use client"
import Script from "next/script";

export default function Home() {
  return (
    <div id="ping-container"> 
      <h2>ping container</h2>
      <Script type="text/javascript" src="https://assets.pingone.com/davinci/latest/davinci.js" />
      <div className="loader" id="loader"></div>
      <div id="widget" className="skWidget"></div>
    </div>
  );
}
