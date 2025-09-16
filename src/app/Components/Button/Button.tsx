"use client";
import { Button as AntButton } from "antd";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  htmlType?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  block?: boolean;
}

export default function Button({
  children,
  onClick,
  htmlType = "button",
  className,
  disabled,
  block,
}: ButtonProps) {
  return (
    <AntButton
      className={clsx(styles.customButton, className)}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disabled}
      block={block}
    >
      {children}
    </AntButton>
  );
}
