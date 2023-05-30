export type Order = {
  id: number;
  userId: number;
  productIds?: number[];
};

export type PostOrder = {
  userId: number;
  productIds?: number[];
};
