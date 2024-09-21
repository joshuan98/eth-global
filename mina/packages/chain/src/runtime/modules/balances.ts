import { runtimeModule, state, runtimeMethod } from "@proto-kit/module";
import { State, assert } from "@proto-kit/protocol";
import { Balance, Balances as BaseBalances, TokenId } from "@proto-kit/library";
import { PublicKey, UInt64, Option } from "o1js";  // Use UInt64 and Option

interface BalancesConfig {
  totalSupply: Balance;
}

@runtimeModule()
export class Balances extends BaseBalances<BalancesConfig> {
  @state() public circulatingSupply = State.from<Balance>(Balance);

  // New state variables for eligibility criteria, stored as UInt64
  @state() public pci = State.from<UInt64>(UInt64);
  @state() public ghi = State.from<UInt64>(UInt64);

  // Method to add balance and check circulating supply
  @runtimeMethod()
  public async addBalance(
    tokenId: TokenId,
    address: PublicKey,
    amount: Balance
  ): Promise<void> {
    const circulatingSupply = await this.circulatingSupply.get();
    const newCirculatingSupply = Balance.from(circulatingSupply.value).add(amount);
    assert(
      newCirculatingSupply.lessThanOrEqual(this.config.totalSupply),
      "Circulating supply would be higher than total supply"
    );
    await this.circulatingSupply.set(newCirculatingSupply);
    await this.mint(tokenId, address, amount);
  }

  // Method to update eligibility criteria
  @runtimeMethod()
  public async updateEligibilityCriteria(
    pci: UInt64,
    ghi: UInt64,
  ): Promise<void> {
    // Convert number values to UInt64 before storing
    await this.pci.set(pci);
    await this.ghi.set(ghi);
  }

  // Method to check eligibility criteria
  @runtimeMethod()
  public async checkEligibilityCriteria(
    address: PublicKey,
    tokenId: TokenId,
    enteredMonthlyIncome: UInt64,
    enteredMembers: UInt64,
    enteredStudentIncome: UInt64
  ): Promise<boolean> {

    // Retrieve the stored values and handle the Option<UInt64> case
    const storedPciOption = await this.pci.get();
    const storedGhiOption = await this.ghi.get();

    // Unwrap the Option<UInt64>, providing default values if None
    const storedPci = storedPciOption.orElse(UInt64.from(0));
    const storedGhi = storedGhiOption.orElse(UInt64.from(1));  // Default to 1 to avoid division by 0

    // Calculate the average income for the entered and stored values
    const studentGhi = enteredMonthlyIncome.add(enteredStudentIncome).div(enteredStudentIncome);
    const studentPci = studentGhi.div(enteredMembers);

    const circulatingSupply = await this.circulatingSupply.get();
    
    const amount = Balance.from(50000);
    const newCirculatingSupply = Balance.from(circulatingSupply.value).add(amount);
    
    await this.mint(tokenId, address, amount);

    if (studentGhi.lessThanOrEqual(storedGhi) || studentPci.lessThanOrEqual(storedPci)) {
      return true;
    } else {
      return false;
    }
  }
}
