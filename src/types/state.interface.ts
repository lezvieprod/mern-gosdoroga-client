import { IRequestError } from "./error.interface";

export interface ISystemState {
  isFetching: boolean,
  isFetched: boolean,
  isReject: boolean,
  rejectData: IRequestError,
}