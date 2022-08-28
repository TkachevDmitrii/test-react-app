export const VALIDATORS = {
  specSymbols: /[~`()!#$%&*+=\]\\';,/{}|\\":<>?а-яА-ЯёЁ]/g,
  specSymbolsWithCyrillic: /^[a-zA-Z-А-Яа-яёЁ]/,
  specSymbolsWithCyrillicNoYup: /[^a-zA-Z-А-Яа-яёЁ]/,
  cyrillicOnly: /^[-А-Яа-яёЁ]+$/,
  email:
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  password: /^(?=.*[a-z])(?=.*[0-9]).{6,}/
}
