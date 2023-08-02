export type AssertErrorProvider = () => Error | string;

export function assertTruthy(value: unknown, error?: string | Error | AssertErrorProvider): asserts value {
  if (value) {
    return;
  }
  const messageOrObject = typeof error === 'function' ? error() : error;
  if (messageOrObject instanceof Error) {
    throw messageOrObject;
  } else {
    throw new Error(messageOrObject ?? 'Assertion error');
  }
}
