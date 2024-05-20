// import { useState } from 'react';
// import styles from './index.module.css';

// // 指定された初期ボード
// const initialBoard = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

// const placeMines = (board: number[][], mineCount: number, initialClick: [number, number]) => {
//   const rows = board.length;
//   const cols = board[0].length;
//   let minePlaced = 0;

//   while (minePlaced < mineCount) {
//     const row = Math.floor(Math.random() * rows);
//     const col = Math.floor(Math.random() * cols);

//     if (!(row === initialClick[0] && col === initialClick[1] || board[row][col] === )) {minePlaced++;
//   }}

//   return board;
// };

// const calculateNeighbors = (board: (number | '💣')[][]) => {
//   const directions = [
//     [0, 1],
//     [1, 0],
//     [0, -1],
//     [-1, 0],
//     [1, 1],
//     [1, -1],
//     [-1, 1],
//     [-1, -1],
//   ];

//   return board.map((row, rowIndex) =>
//     row.map((cell, colIndex) => {
//       if (cell === '💣') return cell;

//       let mineCount = 0;
//       directions.forEach(([dx, dy]) => {
//         const newRow = rowIndex + dx;
//         const newCol = colIndex + dy;

//         if (
//           newRow >= 0 &&
//           newRow < board.length &&
//           newCol >= 0 &&
//           newCol < row.length &&
//           board[newRow][newCol] === '💣'
//         ) {
//           mineCount++;
//         }
//       });

//       return mineCount;
//     }),
//   );
// };

// const Home = () => {
//   const [board, setBoard] = useState(initialBoard);
//   const [initialized, setInitialized] = useState(false);

//   const handleClick = (row: number, col: number) => {
//     if (!initialized) {
//       let newBoard = JSON.parse(JSON.stringify(initialBoard));
//       newBoard = placeMines(newBoard, 10, [row, col]);
//       newBoard = calculateNeighbors(newBoard);
//       setBoard(newBoard);
//       setInitialized(true);
//     }
//     const updatedBoard = JSON.parse(JSON.stringify(board));
//     updatedBoard[row][col] = board[row][col];
//     setBoard(updatedBoard);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.baseStyle}>
//         <div className={styles.scorebaseStyle}>
//           <div className={styles.resetboardStyle} />
//           <div className={styles.scoreboardStyle} />
//           <div className={styles.timeboardStyle} />
//         </div>
//         <div className={styles.boardWrapper}>
//           <div className={styles.boardStyle}>
//             {board.map((row, rowIndex) =>
//               row.map((cell, colIndex) => (
//                 <div
//                   className={styles.cellStyle}
//                   key={`${rowIndex}-${colIndex}`}
//                   onClick={() => handleClick(rowIndex, colIndex)}
//                 >
//                   {cell === 0 ? '' : cell === '💣' ? '' : cell}
//                 </div>
//               )),
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
// {
//   /* <div className={styles.board}>
//   {board.map((row, y) =>
//     row.map((color, x) => (
//       <div
//         className={styles.bomb}
//         key={`${x}-${y}`}
//         onClick={() => onClick(x, y)}
//         style={{ backgroundPosition: color * -30 + 30 }}
//       >
//         {color === -1 && <div className={styles.stone} />}
//       </div>
//     )),
//   )}
// </div>; */
// }
