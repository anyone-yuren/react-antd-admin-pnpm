import { Random } from 'mockjs';

import { resultPageSuccess } from '../_utils';

import type { MockMethod } from 'vite-plugin-mock';

const geFollwer = () => Math.floor(Math.random() * 4);

const getPosition = () => {
  const hobbyList = [
    'HR Manager',
    'Data Observer',
    'Frontend Engineer',
    'Backend Engineer',
    'Project Manager',
    'QA Engineer',
    'Fullstack Engineer',
    'Registered Nurse',
    'Business Analyst',
    'Creative Director',
    'Software Developer',
    'Research Scientist',
  ];
  const randomNum = Math.floor(Math.random() * hobbyList.length);
  return hobbyList[randomNum];
};

const genList = () => {
  const list: any[] = [];
  for (let index = 0; index < 100; index += 1) {
    const num = index < 10 ? `0${index}` : index;
    list.push({
      id: Number(`10${num}`) + 1,
      name: Random.name(),
      position: getPosition(),
      sex: ['男', '女'][Number(Random.boolean())],
      follwer: geFollwer(),
      mits: Math.floor(Math.random() * 10),
      forbid: Random.boolean(),
    });
  }
  return list;
};

export default [
  {
    url: '/api/user/getUserList',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { current = 1, pageSize = 10 } = query;
      return resultPageSuccess(current, pageSize, genList());
    },
  },
] as MockMethod[];
