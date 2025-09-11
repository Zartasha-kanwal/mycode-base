"use client";

import React, { ReactNode, useState } from "react";
import { Modal, ModalProps } from "antd";

export interface AppModalProps
  extends Omit<ModalProps, "open" | "visible" | "onOk" | "onCancel"> {
  open?: boolean;
  visible?: boolean;
  title?: ReactNode;
  onClose: () => void;
  onSubmit?: () => Promise<void> | void;
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  children?: ReactNode;
}

export default function AppModal({
  open,
  visible,
  title,
  onClose,
  onSubmit,
  okText = "Save",
  cancelText = "Cancel",
  confirmLoading = false,
  children,
  ...rest
}: AppModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const isOpen = typeof open === "boolean" ? open : visible;

  const handleOk = async () => {
    if (onSubmit) {
      try {
        setSubmitting(true);
        await onSubmit();
        setSubmitting(false);
        onClose();
      } catch (err) {
        setSubmitting(false);
        console.error("AppModal onSubmit error:", err);
      }
    } else {
      onClose();
    }
  };

  return (
    <Modal
      title={title}
      open={!!isOpen}
      onOk={handleOk}
      onCancel={onClose}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={submitting || confirmLoading}
      destroyOnHidden
      {...rest}
    >
      {children}
    </Modal>
  );
}
