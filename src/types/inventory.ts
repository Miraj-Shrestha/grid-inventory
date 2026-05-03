export type Item = {
  id: string;
  name: string;
  type: string;
  width: number;
  height: number;
  color: string;
  gridX: number | null;
  gridY: number | null;
  isPlaced: boolean;
};
