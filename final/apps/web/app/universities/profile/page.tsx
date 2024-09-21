"use client";

import { useState, useEffect } from "react";
import { useWalletStore } from "@/lib/stores/wallet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for the toasts
import Image from "next/image";
import noun from "@/public/noun2.png";
// @ts-ignore
import truncateMiddle from "truncate-middle";
import { useUploadEligibility } from "@/lib/stores/balances";

export default function FinancialAidCriteriaPage() {
  const wallet = useWalletStore();
  const upload = useUploadEligibility();

  // Initial state for the fields
  const [criteriaData, setCriteriaData] = useState({
    residencyStatus: "singapore-citizen", // For dropdown
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

    upload(criteriaData.grossMonthlyIncome, criteriaData.grossMonthlyPerCapitaIncome);

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

          <Image
            className="w-16 h-16 mb-4"
            src={noun}
            alt={"Profile Icon"}
          />

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
            <div className="relative">
              <select
                name="residencyStatus"
                value={criteriaData.residencyStatus}
                onChange={handleChange}
                className="mt-1 block w-full appearance-none rounded-lg border border-gray-300 bg-white shadow-sm transition duration-150 ease-in-out pl-3 pr-10 py-3 text-base"
              >
                <option value="singapore-citizen">Singapore Citizen</option>
                <option value="singapore-pr">Singapore Permanent Resident</option>
                <option value="other">Others</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-4 w-4 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" />
                </svg>
              </div>
            </div>
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
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-150 ease-in-out p-3 text-base placeholder-gray-400"
              placeholder="Enter gross household income"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-150 ease-in-out p-3 text-base placeholder-gray-400"
              placeholder="Enter per capita household income"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition duration-150 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
