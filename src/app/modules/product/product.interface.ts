export type TVariant = {
  type: string;
  value: string;
};
export type TInventory = {
  quantity: Number;
  inStock: boolean;
};
export type TProduct = {
  name: string;
  description: string;
  price: Number;
  category: string;
  tags: Array<string>;
  variants: Array<TVariant>;
  inventory: TInventory;
};
