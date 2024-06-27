import { useState, useEffect } from 'react';
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

  // タイマーの経過時間を管理するstate
  const [time, setTime] = useState(0);

  // ゲームが開始されたかどうかを管理するstate
  const [isGameStarted, setIsGameStarted] = useState(false);

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
  // 12 クリックされたbomb
  const newBombBoard: number[][] = JSON.parse(JSON.stringify(BombBoard));
  const newUserBoard: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(UserBoard));
  const isPlaying = UserBoard.some((row) => row.some((input) => input === 1));
  const isFailure = UserBoard.some((row, y) =>
    row.some((input, x) => input === 1 && BombBoard[y][x] === 1),
  );

  // タイマーを管理するエフェクト
  useEffect(() => {
    // インターバルIDを保持する変数
    let intervalId: number | null = null;

    // ゲームが開始され、かつ失敗していない場合
    if (isGameStarted && !isFailure) {
      // 1秒ごとにtimeを1増やす
      intervalId = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      // インターバルが設定されていれば、それをクリア
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [isGameStarted, isFailure]);

  //爆弾作成
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

  //周りを確かめていく
  const checkAround = (x: number, y: number) => {
    let AroundBombCount = 0;
    //空白連鎖で開いた部分の右クリックを無効化
    UserBoard[y][x] = 1;
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
  //リセットボタンの実装
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
    // ゲーム開始状態をfalseに設定
    setIsGameStarted(false);
    // タイマーを0にリセット
    setTime(0);
  };

  //爆弾をクリックしたら全部表示させる
  if (isFailure) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (BombBoard[y][x] === 1) {
          UserBoard[y][x] = 1;
          Board[y][x] = 11;
        }
      }
    }
  }
  const onClick = (x: number, y: number) => {
    if (!isFailure && UserBoard[y][x] !== 2 && UserBoard[y][x] !== 3) {
      // まだゲームが開始されていない場合、開始状態にする
      if (!isGameStarted) {
        setIsGameStarted(true);
      }
      newUserBoard[y][x] = 1;
      setUserBoard(newUserBoard);
      if (!isPlaying) {
        BombCreate(x, y);
      }
      if (BombBoard[y][x] === 1) {
        Board[y][x] = 12;
      }
    }
    setBombBoard(newBombBoard);
  };
  const onRightClick = (x: number, y: number, e: React.MouseEvent) => {
    e.preventDefault(); // デフォルトの右クリックメニューを防ぐ
    if (!isFailure && UserBoard[y][x] !== 1) {
      const newUserBoard = JSON.parse(JSON.stringify(UserBoard));
      // 0 → 2 → 3 → 0 のループを作成
      switch (newUserBoard[y][x]) {
        case 0:
          newUserBoard[y][x] = 2; // 未クリック → フラグ
          break;
        case 2:
          newUserBoard[y][x] = 3; // フラグ → ?マーク
          break;
        case 3:
          newUserBoard[y][x] = 0; // ?マーク → 未クリック
          break;
        default:
          newUserBoard[y][x] = 0; // 念のため
      }
      setUserBoard(newUserBoard);
    }
  };
  // 旗の残り数を管理するstate
  const [remainingFlags, setRemainingFlags] = useState(10);

  // UserBoard が変更されるたびに旗の数を計算しなおす
  useEffect(() => {
    // UserBoardを平坦化し、値が2（旗）のセルの数をカウント
    const flagCount = UserBoard.flat().filter((cell) => cell === 2).length;
    // 残りの旗の数を計算（10から使用された旗の数を引く）
    setRemainingFlags(10 - flagCount);
  }, [UserBoard]); // UserBoardが変更されるたびにこの効果を実行

  // 数字を3桁の文字列に変換する関数（負の数は -01 のように表示）
  const formatNumber = (num: number): string => {
    if (num >= 0) {
      // 正の数（0を含む）の場合、3桁で表示
      return num.toString().padStart(3, '0');
    } else {
      // 負の数の場合、2桁で表示し、前に'-'を付ける
      const absNum = Math.abs(num);
      return `-${absNum.toString().padStart(2, '0')}`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.baseStyle}>
        <div className={styles.scoreBaseStyle}>
          <div className={styles.scoreboardStyle}>{formatNumber(remainingFlags)}</div>
          <div onClick={onFaceClick} className={styles.resetBoardStyle} />
          <div className={styles.timeBoardStyle}>{formatNumber(time)}</div>
        </div>
        <div className={styles.board}>
          {Board.map((row, y) =>
            row.map((color, x) => (
              <div
                className={`${styles.bomb} ${Board[y][x] === 12 ? styles.clickedBomb : ''}`}
                key={`${x}-${y}`}
                onClick={() => onClick(x, y)}
                onContextMenu={(e) => onRightClick(x, y, e)}
                style={{ backgroundPosition: color * -30 + 30 }}
              >
                {UserBoard[y][x] === 0 && color === -1 && <div className={styles.stone} />}
                {UserBoard[y][x] === 2 && <div className={styles.flag} />}
                {UserBoard[y][x] === 3 && <div className={styles.question} />}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
