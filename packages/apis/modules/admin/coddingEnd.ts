import { GRequest } from '../../request';

export const coddingEndList = (data: any) =>
  GRequest('/unique-code/code/search', {
    method: 'post',
    data,
  });
export const coddingTree = (id: any) =>
  GRequest(`/unique-code/code/trajectory-tree/${id}`, {
    method: 'get',
  });

export const codeTree = (id: any) =>
  GRequest(`/unique-code/code/code-tree/${id}`, {
    method: 'get',
  });

export const trajectories = (id: any) =>
  GRequest(`/unique-code/code/trajectories/${id}`, {
    method: 'get',
  });
