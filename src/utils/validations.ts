

export const EmailValidateParams = {
  required: true,
  pattern: /^\S+@\S+$/i
} as const

export const UserLoginValidateParams = {
  required: true,
  pattern: /^[A-Za-z0-9]+$/i,
  minLength: 5,
  maxLength: 20
} as const

export const PasswordValidateParams = {
  required: true,
  minLength: 5,
  maxLength: 20
} as const

export const renderFieldError = (fieldType: string, errorType: string): string => {
  switch (fieldType) {
    case 'email':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'pattern': return 'Введен некорректный email';
        default: return 'Неизвестная ошибка';
      }
    case 'userLogin':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'pattern': return 'В поле ввода обнаружены некорректные символы';
        case 'maxLength': return 'Максимальное количество символов 20';
        case 'minLength': return 'Минимальное количество символов 5';
        default: return 'Неизвестная ошибка';
      }
    case 'password':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'maxLength': return 'Максимальное количество символов 20';
        case 'minLength': return 'Минимальная длина пароля 5 символов';
        default: return 'Неизвестная ошибка';
      }
    case 'password_repeat':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'maxLength': return 'Максимальное количество символов 20';
        case 'minLength': return 'Минимальная длина пароля 5 символов';
        case 'passwordMatch': return 'Пароли не совпадают';
        default: return 'Неизвестная ошибка';
      }
    default: return 'Неизвестный тип поля';
  }

}