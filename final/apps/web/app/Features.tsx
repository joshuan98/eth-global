export default function Features() {
  return (
    <section className="relative bg-gray-900 text-white py-16 overflow-hidden">
      {/* Glowing background with a rotating effect */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-30 animate-slow-spin"></div>
      </div>

      <div className="relative container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6 rounded-xl bg-gray-800 backdrop-blur-md bg-opacity-90 shadow-2xl z-10 border border-gray-700">
        {/* Left Section - Project Overview */}
        <div className="z-10">
          <h2 className="text-4xl font-bold mb-4">
            ZkScholar: A privacy-focused solution for student financial aid
          </h2>
          <p className="text-lg mb-6">
            A revolutionary decentralized app that makes financial aid applications faster and more private using zk-SNARKs, World ID, and USDC.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4.75A1.75 1.75 0 014.75 3h10.5A1.75 1.75 0 0117 4.75v10.5A1.75 1.75 0 0115.25 17H4.75A1.75 1.75 0 013 15.25V4.75zM4.75 4a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75V4.75a.75.75 0 00-.75-.75H4.75zM9 6.5a1.5 1.5 0 013 0v1.69a1.5 1.5 0 01-3 0V6.5zM6 9.25a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="transition-transform transform hover:scale-105">
                Privacy-Preserving: Students apply without revealing sensitive finances.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm4.72 7.06L9.72 7.7a.75.75 0 111.06 1.06l-2 2a.75.75 0 01-1.06 0l-1-1a.75.75 0 011.06-1.06l.94.94 1.72-1.72z" />
                </svg>
              </span>
              <span className="transition-transform transform hover:scale-105">
                Instant Aid: Funds disbursed via USDC directly to student wallets.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 2a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h2zm10 0h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V4a2 2 0 012-2z" />
                </svg>
              </span>
              <span className="transition-transform transform hover:scale-105">
                Secure Matching: Schools match students with aid based on encrypted eligibility.
              </span>
            </li>
          </ul>
        </div>

        {/* Right Section - Dynamic Financial Aid Application Table */}
        <div className="z-10 bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h3 className="text-gray-800 text-xl font-semibold mb-4">Aid Disbursement Table</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-gray-600 text-sm border-b">
                <th className="p-2">Student ID</th>
                <th className="p-2">Institution</th>
                <th className="p-2">Aid Disbursed (USDC)</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr className="border-b">
                <td className="p-2">0xA1B2C3</td>
                <td className="p-2">National University of Singapore</td>
                <td className="p-2">500 USDC</td>
                <td className="p-2 text-green-600">Disbursed</td>
              </tr>
              <tr>
                <td className="p-2">0xD4E5F6</td>
                <td className="p-2">University of Pennsylvania</td>
                <td className="p-2">1000 USDC</td>
                <td className="p-2 text-green-600">Disbursed</td>
              </tr>
              <tr>
                <td className="p-2">0xG7H8I9</td>
                <td className="p-2">Boston University</td>
                <td className="p-2">750 USDC</td>
                <td className="p-2 text-yellow-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
