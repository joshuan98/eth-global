import { runtimeModule, state, runtimeMethod } from "@proto-kit/module";
import { State, StateMap, assert } from "@proto-kit/protocol";
import { Balance, Balances as BaseBalances, TokenId } from "@proto-kit/library";
import { PublicKey } from "o1js";

interface BalancesConfig {
  totalSupply: Balance;
}

// Define the structure for eligibility criteria
interface EligibilityCriteria {
  field1: number;
  field2: number;
  field3: number;
}

@runtimeModule()
export class Balances extends BaseBalances<BalancesConfig> {
  // State for circulating supply
  @state() public circulatingSupply = State.from<Balance>(Balance);

  // State for storing balances per address and tokenId
  @state() public balancesMapping = StateMap.from<[TokenId, PublicKey], Balance>();

  // State for eligibility criteria per address
  @state() public eligibilityCriteriaMapping = StateMap.from<PublicKey, EligibilityCriteria>();

  // State for financial aid amounts per address
  @state() public financialAidAmountMapping = StateMap.from<PublicKey, Balance>();

  // State for approved students per address (bool indicates approval status)
  @state() public approvedStudents = StateMap.from<PublicKey, boolean>();

  // Write method to update eligibility criteria and financial aid amount for the calling wallet
  @runtimeMethod()
  public async updateEligibilityCriteria(
    wallet: PublicKey,
    field1: number,
    field2: number,
    field3: number,
    financialAidAmount: Balance
  ): Promise<void> {
    // Update eligibility criteria for the wallet
    await this.eligibilityCriteriaMapping.set(wallet, { field1, field2, field3 });

    // Update financial aid amount for the wallet
    await this.financialAidAmountMapping.set(wallet, financialAidAmount);
  }

  // Method to check eligibility of a student for an institution
  // Mint tokens if eligible and not already approved
  @runtimeMethod()
  public async checkEligibility(
    studentKey: PublicKey,
    institutionKey: PublicKey,
    field1: number,
    field2: number,
    field3: number
  ): Promise<string> {
    // Check if the student has already been approved
    const studentApproved = await this.approvedStudents.get(studentKey);
    if (studentApproved) {
      return 'Student has already been approved';
    }

    // Retrieve the eligibility criteria for the student
    const criteria = await this.eligibilityCriteriaMapping.get(studentKey);

    // If no criteria is set, return 'no'
    if (!criteria) {
      return 'no';
    }

    // Check if all entered values are less than or equal to the mapped criteria
    const isEligible =
      field1 <= criteria.field1 &&
      field2 <= criteria.field2 &&
      field3 <= criteria.field3;

    if (isEligible) {
      // Mint financial aid tokens for the student if eligible
      const financialAidAmount = await this.financialAidAmountMapping.get(studentKey);
      assert(financialAidAmount, "No financial aid amount found for the student");

      const circulatingSupply = await this.circulatingSupply.get();
      const newCirculatingSupply = circulatingSupply.add(financialAidAmount);

      assert(
        newCirculatingSupply.lessThanOrEqual(this.config.totalSupply),
        "Circulating supply would exceed total supply"
      );

      await this.circulatingSupply.set(newCirculatingSupply);

      // Update the student's balance
      const currentBalance = await this.balancesMapping.get([TokenId, studentKey]) ?? Balance.from(0);
      const newBalance = currentBalance.add(financialAidAmount);
      await this.balancesMapping.set([TokenId, studentKey], newBalance);

      // Mark the student as approved
      await this.approvedStudents.set(studentKey, true);

      return 'yes';
    }

    return 'no';
  }
}
