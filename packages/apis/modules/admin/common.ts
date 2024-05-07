import { GRequest } from '../../request';

export const adminLogin = (data: any) =>
  GRequest('/Auth/login', {
    method: 'POST',
    data,
  });
export const DictionaryList = (data: any) =>
  GRequest('/Dictionary/GetDictionaryPageData', {
    method: 'POST',
    data,
  });
