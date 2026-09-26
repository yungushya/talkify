import type { ComponentProps, ReactNode } from 'react';

import s from './Label.module.css';

interface ILabel extends ComponentProps<'label'> {
  title: string;
  children: ReactNode;
}

export const Label = ({ title, children, className, ...rest }: ILabel) => {
  return (
    <label
      className={className ? `${s.field} ${className}` : s.field}
      {...rest}
    >
      <span>{title}</span>
      {children}
    </label>
  );
};
