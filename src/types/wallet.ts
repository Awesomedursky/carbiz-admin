type WalletEntity = {
  balance: number;
  createdAT: Date;
  id: number;
  isActive: Boolean;
  updatedAT: Date;
  walletAddrress: string;
  riderId?: number;
};

export default WalletEntity
