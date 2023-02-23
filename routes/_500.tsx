import { ErrorPageProps } from "$fresh/server.ts";

// TODO customize 500 page
export default function Error500Page({ error }: ErrorPageProps) {
  return <p>500 internal error: {(error as Error).message}</p>;
}
