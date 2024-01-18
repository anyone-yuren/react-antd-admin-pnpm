import type { Meta, StoryObj } from '@storybook/react';

import Hero from './index';

const meta = {
  title: 'Example/笔记本',
  component: Hero,
  tags: ['autodocs'],
} as Meta<typeof Hero>;
export default meta;
type Story = StoryObj<typeof meta>;

export const baseCanvas: Story = {
  args: {},
};
