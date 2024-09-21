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
  @state() public monthlyHouseholdIncome = State.from<UInt64>(UInt64);
  @state() public householdMembers = State.from<UInt64>(UInt64);
  @state() public studentIncome = State.from<UInt64>(UInt64);

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
    wallet: PublicKey,
    monthlyIncome: UInt64,
    members: UInt64,
    studentIncome: UInt64
  ): Promise<void> {
    // Convert number values to UInt64 before storing
    await this.monthlyHouseholdIncome.set(monthlyIncome);
    await this.householdMembers.set(members);
    await this.studentIncome.set(studentIncome);
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
    // Convert input values to UInt64 for comparison
    const enteredMonthlyIncomeUInt64 = UInt64.from(enteredMonthlyIncome);
    const enteredMembersUInt64 = UInt64.from(enteredMembers);
    const enteredStudentIncomeUInt64 = UInt64.from(enteredStudentIncome);

    // Retrieve the stored values and handle the Option<UInt64> case
    const storedMonthlyIncomeOption = await this.monthlyHouseholdIncome.get();
    const storedHouseholdMembersOption = await this.householdMembers.get();
    const storedStudentIncomeOption = await this.studentIncome.get();

    // Unwrap the Option<UInt64>, providing default values if None
    const storedMonthlyIncome = storedMonthlyIncomeOption.orElse(UInt64.from(0));
    const storedHouseholdMembers = storedHouseholdMembersOption.orElse(UInt64.from(1));  // Default to 1 to avoid division by 0
    const storedStudentIncome = storedStudentIncomeOption.orElse(UInt64.from(0));

    // Calculate the average income for the entered and stored values
    const enteredAverageIncome = enteredMonthlyIncome.add(enteredStudentIncome).div(enteredMembers);
    const storedAverageIncome = storedMonthlyIncome.add(storedStudentIncome).div(storedHouseholdMembers);
    

    const circulatingSupply = await this.circulatingSupply.get();
    
    const amount = Balance.from(50000);
    const newCirculatingSupply = Balance.from(circulatingSupply.value).add(amount);
    
    await this.mint(tokenId, address, amount);

    if (enteredAverageIncome.lessThanOrEqual(storedAverageIncome)) {
      return true;
    } else {
      return false;
    }
  }
}
