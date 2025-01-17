const isProduction = process.env.NODE_ENV === "production";

const warnings: string[] = [];

export function warning(
  condition: boolean,
  label?: string,
  ...messages: string[]
) {
  if (!isProduction) {
    if (!condition) return;

    const finalLabel = label ? `[reakit/${label}]\n` : "[reakit]\n";
    const text = `${finalLabel}${messages.join("\n\n")}`;

    if (warnings.indexOf(text) === -1) {
      // eslint-disable-next-line no-console
      console.warn(text);
      warnings.push(text);
    }

    // Throwing an error and catching it immediately to improve debugging
    // A consumer can use 'pause on caught exceptions'
    // https://github.com/facebook/react/issues/4216
    try {
      throw Error(text);
    } catch (x) {
      // do nothing
    }
  }
}
