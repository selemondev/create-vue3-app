import * as clack from "@clack/prompts";

export const interactive = Boolean(
  process.stdin.isTTY &&
  process.stdout.isTTY &&
  !process.env.CI &&
  process.env.TERM !== "dumb",
);

export class Cancellation extends Error {
  constructor() {
    super("Operation cancelled.");
  }
}

export function answer<T>(value: T | symbol): T {
  if (clack.isCancel(value)) throw new Cancellation();
  return value;
}

export const logger = {
  info: (message: string) =>
    interactive ? clack.log.info(message) : console.log(message),
  error: (message: string) =>
    interactive
      ? clack.log.error(message, { output: process.stderr })
      : console.error(`Error: ${message}`),
  warning: (message: string) =>
    interactive
      ? clack.log.warn(message, { output: process.stderr })
      : console.error(`Warning: ${message}`),
  success: (message: string) =>
    interactive ? clack.log.success(message) : console.log(message),
  cancel: () =>
    interactive
      ? clack.cancel("Operation cancelled. No further changes made.")
      : console.error("Operation cancelled."),
};

export async function progress<T>(
  message: string,
  operation: (signal: AbortSignal) => Promise<T>,
): Promise<T> {
  const controller = new AbortController();
  const onCancel = () => controller.abort(new Cancellation());
  process.once("SIGINT", onCancel);
  process.once("SIGTERM", onCancel);
  const spinner = interactive ? clack.spinner() : undefined;
  if (spinner) spinner.start(message);
  else logger.info(message);
  try {
    const result = await operation(controller.signal);
    controller.signal.throwIfAborted();
    spinner?.stop(message);
    return result;
  } catch (cause) {
    if (controller.signal.aborted) spinner?.cancel("Operation cancelled.");
    else spinner?.error(`${message} failed`);
    throw cause;
  } finally {
    process.off("SIGINT", onCancel);
    process.off("SIGTERM", onCancel);
  }
}
