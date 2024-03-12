import { VARIANTS } from './constants';

export type ViewProps = {
  variant?: typeof VARIANTS[keyof typeof VARIANTS];
} &React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
