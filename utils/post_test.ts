import { loadPost } from "./post.ts";

import { assert, assertEquals } from "$std/testing/asserts.ts";
import { describe, it } from "$std/testing/bdd.ts";

describe("load post", () => {
  it("loads successfully", async () => {
    const post = await loadPost("hello-world");
    assert(post);
    assertEquals(post.id, "hello-world");
  });

  it("loads successfully", async () => {
    const post = await loadPost("non-existing-post");
    assertEquals(post, null);
  });
});
