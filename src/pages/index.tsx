import { useState } from 'react';
import styles from './index.module.css';

interface CellData {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const generateEmptyBoard = (rows: number, cols: number): CellData[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    })),
  );
};

const placeMines = (
  board: CellData[][],
  mineCount: number,
  initialClick: [number, number],
): CellData[][] => {
  const rows = board.length;
  const cols = board[0].length;
  let minesPlaced = 0;

  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if ((row === initialClick[0] && col === initialClick[1]) || board[row][col].isMine) {
      continue;
    }

    board[row][col].isMine = true;
    minesPlaced++;
  }

  return board;
};

const calculateNeighbors = (board: CellData[][]): CellData[][] => {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  return board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (cell.isMine) return cell;

      let mineCount = 0;
      directions.forEach(([dx, dy]) => {
        const newRow = rowIndex + dx;
        const newCol = colIndex + dy;

        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < row.length &&
          board[newRow][newCol].isMine
        ) {
          mineCount++;
        }
      });

      return { ...cell, neighborMines: mineCount };
    }),
  );
};

const revealCell = (board: CellData[][], row: number, col: number): void => {
  const cell = board[row][col];
  if (cell.isRevealed || cell.isFlagged) return;
  cell.isRevealed = true;

  if (cell.neighborMines === 0 && !cell.isMine) {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length &&
        !board[newRow][newCol].isRevealed
      ) {
        revealCell(board, newRow, newCol); // 再帰呼び出しでボードを更新
      }
    });
  }
};

const Home = () => {
  const [board, setBoard] = useState<CellData[][]>(generateEmptyBoard(9, 9));
  const [initialized, setInitialized] = useState(false);

  const handleClick = (row: number, col: number) => {
    if (!initialized) {
      let newBoard = generateEmptyBoard(9, 9);
      newBoard = placeMines(newBoard, 10, [row, col]);
      newBoard = calculateNeighbors(newBoard);
      revealCell(newBoard, row, col); // 初期クリックでセルを開く
      setBoard(newBoard);
      setInitialized(true);
    } else if (!board[row][col].isRevealed) {
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell }))); // 深いコピーを作成
      revealCell(newBoard, row, col);
      setBoard(newBoard);
    }
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
              row.map((cell, x) => (
                <div
                  className={styles.cellStyle}
                  key={`${x}-${y}`}
                  onClick={() => handleClick(y, x)}
                >
                  {cell.isRevealed && (cell.isMine ? '💣' : cell.neighborMines || '')}
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
