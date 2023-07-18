import styles from "./loader.module.scss";

function Loader(): JSX.Element {
  return (
    <section className={styles.wrapper}>
        <div className={styles.loader}></div>
    </section>
  );
}

export default Loader;