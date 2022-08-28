export enum Statuses {
  NEW = 1,
  RESOLVED = 2,
  REJECTED = 3
}

export enum ShiftStatuses {
  CONFIRMED = 1,
  ASSIGNED = 2,
  IN_PROGRESS = 3,
  REJECTED = 4,
  COMPLETED = 5,
  PUBLISHED = 6,
  RESERVED = 8,
}

export enum ErrorText {
  INVALID_PASSWORD = 'Invalid password',
  USER_DISABLED = 'disabled',
  EMAIL_DOES_NOT_EXIST = 'doesn\'t exists'
}

export enum NotificationsMessages {
  SUCCESS_MESSAGE_LVR = 'ЛВР утвержден!',
  SUCCESS_DESCRIPTION_LVR = 'Вы успешно утвердили ЛВР.',
  SUCCESS_MESSAGE_SAVE = 'Изменения сохранены!',
  SUCCESS_DESCRIPTION_SAVE = 'Новая информация будет отображена в профиле сотрудника.',
  SUCCESS_MESSAGE_REQUEST = 'Запрос обработан',
  SUCCESS_DESCRIPTION_REQUEST = 'Новая информация будет отображена в ЛК АК.',
  SUCCESS_AGREEMENT_UPLOAD = 'Договор загружен',
  SUCCESS_MESSAGE_NOMINAL_ACCOUNT = 'Номинальный счет создан',
  SUCCESS_DESCRIPTION_NOMINAL_ACCOUNT = 'ID бенефициара номинального счета получено.',
  ERROR_MESSAGE = 'Ошибка!',
  ERROR_DESCRIPTION = 'Не удалось обработать запрос, сообщите об ошибке команде разработки',
  ERROR_AGREEMENT_UPLOAD = 'Не удалось загрузить договор',
  ERROR_MESSAGE_REQUEST = 'Не удалось обработать запрос',
  ERROR_DESCRIPTION_REQUEST = 'Обработка запроса завершилась ошибкой. Повторите попытку.',
  ERROR_MESSAGE_NOMINAL_ACCOUNT = 'Возникла ошибка!',
  ERROR_DESCRIPTION_NOMINAL_ACCOUNT = 'К сожалению, не удалось получить ID бенефициара. Повторите попытку  позже.',
}
