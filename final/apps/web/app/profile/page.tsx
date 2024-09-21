"use client";

import { useState } from "react";
import { useWalletStore } from "@/lib/stores/wallet";
// @ts-ignore
import truncateMiddle from "truncate-middle";

export default function ProfilePage() {
  const wallet = useWalletStore();

  // Initial state for the fields
  const [profileData, setProfileData] = useState({
    monthlyIncome: 0,
    householdMembers: 0,
    studentIncome: 0,
  });

  // Function to handle changes in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: Number(value), // Ensure all fields are numbers
    }));
  };

  // Function to handle saving the data
  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    // Here you can make an API call or update the data wherever necessary
  };

  return (
    <div className="mx-auto -mt-32 h-full pt-16">
      <div className="flex h-full w-full items-center justify-center pt-16">
        <div className="flex basis-4/12 flex-col items-center justify-center 2xl:basis-3/12">
          <h1 className="text-xl font-bold mb-4">Financial Aid Profile</h1>

          {/* Display ID */}
          <div className="mb-4">
            <p className="text-gray-700">
              Profile ID: {wallet.wallet ? truncateMiddle(wallet.wallet, 7, 7, "...") : "Connect wallet first"}
            </p>
          </div>

          {/* Monthly Income Field */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700">
              Monthly Income
            </label>
            <input
              type="number"
              name="monthlyIncome"
              value={profileData.monthlyIncome}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Household Members Field */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700">
              Household Members
            </label>
            <input
              type="number"
              name="householdMembers"
              value={profileData.householdMembers}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Student Income Field */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700">
              Student Income
            </label>
            <input
              type="number"
              name="studentIncome"
              value={profileData.studentIncome}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
