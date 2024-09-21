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
    <div className="mx-auto h-full pt-16 flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Student Application Status
        </h1>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Student ID</th>
                <th className="py-4 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentApplicationsData.map((application, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="py-3 px-6 text-left text-gray-800">{application.studentId}</td>
                  <td className="py-3 px-6 text-left">
                    {application.status === "accepted" ? (
                      <span className="inline-block bg-green-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                        Accepted
                      </span>
                    ) : (
                      <span className="inline-block bg-yellow-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
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
