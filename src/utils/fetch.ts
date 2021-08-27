import { IRequestError } from "../types/error.interface";


/*  
  Проверяем ошибку на соответствие типу IRequestError 
  Если возвращается true то ошибка от API, иначе ошибка кода / недоступности сервера
*/
export const isApiError = (candidate: any): candidate is IRequestError => {
  return typeof candidate.title === 'string';
};