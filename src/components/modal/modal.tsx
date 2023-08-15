import styles from "./modal.module.scss";
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { ReactNode, MouseEvent, useCallback, useEffect, useRef } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};

interface IModalProps {
  children: ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: IModalProps): JSX.Element {

  const modalOverlayRef = useRef<HTMLDivElement | null>(null);

  const pressEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    document.addEventListener("keydown", pressEsc);
    return () => {
      document.removeEventListener("keydown", pressEsc);
    };
  }, [pressEsc]);

  const clickOnLayout = (e: MouseEvent<HTMLElement>) => {
    if (e.target === modalOverlayRef.current) {
      closeModal();
    }
  };

  return createPortal(
    <section className={styles.wrapper} onClick={clickOnLayout}>
      <div className={styles.modal} data-testid="modal">
        <div className={styles.buttonContainer} data-testid="modalCloseBtn">
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        {children}
      </div>
      <ModalOverlay overlayRef={modalOverlayRef} />
    </section>,
    document.getElementById("modals-root") as HTMLElement
  );
}
