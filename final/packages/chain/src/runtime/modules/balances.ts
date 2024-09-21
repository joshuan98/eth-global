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
  @state() public pci = State.from<Balance>(Balance);
  @state() public ghi = State.from<Balance>(Balance);

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
    pci: Balance,
    ghi: Balance,
  ): Promise<void> {

    const balancePci = pci
    const balanceGhi = ghi
    await this.pci.set(balancePci);
    await this.ghi.set(balanceGhi);
  }

  // Method to check eligibility criteria
  @runtimeMethod()
  public async checkEligibilityCriteria(
    address: PublicKey,
    tokenId: TokenId,
    enteredMonthlyIncome: Balance,
    enteredMembers: Balance,
    enteredStudentIncome: Balance
  ): Promise<boolean> {

    // Retrieve the stored values and handle the Option<UInt64> case
    const storedPciOption = await this.pci.get();
    const storedGhiOption = await this.ghi.get();

    // Unwrap the Option<UInt64>, providing default values if None
    const storedPci = storedPciOption.orElse(Balance.from(0));
    const storedGhi = storedGhiOption.orElse(Balance.from(1));  // Default to 1 to avoid division by 0

    // Calculate the average income for the entered and stored values
    const studentGhiBalance = enteredMonthlyIncome.add(enteredStudentIncome);
    const studentPciBalance = studentGhiBalance.div(enteredMembers);
    assert(studentGhiBalance.lessThanOrEqual(storedGhi) || studentPciBalance.lessThanOrEqual(storedPci),
    "You are not eligible for this financial aid program."); 

    if (studentGhiBalance.lessThanOrEqual(storedGhi) || studentPciBalance.lessThanOrEqual(storedPci)) {
      const amount = Balance.from(50000);
      const circulatingSupply = await this.circulatingSupply.get();
      const newCirculatingSupply = Balance.from(circulatingSupply.value).add(amount);

      await this.mint(tokenId, address, amount);

      return true;
    } else {
      return false;
    }
  }
}
