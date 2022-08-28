export function classes(...args: (string | undefined)[]) {
  return args.filter(Boolean).join(' ')
}
