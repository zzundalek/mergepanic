import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Merge Panic</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="Merge Panic logo"
        />
        <p class="my-6">
          Welcome to Merge Panic blog build with `fresh`.
        </p>
        <Counter start={3} />
        <div class="gap-x-4 flex justify-center">
          <a href="https://fresh.deno.dev">
            <img width="197" height="37" src="https://fresh.deno.dev/fresh-badge.svg" alt="Made with Fresh" />
          </a>
          <a href="https://fresh.deno.dev">
            <img width="197" height="37" src="https://fresh.deno.dev/fresh-badge-dark.svg" alt="Made with Fresh" />
          </a>
        </div>
      </div>
    </>
  );
}
