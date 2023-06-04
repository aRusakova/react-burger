import styles from "./modal-overlay.module.scss";

function ModalOverlay({overlayRef}) {
  return <div className={styles.overlay} ref={overlayRef}></div>;
}

export default ModalOverlay;
