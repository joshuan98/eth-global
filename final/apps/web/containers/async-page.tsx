"use client";

import { useBalancesStore, useCheckEligibility } from "@/lib/stores/balances";
import { useWalletStore } from "@/lib/stores/wallet";
import React, { useEffect, useState } from "react";

// Example JSON data for table rows
const applicationsData = [
  {
    universities: "National University of Singapore",
    amount: 50000,
    eligibility: "eligible",
  },
  {
    universities: "Nanyang Technological University",
    amount: 30000,
    eligibility: "not eligible",
  },
  {
    universities: "Singapore Management University",
    amount: 20000,
    eligibility: "eligible",
  },
];

export default function Home() {
  const check = useCheckEligibility();
  const wallet = useWalletStore();
  const balances = useBalancesStore();

  const [balance, setBalance] = useState("");

  useEffect(() => {
    // Only calculate the balance when `balances.loading` is false and `wallet.wallet` is defined
    if (!balances.loading && wallet.wallet) {
      setBalance(balances.balances[wallet.wallet] || "");
    } else {
      setBalance("");
    }
  }, [balances.loading, wallet.wallet, balances.balances]); // Depend on balances.loading, wallet.wallet, and balances.balances


  // Initial state for the fields
  const [profileData, setProfileData] = useState({
    monthlyIncome: 0,
    householdMembers: 0,
    studentIncome: 0,
  });

  // State to track the accepted application
  const [acceptedUniversity, setAcceptedUniversity] = useState<string | null>(null);

  // Load profileData from localStorage when the component mounts
  useEffect(() => {
    const storedProfileData = localStorage.getItem("profileData");
    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData));
    }
  }, []);

  const handleEligibilityClick = async (application: string) => {
    // Perform eligibility check and await the result
    const res = await check(profileData.monthlyIncome, profileData.householdMembers, profileData.studentIncome);

    // Wait for 5 seconds (5000 milliseconds)
    await new Promise(resolve => setTimeout(resolve, 5000));

    setAcceptedUniversity(application);
  };

  return (
    <div className="mx-auto pt-16 flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Welcome to Your Dashboard
        </h1>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-6 text-left">My Applications</th>
                <th className="py-4 px-6 text-left">Amount</th>
                <th className="py-4 px-6 text-left">Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {applicationsData.map((application, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="py-3 px-6 text-left text-gray-800">{application.universities}</td>
                  <td className="py-3 px-6 text-left">${application.amount.toLocaleString()}</td>
                  <td className="py-3 px-6 text-left">
                    {acceptedUniversity ? (
                      acceptedUniversity === application.universities ? (
                        <span className="bg-green-700 text-white px-3 py-1 rounded-full">
                          Accepted
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )
                    ) : application.eligibility === "eligible" ? (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-700"
                        onClick={() => handleEligibilityClick(application.universities)}
                      >
                        Eligible
                      </button>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full">
                        Not Eligible
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
