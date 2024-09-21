"use client";

import { useState, useEffect } from "react";
import { useWalletStore } from "@/lib/stores/wallet";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for the toasts
// @ts-ignore
import truncateMiddle from "truncate-middle";

export default function FinancialAidCriteriaPage() {
  const wallet = useWalletStore();

  // Initial state for the fields
  const [criteriaData, setCriteriaData] = useState({
    residencyStatus: "", // For dropdown
    grossMonthlyIncome: 0,
    grossMonthlyPerCapitaIncome: 0,
  });

  // Load criteriaData from localStorage when the component mounts
  useEffect(() => {
    const storedCriteriaData = localStorage.getItem("criteriaData");
    if (storedCriteriaData) {
      setCriteriaData(JSON.parse(storedCriteriaData));
    }
  }, []);

  // Function to handle changes in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCriteriaData((prevData) => ({
      ...prevData,
      [name]: name === "residencyStatus" ? value : Number(value), // Ensure numbers for income fields
    }));
  };

  // Function to handle saving the data to localStorage and showing the success toast
  const handleSave = () => {
    localStorage.setItem("criteriaData", JSON.stringify(criteriaData));
    console.log("Financial Aid Criteria saved:", criteriaData);

    // Show success toast notification
    toast.success("Financial Aid Criteria saved successfully!", {
      position: "top-right",
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="mx-auto -mt-32 h-full pt-16">
      <ToastContainer /> {/* Toast container for showing notifications */}

      <div className="flex h-full w-full items-center justify-center pt-16">
        <div className="flex basis-4/12 flex-col items-center justify-center 2xl:basis-3/12">
          <h1 className="text-xl font-bold mb-4">University Financial Aid Criteria</h1>

          {/* Display ID */}
          <div className="mb-4">
            <p className="text-gray-700">
              University ID: {wallet.wallet ? truncateMiddle(wallet.wallet, 7, 7, "...") : "Connect wallet first"}
            </p>
          </div>

          {/* Residency Status Dropdown */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700">
              Residency Status
            </label>
            <select
              name="residencyStatus"
              value={criteriaData.residencyStatus}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select Residency Status</option>
              <option value="singapore-citizen">Singapore Citizen</option>
              <option value="singapore-pr">Singapore Permanent Resident</option>
              <option value="other">Others</option>
            </select>
          </div>

          {/* Gross Monthly Household Income (GHI) */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700">
              Gross Monthly Household Income (GHI)
            </label>
            <input
              type="number"
              name="grossMonthlyIncome"
              value={criteriaData.grossMonthlyIncome}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Gross Monthly Household Income Per Capita (PCI) */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700">
              Gross Monthly Household Income Per Capita (PCI)
            </label>
            <input
              type="number"
              name="grossMonthlyPerCapitaIncome"
              value={criteriaData.grossMonthlyPerCapitaIncome}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-black text-white font-bold rounded-md hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
