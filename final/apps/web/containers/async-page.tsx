"use client";

import React from "react";

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
  const handleEligibilityClick = (application: string) => {
    console.log(`${application} clicked!`);
    // Implement any functionality you'd want here
  };

  return (
    <div className="mx-auto h-full pt-16">
      <div className="flex flex-col items-center justify-center w-full h-full pt-16">

        {/* Welcome Text */}
        <h1 className="text-4xl font-bold text-black mb-8">
          Welcome to Your Dashboard
        </h1>

        {/* Table */}
        <div className="w-full max-w-4xl">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">My Applications</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Eligibility</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {applicationsData.map((application, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{application.universities}</td>
                  <td className="py-3 px-6 text-left">${application.amount}</td>
                  <td className="py-3 px-6 text-left">
                    {application.eligibility === "eligible" ? (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                        onClick={() => handleEligibilityClick(application.universities)}
                      >
                        Eligible
                      </button>
                    ) : (
                      <span className="text-gray-500">Not Eligible</span>
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
