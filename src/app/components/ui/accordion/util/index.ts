export function toBoolean(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.toLowerCase() !== 'false';
  }
  return Boolean(value);
}

export function checkRequiredProps(props: Record<string, unknown>): void {
  const missingProps = Object.entries(props)
    .filter(([_, value]) => value === undefined)
    .map(([key]) => key);
  console.log('props: ', props);
  if (missingProps.length > 0) {
    throw new Error(`Missing required props: ${missingProps.join(', ')}`);
  }
}
