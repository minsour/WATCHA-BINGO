import IBingoLine from "./bingLine";
import IBingoCell from './bingoCell';

export default interface IBingoBoard {
  bingoCells: IBingoCell[][];
  bingoLines: IBingoLine[];
}