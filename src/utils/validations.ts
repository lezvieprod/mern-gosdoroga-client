import { LANG } from "../lang/lang"
import {
  AVAILABLE_POST_IMAGE_FORMATS,
  AVAILABLE_REG_IMAGE_FORMATS,
  MAX_POST_IMAGE_SIZE,
  MAX_REG_IMAGE_SIZE,
  MAX_REG_IMAGE_SIZE_PUBLIC,
  MAX__POST_IMAGE_SIZE_PUBLIC
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

  const lang = localStorage.getItem('lang') || 'RU'
  const renderText = (lang: string) => lang === 'EN' ? LANG.EN : LANG.RU;
  
  switch (fieldType) {
    case 'email':
      switch (errorType) {
        case 'required': return renderText(lang).REQUIRED;
        case 'pattern': return renderText(lang).WRONG_EMAIL;
        default: return renderText(lang).UNKNOWN_VALIDATE_ERROR;
      }
    case 'userLogin':
      switch (errorType) {
        case 'required': return renderText(lang).REQUIRED;
        case 'pattern': return renderText(lang).INCORRECT_FIELD_VALUE;
        case 'maxLength': return `${renderText(lang).MAX_SYMBOLS} - ${UserLoginValidateParams.maxLength}`;
        case 'minLength': return `${renderText(lang).MIN_SYMBOLS} - ${UserLoginValidateParams.minLength}`;
        default: return renderText(lang).UNKNOWN_VALIDATE_ERROR;
      }
    case 'password':
      switch (errorType) {
        case 'required': return renderText(lang).REQUIRED;
        case 'maxLength': return `${renderText(lang).MAX_SYMBOLS} - ${PasswordValidateParams.maxLength}`;
        case 'minLength': return `${renderText(lang).MIN_SYMBOLS} - ${PasswordValidateParams.minLength}`;
        default: return renderText(lang).UNKNOWN_VALIDATE_ERROR;
      }
    case 'password_repeat':
      switch (errorType) {
        case 'required': return renderText(lang).REQUIRED;
        case 'maxLength': return `${renderText(lang).MAX_SYMBOLS} - ${PasswordValidateParams.maxLength}`;
        case 'minLength': return `${renderText(lang).MIN_SYMBOLS} - ${PasswordValidateParams.minLength}`;
        case 'passwordMatch': return renderText(lang).PASSWORD_MISMATCH;;
        default: return renderText(lang).UNKNOWN_VALIDATE_ERROR;
      }
    case 'userPhoto':
      switch (errorType) {
        case 'isWrongFormats': return `${renderText(lang).AVAIABLE_IMAGE_FORMATS}: ${AVAILABLE_REG_IMAGE_FORMATS.join(", ")}`;
        case 'lessThan10MB': return `${renderText(lang).MIN_SYMBOLS} - ${MAX_REG_IMAGE_SIZE_PUBLIC}`;
        default: return renderText(lang).UNKNOWN_VALIDATE_ERROR;
      }
    case 'postTitle':
      switch (errorType) {
        case 'required': return renderText(lang).REQUIRED;
        case 'maxLength': return `${renderText(lang).MAX_SYMBOLS} - ${PostTitleValidateParams.maxLength}`;
        case 'minLength': return `${renderText(lang).MIN_SYMBOLS} - ${PostTitleValidateParams.minLength}`;
        default: return renderText(lang).UNKNOWN_VALIDATE_ERROR;
      }
    case 'postDescription':
      switch (errorType) {
        case 'required': return renderText(lang).REQUIRED;
        case 'maxLength': return `${renderText(lang).MAX_SYMBOLS} - ${PostDescriptionValidateParams.maxLength}`;
        case 'minLength': return `${renderText(lang).MIN_SYMBOLS} - ${PostDescriptionValidateParams.minLength}`;
        default: return renderText(lang).UNKNOWN_VALIDATE_ERROR;
      }
    case 'postImageBefore':
      switch (errorType) {
        case 'required': return renderText(lang).REQUIRED;
        case 'isWrongFormats': return `${renderText(lang).AVAIABLE_IMAGE_FORMATS}: ${AVAILABLE_POST_IMAGE_FORMATS.join(", ")}`;
        case 'lessThan10MB': return `${renderText(lang).MAX_IMAGE_SIZE} - ${MAX__POST_IMAGE_SIZE_PUBLIC}`;
        default: return renderText(lang).UNKNOWN_VALIDATE_ERROR;
      }
      default: return renderText(lang).UNKNOWN_VALIDATE_ERROR;
  }

}