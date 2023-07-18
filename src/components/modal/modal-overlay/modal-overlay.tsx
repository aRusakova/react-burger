import styles from "./modal-overlay.module.scss";
import { LegacyRef } from "react";


function ModalOverlay({overlayRef}: {overlayRef: LegacyRef<HTMLDivElement>}): JSX.Element {
  return <div className={styles.overlay} ref={overlayRef}></div>;
}

export default ModalOverlay;
