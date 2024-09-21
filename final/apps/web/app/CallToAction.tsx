export default function CallToAction() {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Get notified when we’re launching</h2>
        <form className="flex justify-center space-x-4">
          <input
            type="text"
            placeholder="First Name"
            className="p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-white text-gray-900 px-6 py-3 rounded-md hover:bg-gray-100 transition">
            Notify Me
          </button>
        </form>
      </div>
    </section>
  );
}
