import RiderEntity from "./rider.type";

interface BankEntity {
  accountName: string;
  accountNumber: string;
  bankID: string;
  bankName: string;
  createdAT: Date;
  id: number;
  rider: RiderEntity;
  updatedAT: Date;
  bankCode: string;
}

export default BankEntity;
