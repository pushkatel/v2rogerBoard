import { Button, Modal } from "@mantine/core";
import type { ReactNode } from "react";

interface ModalButtonProps {
  label: string;
  onClick: () => void;
  modalTitle: string;
  opened: boolean;
  onClose: () => void;
  content: ReactNode;
  modalSize?: string;
}

export const ModalButton = ({
  label,
  onClick,
  modalTitle,
  opened,
  onClose,
  content,
  modalSize,
}: ModalButtonProps) => (
  <>
    <Button onClick={onClick}>{label}</Button>
    <Modal
      opened={opened}
      onClose={onClose}
      title={modalTitle}
      size={modalSize}
    >
      {content}
    </Modal>
  </>
);
