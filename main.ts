/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

// TODO Deno import map in deno.json not supported yet https://github.com/denoland/fresh/issues/1001
const manifestWithDenoImportMap = {
    ...manifest,
    config: {
        ...manifest.config,
        importMap: './deno.json'
    }
}

await start(manifestWithDenoImportMap, { plugins: [twindPlugin(twindConfig)] });
