import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [samplePos, setsamplePos] = useState(0);
  console.log(samplePos);

  return (
    <div className={styles.container}>
      <div className={styles.baseStyle}>
        <div className={styles.scorebaseStyle}>
          <div className={styles.resetboardStyle} />
          <div className={styles.scoreboardStyle} />
          <div className={styles.timeboardStyle} />
        </div>
        <div className={styles.boardWrapper}>
          <div className={styles.boardStyle}>
            <div className={styles.cellStyle}>
              <div
                className={styles.sampleStyle}
                style={{ backgroundPosition: `${-30 * samplePos}px,0px` }}
              />
              <button onClick={() => setsamplePos((p) => (p + 1) % 14)}>sample</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
