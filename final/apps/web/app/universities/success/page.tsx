"use client";

import React from "react";

// Example JSON data for table rows with student id and status
const studentApplicationsData = [
  { studentId: "B62qp54...zubzdhs", status: "accepted" },
  { studentId: "B73fa87...jsdfjw8", status: "accepted" },
  { studentId: "B12nd9x...hjy9w2l", status: "accepted" },
  { studentId: "B34ty18...kjf9w8k", status: "pending" },
  { studentId: "B85gh12...hw9d02j", status: "pending" },
];

export default function SuccessPage() {
  return (
    <div className="mx-auto h-full pt-16">
      <div className="flex flex-col items-center justify-center w-full h-full pt-16">

        {/* Welcome Text */}
        <h1 className="text-4xl font-bold text-black mb-8">
          Student Application Status
        </h1>

        {/* Table */}
        <div className="w-full max-w-4xl">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Student ID</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {studentApplicationsData.map((application, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{application.studentId}</td>
                  <td className="py-3 px-6 text-left">
                    {application.status === "accepted" ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded">
                        Accepted
                      </span>
                    ) : (
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded">
                        Pending
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
