function* rangeGen(start: number, end: number) {
  for (let num = start; num < end; num += 1) {
    yield num
  }
}

export function range(start: number, end: number): number[] {
  return Array.from(rangeGen(start, end))
}
