import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  // 指定された初期ボード
  const [Board, setBoard] = useState<number[][]>([
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
  const [BombBoard, setBombBoard] = useState<number[][]>([
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
  const [UserBoard, setUserBoard] = useState<number[][]>([
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
  const [isFirstClick, setIsFirstClick] = useState(true);

  const BombCreate = (board: number[][], x: number, y: number): number[][] => {
    let bombCount = 0;
    const newBombBoard = structuredClone(BombBoard);
    while (bombCount < 10) {
      const bombY = Math.floor(Math.random() * 9);
      const bombX = Math.floor(Math.random() * 9);
      if (newBombBoard[bombY][bombX] === 5 || (bombY === y && bombX === x)) continue;
      newBombBoard[bombY][bombX] = 5;
      bombCount++;
    }
    return newBombBoard;
  };

  const clickHandler = (x: number, y: number) => {
    if (isFirstClick) {
      const initialBombBoard = BombCreate(Board, x, y);
      setBombBoard(initialBombBoard);
      setIsFirstClick(false);
    }
    const newBoard = structuredClone(Board);
    newBoard[y][x] = BombBoard[y][x] === 5 ? -1 : 1; // 例として、爆弾なら -1、爆弾でなければ 1 に設定
    setBoard(newBoard);

    // else {
    //   // 2回目以降のクリック
    //   // ここで適切な処理を実装する
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.baseStyle}>
        <div className={styles.scoreBaseStyle}>
          <div className={styles.resetBoardStyle} />
          <div className={styles.scoreboardStyle} />
          <div className={styles.timeBoardStyle} />
        </div>
        <div className={styles.boardWrapper}>
          <div className={styles.boardStyle}>
            {Board.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${y}-${x}`}
                  className={styles.cellStyle}
                  onClick={() => clickHandler(x, y)}
                >
                  {cell}
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
