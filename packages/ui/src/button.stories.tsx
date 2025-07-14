import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';

const meta = {
  title: 'UI/Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    appName: 'Button',
    children: 'I am a primary button.',
  },
};
