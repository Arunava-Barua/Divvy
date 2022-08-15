import Head from "next/head";
import Image from "next/image";
import {Navbar, Team, Banner, Services} from "../components/index.js"

export default function Home() {
  return (
    <div>
      <Banner/>
      <Services />
      <Team/>
    </div>
  );
}
