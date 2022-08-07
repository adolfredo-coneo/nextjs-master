import React from 'react';
import Link from 'next/link';

import classes from './button.module.css';

type Props = {
  link: string;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ link, children }) => {
  return (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
};

export default Button;
