export const formatAmount = (amount: number): string => {
  const absAmount = Math.abs(amount);
  return `N${absAmount.toLocaleString()}`;
};
