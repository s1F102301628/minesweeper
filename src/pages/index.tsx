import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [samplePos, setsamplePos] = useState(0);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 0) return;
    const newBoard = structuredClone(board);
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
  };
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
            {board.map((row, y) =>
              row.map((color, x) => (
                <div
                  className={styles.cellStyle}
                  key={`${x}-${y}`}
                  onClick={() => clickHandler(x, y)}
                >
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `${-30 * samplePos}px,0px` }}
                  />
                  <button onClick={() => setsamplePos((p) => (p + 1) % 14)}>sample</button>
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
