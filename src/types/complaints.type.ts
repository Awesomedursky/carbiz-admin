import Customer from "./customer.type";

export interface ComplaintOutput {
  category: string;
  closedAt: Date;
  closedComplaintsNote: string;
  complaintID: string;
  createdAt: Date;
  customer: Customer;
  deletedAt: Date;
  description: string;
  id: Number;
  orderID: string;
  resolutionNotes: string;
  resolvedAt: Date;
  status: string;
  title: string;
  updatedAt: Date;
  proofImage: string;
}
