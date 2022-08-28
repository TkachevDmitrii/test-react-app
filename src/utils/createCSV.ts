export function createCSV(headers: string[], rows: (string | number | string[])[][]) {
  return (
    '\uFEFF' +
      headers.map(c => `"${c}"`).join(',') +
      '\r\n' +
      rows
        .map(row => row.map(c => `"${typeof c === 'string' ? c.replace(/"/g, '""') : c}"`).join(','))
        .join('\r\n')
  )
}
