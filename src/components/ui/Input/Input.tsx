import type { ComponentProps } from 'react';

import s from './Input.module.css';

interface IInput extends ComponentProps<'input'> {
  className?: string;
}

export const Input = ({ className, ...rest }: IInput) => {
  return (
    <input
      className={className ? `${s.input} ${className}` : s.input}
      {...rest}
    />
  );
};
