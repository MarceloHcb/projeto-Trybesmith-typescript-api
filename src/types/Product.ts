export type Product = {
  id: number;
  name: string;
  price: string;
  orderId?: number;
};

export type ProductMock = {
  id?: number;
  name: string;
  price: string;
  orderId?: number;
};
