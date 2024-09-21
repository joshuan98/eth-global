"use client";

import { useCheckEligibility } from "@/lib/stores/balances";
import React, { useEffect, useState } from "react";

// Example JSON data for table rows
const applicationsData = [
  {
    universities: "National University of Singapore",
    amount: 5000,
    eligibility: "eligible",
  },
  {
    universities: "Nanyang Technological University",
    amount: 3000,
    eligibility: "not eligible",
  },
  {
    universities: "Singapore Management University",
    amount: 2000,
    eligibility: "eligible",
  },
];

export default function Home() {
  const check = useCheckEligibility();

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

  const handleEligibilityClick = (application: string) => {
    // Perform eligibility check
    check(profileData.monthlyIncome, profileData.householdMembers, profileData.studentIncome);

    // Introduce a delay before updating the state
    setTimeout(() => {
      // Update acceptedUniversity state to mark this application as accepted after delay
      setAcceptedUniversity(application);
    }, 5000); // 1000 milliseconds = 1 second delay
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
