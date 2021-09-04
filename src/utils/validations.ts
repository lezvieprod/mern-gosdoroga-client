import {
  AVAILABLE_POST_IMAGE_FORMATS,
  AVAILABLE_REG_IMAGE_FORMATS,
  MAX_POST_IMAGE_SIZE,
  MAX_REG_IMAGE_SIZE,
  MAX_REG_IMAGE_SIZE_PUBLIC
} from "./constants"

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

export const UserPhotoValidateParams = {
  required: false,
  validate: {
    isWrongFormats: (files: FileList) => AVAILABLE_REG_IMAGE_FORMATS.includes(files[0]?.type) || !files.length,
    lessThan10MB: (files: FileList) => files[0]?.size < MAX_REG_IMAGE_SIZE || !files[0]?.size,
  }
} as const


export const PostTitleValidateParams = {
  required: true,
  minLength: 5,
  maxLength: 200
} as const

export const PostDescriptionValidateParams = {
  required: true,
  minLength: 5,
  maxLength: 2000
} as const

export const PostImageBeforeValidateParams = {
  required: true,
  validate: {
    isWrongFormats: (files: FileList) => AVAILABLE_POST_IMAGE_FORMATS.includes(files[0]?.type) || !files.length,
    lessThan10MB: (files: FileList) => files[0]?.size < MAX_POST_IMAGE_SIZE || !files[0]?.size,
  }
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
        case 'maxLength': return `Максимальное количество символов ${UserLoginValidateParams.maxLength}`;
        case 'minLength': return `Минимальное количество символов ${UserLoginValidateParams.minLength}`;
        default: return 'Неизвестная ошибка';
      }
    case 'password':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'maxLength': return `Максимальное количество символов ${PasswordValidateParams.maxLength}`;
        case 'minLength': return `Минимальная длина пароля - ${PasswordValidateParams.minLength} символов`;
        default: return 'Неизвестная ошибка';
      }
    case 'password_repeat':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'maxLength': return `Максимальное количество символов ${PasswordValidateParams.maxLength}`;
        case 'minLength': return `Минимальная длина пароля - ${PasswordValidateParams.minLength} символов`;
        case 'passwordMatch': return 'Пароли не совпадают';
        default: return 'Неизвестная ошибка';
      }
    case 'userPhoto':
      switch (errorType) {
        case 'isWrongFormats': return `Загружен запрещенный формат. Доступные форматы изображения: ${AVAILABLE_REG_IMAGE_FORMATS.join(", ")}`;
        case 'lessThan10MB': return `Максимальный размер фотографии ${MAX_REG_IMAGE_SIZE_PUBLIC}`;
        default: return 'Неизвестная ошибка';
      }
    default: return 'Неизвестный тип поля';
  }

}