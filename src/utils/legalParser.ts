interface Template {
  regexp: RegExp
  transform: (res: RegExpExecArray) => string
}

const templates: Template[] = [
  {
    regexp: /ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "(.+)"/,
    transform: res => `ООО "${res[1]}"`,
  },
  {
    regexp: /ПУБЛИЧНОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО "(.+)"/,
    transform: res => `ПАО "${res[1]}"`,
  },
  {
    regexp: /ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ "(.+)"/,
    transform: res => `ИП "${res[1]}"`,
  },
  {
    regexp: /НЕ ПУБЛИЧНОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО "(.+)"/,
    transform: res => `НАО "${res[1]}"`,
  },
  {
    regexp: /АКЦИОНЕРНОЕ ОБЩЕСТВО "(.+)"/,
    transform: res => `АО "${res[1]}"`,
  },
  {
    regexp: /(.+)(ПУБЛИЧНОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО)/,
    transform: res => `${res[1]}ПАО) `,
  },
]

export function legalParser(raw: string) {
  for (const template of templates) {
    const res = template.regexp.exec(raw)

    if (res !== null) return template.transform(res)
  }

  return raw
}
