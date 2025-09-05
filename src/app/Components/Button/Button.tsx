"use client";
import { Button as AntButton } from 'antd';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <AntButton className={styles.customButton} onClick={onClick}>
      {children}
    </AntButton>
  );
}
