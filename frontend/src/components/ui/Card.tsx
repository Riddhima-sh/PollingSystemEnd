import { HTMLAttributes } from 'react';
import clsx from 'classnames';

type Props = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, ...props }: Props) {
  return <div className={clsx('rounded-2xl border border-gray-100 bg-white p-6 shadow-sm', className)} {...props} />;
}


