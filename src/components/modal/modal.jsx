import styles from "./modal.module.scss";
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default function Modal({ children, closeModal }) {

  const modalOverlayRef = useRef();

  const pressEsc = useCallback((e) => {
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

  const clickOnLayout = (e) => {
    if (e.target === modalOverlayRef.current) {
      closeModal();
    }
  };

  return createPortal(
    <section className={styles.wrapper} onClick={clickOnLayout}>
      <div className={styles.modal}>
        <div className={styles.buttonContainer}>
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        {children}
      </div>
      <ModalOverlay overlayRef={modalOverlayRef} />
    </section>,
    document.getElementById("modals-root")
  );
}
