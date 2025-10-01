import { ButtonHTMLAttributes } from 'react';
import clsx from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button({ className, variant = 'primary', size = 'md', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4',
    lg: 'h-12 px-6 text-lg'
  } as const;
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-300',
    secondary: 'bg-gray-900 text-white hover:bg-black focus:ring-gray-300',
    ghost: 'border border-gray-200 hover:bg-gray-50'
  } as const;
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...props} />;
}


