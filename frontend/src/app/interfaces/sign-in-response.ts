import {Userdata} from './userdata';

export interface SignInResponse {
  message: string;
  data: {
    token: string;
    user: Userdata
  }
}
