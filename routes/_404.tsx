import { UnknownPageProps } from "$fresh/server.ts";

// TODO customize 404 page
export default function NotFoundPage({ url }: UnknownPageProps) {
  return <p>404 not found: {url.pathname}</p>;
}
