import type { StorybookConfig } from '@storybook/nextjs-vite';

import { dirname, join } from 'path';

type Preset =
  | string
  | {
      name: string;
      options?: unknown;
    };

type FrameworkName = (string & {}) | '@storybook/nextjs-vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): Preset {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs-vite') as FrameworkName,
    options: {},
  },
  staticDirs: ['../public'],
};

export default config;
