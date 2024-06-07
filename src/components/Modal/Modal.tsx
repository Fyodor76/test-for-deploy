import { FC, useEffect, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';

interface ModalType {
  closeModal: () => void;
  template?: ReactElement | null;
  show: boolean;
}

const animationStyles = {
  open: {
    opacity: 1,
},
close: {
    opacity: 0,
},
};

const transition = {
  type: 'tween',
  ease: [0.45, 0, 0.55, 1],
  duration: 0.25,
};


export const Modal: FC<ModalType> = ({ closeModal, template, show }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const effect = {
    initial: show ? 'close' : 'open',
    animate: 'open',
    exit: 'close',
    variants: animationStyles,
    transition: transition,
  };

  return (
        <motion.div {...effect} className="modal">
          <div className="modal-wrapper">
            <div className="modal-content">
              <button className="modal-close-button" onClick={closeModal}>
                <RxCross2 />
              </button>
              {template}
            </div>
          </div>
        </motion.div>
  );
};
