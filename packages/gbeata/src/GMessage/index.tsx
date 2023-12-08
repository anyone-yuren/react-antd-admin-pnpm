import { message } from 'antd';
import { ReactNode } from 'react';

export const success = (messages: ReactNode, duration?: number) =>
  message.success(messages, duration);

export const error = (messages: ReactNode, duration?: number) =>
  message.error(messages, duration);

export const warning = (messages: ReactNode, duration?: number) =>
  message.warning(messages, duration);

export const info = (messages: ReactNode, duration?: number) =>
  message.info(messages, duration);

export const loading = (messages: ReactNode, duration?: number) =>
  message.loading(messages, duration);

export default {
  success,
  error,
  warning,
  info,
  loading,
};
