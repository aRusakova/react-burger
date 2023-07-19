import styles from "./modal-overlay.module.scss";
import { LegacyRef } from "react";

interface IComponentProps {
  overlayRef: LegacyRef<HTMLDivElement>
}

function ModalOverlay({overlayRef}: IComponentProps): JSX.Element {
  return <div className={styles.overlay} ref={overlayRef}></div>;
}

export default ModalOverlay;
