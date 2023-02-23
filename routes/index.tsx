import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Merge Panic</title>
      </Head>
      <div class="px-4 mx-auto max-w-screen-md grid gap-6">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="Merge Panic logo"
        />
        <p>Welcome to Merge Panic blog build with `fresh`.</p>
        <span>
          Start by openning first blog post:&nbsp;
          <a class="underline" href="/blog/hello-world">Hello world</a>.
        </span>
        <div class="gap-x-4 flex justify-center">
          <a href="https://fresh.deno.dev">
            <img
              width="197"
              height="37"
              src="https://fresh.deno.dev/fresh-badge.svg"
              alt="Made with Fresh"
            />
          </a>
          <a href="https://fresh.deno.dev">
            <img
              width="197"
              height="37"
              src="https://fresh.deno.dev/fresh-badge-dark.svg"
              alt="Made with Fresh"
            />
          </a>
        </div>
      </div>
    </>
  );
}
