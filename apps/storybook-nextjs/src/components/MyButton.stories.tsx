import type { Meta, StoryObj } from '@storybook/nextjs';
import { MyButton } from './MyButton';

const meta = {
  title: 'Components/Button',
  component: MyButton,
  tags: ['autodocs'],
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    appName: 'Button',
    children: 'I am a primary button.',
  },
};
