import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'classnames';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, invalid, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        'h-11 w-full rounded-lg border px-3 outline-none transition',
        invalid ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-gray-400',
        className
      )}
      {...props}
    />
  );
});

export default Input;


