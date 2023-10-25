export enum Order {
  newest = 1,
  oldest = 2,
}

export const OrderList: { key: number; name: string }[] = [
  {
    key: Order.newest,
    name: 'newest',
  },
  {
    key: Order.oldest,
    name: 'oldest',
  },
];
