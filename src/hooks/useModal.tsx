import React, { useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';

export const useModal = (): UseModal => {
  const [isVisible, setIsVisible] = useState(false);

  const show = (): void => setIsVisible(true);
  const hide = (): void => setIsVisible(false);

  const RenderModal: React.FC = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <Dialog
      open={isVisible}
      onClose={hide}
      aria-labelledby={'form-dialog-title'}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );

  return {
    show,
    hide,
    RenderModal,
  };
};

type UseModal = {
  show: () => void;
  hide: () => void;
  RenderModal: React.FC;
};
