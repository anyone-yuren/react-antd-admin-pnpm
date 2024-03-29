import type { Meta, StoryObj } from '@storybook/react';

import { Setup } from '../base';

const meta = {
  title: 'Example/初始化',
  component: Setup,
  tags: ['autodocs'],
} as Meta<typeof Setup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const baseCanvas: Story = {
  args: {},
};
