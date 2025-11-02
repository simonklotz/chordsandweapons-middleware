import { InventoryStatus } from "../../models/inventory-status.type";

export const getInventoryStatus = (totalInventory: number): InventoryStatus => {
  if (totalInventory === 0) {
    return "out_of_stock";
  } else if (totalInventory <= 5) {
    return "low_stock";
  } else {
    return "in_stock";
  }
};
