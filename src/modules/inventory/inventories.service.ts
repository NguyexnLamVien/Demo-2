import { IInventory, Inventory } from "./inventories.model";


const addInv = async (input: IInventory) => {
    const inventory = await Inventory.create(input);
    return inventory;
};

export default { addInv }