export class PlaceOrderCommand {
  constructor(
    public readonly userId: number,
    public readonly symbol: string,
    public readonly type: 'BUY' | 'SELL',
    public readonly quantity: number,
    public readonly price: number,
  ) {}
}
