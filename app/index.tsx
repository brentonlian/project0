import Head from "next/head";
import { Inter } from "@next/font/google";
import Header from "../components/Header";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className="bg-zinc-200 min-h-screen">
        <Header />
        <div className="py-20 max-w-xl mx-auto flex flex-col gap-6">
          <h1 className="text-4xl text-center font-medium text-blue-600">Welcome to Who-Co</h1>
          <p className="text-lg justify">
            Welcome to our whimsical world of Widgets! Our website is dedicated to bringing you a unique collection&nbsp;
            of products inspired by the land of the Whos. From Thneeds to Oobleck, our wonderful Widgets are sure to&nbsp;
            spark your imagination and add a touch of playfulness to your life. Our team of designers and artisans have&nbsp;
            worked tirelessly to bring you high-quality, one-of-a-kind creations that capture the spirit and magic of&nbsp;
            Farblar. Whether you're a lifelong collector of general nonsense or simply looking for something fun&nbsp;
            and quirky to brighten up your day, we have something for everyone. So, come and explore our Widget&nbsp;
            wonderland and experience joy and wonder!
          </p>
        </div>
      </main>
    </>
  );
}
