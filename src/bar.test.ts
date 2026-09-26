import { test } from "node:test";
import assert from "node:assert/strict";
import { bar } from "./bar.ts";

test("bar marks usage and target", () => {
  assert.equal(bar(0, 10), ".....|....");
  assert.equal(bar(1, 10), "##########");
  assert.equal(bar(0.3, 10), "###..|....");
});
