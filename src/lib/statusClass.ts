const Status = {
  processing: "bg-[#E2DAF4] text-[#7046C6]",
  shipped: "bg-[#FFF7E1] text-[#DC6803]",
  closed: "bg-[#FEE4E2] text-[#B42318]",
  paid: "bg-[#D1FADF] text-[#027A48]",
  payment_confirmed: "bg-[#D1FADF] text-[#027A48]",
  delivered: "text-[#027A48] bg-[#D1FADF]",
  cancelled: "bg-[#FEE4E2] text-[#B42318]",
  awaiting: "text-[#343239] bg-[#E6E5E8]",
  packed_and_ready_for_pickup: "text-[#343239] bg-[#E6E5E8]",
  refunded: "text-[#DC6803] bg-[#FFF7E1]",
  inprogress: "bg-[#E2DAF4] text-[#7046C6]",
  resolved: "text-[#027A48] bg-[#D1FADF]",
  awaiting_rider_acceptance: "bg-[#BBE4E2] text-[#027A48]",
  rider_assigned: "bg-[#BBE4E2] text-[#027A48]",
};

export type StatusKey = keyof typeof Status;

export default Status;
