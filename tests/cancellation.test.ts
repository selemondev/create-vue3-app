import assert from "node:assert/strict";
import { test } from "node:test";
import { Cancellation, progress } from "../src/utils/logger";

test("cancellation during progress rejects instead of continuing the workflow", async () => {
  const before = process.listenerCount("SIGINT");
  await assert.rejects(
    progress("Preparing project", async () => {
      process.emit("SIGINT");
      return "must not reach the next workflow step";
    }),
    Cancellation,
  );
  assert.equal(process.listenerCount("SIGINT"), before);
});
