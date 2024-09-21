"use client";

import { useState, useEffect } from "react";
import { useWalletStore } from "@/lib/stores/wallet";
import Dropzone from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for the toasts
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

  // Load profileData from localStorage when the component mounts
  useEffect(() => {
    const storedProfileData = localStorage.getItem("profileData");
    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData));
    }
  }, []);

  // Function to handle changes in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: Number(value), // Ensure all fields are numbers
    }));
  };

  // Function to handle saving the data to localStorage and showing the success toast
  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    console.log("Profile data saved:", profileData);

    // Show success toast notification
    toast.success("Profile data saved successfully!", {
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
          <h1 className="text-xl font-bold mb-4">Financial Aid Profile</h1>

          {/* Display ID */}
          <div className="mb-4">
            <p className="text-gray-700">
              Profile ID:{" "}
              {wallet.wallet
                ? truncateMiddle(wallet.wallet, 7, 7, "...")
                : "Connect wallet first"}
            </p>
          </div>

          <div className="mb-4 w-full">
            <Dropzone
              onDrop={(acceptedFiles) => console.log(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dotted border-gray-300 bg-white hover:bg-gray-50 transition rounded-lg p-6 text-center cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-500">Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
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
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-150 ease-in-out p-3 text-base placeholder-gray-400"
              placeholder="Enter your monthly income"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-150 ease-in-out p-3 text-base placeholder-gray-400"
              placeholder="Enter number of household members"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-150 ease-in-out p-3 text-base placeholder-gray-400"
              placeholder="Enter your student income"
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
