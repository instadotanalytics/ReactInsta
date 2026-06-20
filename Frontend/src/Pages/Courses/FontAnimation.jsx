import styles from "./FontAnimation.module.css";

function FontAnimation() {
  return (
    <section className={styles.blueprint}>
      <div className={styles.grid}></div>

      <div className={styles.wordWrapper}>
        <h1 className={styles.word}>Learn</h1>

        {/* <div className={styles.scan}></div> */}
      </div>

      <p>Master React • Node • MongoDB • AI • Cloud</p>
    </section>
  );
}

export default FontAnimation;
