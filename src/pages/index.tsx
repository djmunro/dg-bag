import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const query = api.example.getDiscs.useQuery();
  const mutation = api.example.addDisc.useMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const formData = new FormData(event.currentTarget);
    const disc = formData.get("disc") as string;
    const weight = formData.get("weight") as string;

    mutation.mutate({ name: disc, weight: parseInt(weight) });
  };

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] ">
        <form
          onSubmit={handleSubmit}
          className="container-sm flex flex-col items-start gap-2"
        >
          <label htmlFor="disc" className="text-purple-200">
            Select a disc...
          </label>
          <select id="disc" name="disc" className="rounded px-3 py-2">
            {query.data.discs.map((disc) => (
              <option key={disc.id}>
                {disc.manufacturer} | {disc.discModel}
              </option>
            ))}
          </select>

          <label htmlFor="weight" className="text-purple-200">
            Disc Weight:
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="rounded px-3 py-2"
          />

          <button
            type="submit"
            className="mt-2 rounded bg-purple-200 px-3 py-2 hover:bg-purple-300"
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default Home;

const HomeBak: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main>
    </>
  );
};
