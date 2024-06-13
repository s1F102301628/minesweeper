import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  // 指定された初期ボード
  const Board = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  const [BombBoard, setBombBoard] = useState([
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
  const [UserBoard, setUserBoard] = useState<(0 | 1 | 2 | 3)[][]>([
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
  const directions = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];
  // -1 = 石
  // 0 = 画像なしセル
  // 1~8 画像セル
  // 9 石＋はてな
  // 10 石＋旗
  // 11 bomb
  const newBombBoard: number[][] = JSON.parse(JSON.stringify(BombBoard));
  const newUserBoard: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(UserBoard));
  const isPlaying = UserBoard.some((row) => row.some((input) => input !== 0));
  const isFailure = UserBoard.some((row, y) =>
    row.some((input, x) => input === 1 && BombBoard[y][x] === 1),
  );
  //爆弾を作成する
  const BombCreate = (x: number, y: number) => {
    for (let bombCount = 0; bombCount < 10; ) {
      const bombY = Math.floor(Math.random() * 9);
      const bombX = Math.floor(Math.random() * 9);
      if (newBombBoard[bombY][bombX] !== 1 && (bombY !== y || bombX !== x)) {
        newBombBoard[bombY][bombX] = 1;
        bombCount++;
      }
    }
  };
  //マスの周りに爆弾があるのかを確認する
  const checkAround = (x: number, y: number) => {
    let AroundBombCount = 0;
    for (const dir of directions) {
      if (Board[y + dir[1]] !== undefined && Board[y + dir[1]][x + dir[0]] !== undefined) {
        AroundBombCount += BombBoard[y + dir[1]][x + dir[0]];
      }
    }
    Board[y][x] = AroundBombCount;
    if (AroundBombCount === 0) {
      for (const dir of directions) {
        if (Board[y + dir[1]] !== undefined && Board[y + dir[1]][x + dir[0]] === -1) {
          checkAround(x + dir[0], y + dir[1]);
        }
      }
    }
  };
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (UserBoard[y][x] === 1) {
        if (BombBoard[y][x] === 1) {
          Board[y][x] = 11;
        } else {
          checkAround(x, y);
        }
      }
    }
  }
  //爆弾をクリックしたら全部表示させる
  if (isFailure) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (BombBoard[y][x] === 1) {
          Board[y][x] = 11;
        }
      }
    }
  }

  document.addEventListener('contextmenu', (event: MouseEvent) => {
    // 右クリック時のコンテキストメニューを無効化
    event.preventDefault();
    console.log('右クリックのコンテキストメニューが無効化されました');
  });
  const onFaceClick = () => {
    setBombBoard([
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
    setUserBoard([
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
  };
  //マスをクリックした際にどうするのか
  const onClick = (x: number, y: number) => {
    if (!isFailure) {
      newUserBoard[y][x] = 1;
      setUserBoard(newUserBoard);
      if (!isPlaying) {
        BombCreate(x, y);
      }

      let BombExist = false;
      for (const row of BombBoard) {
        for (const cell of row) {
          if (cell === 1) {
            BombExist = true;
            break;
          }
        }
      }
      setBombBoard(newBombBoard);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.baseStyle}>
        <div className={styles.scoreBaseStyle}>
          <div className={styles.scoreboardStyle} />
          <div onClick={onFaceClick} className={styles.resetBoardStyle} />
          <div className={styles.timeBoardStyle} />
        </div>
        <div className={styles.board}>
          {Board.map((row, y) =>
            row.map((color, x) => (
              <div
                className={`${color === -1 ? styles.stone : styles.bomb}`}
                key={`${x}-${y}`}
                onClick={() => onClick(x, y)}
                style={{ backgroundPosition: color * -30 + 30 }}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
