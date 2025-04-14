const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Sundar 👋</h1>
            <p className="text-sm text-gray-500">Monday • 14/04/2025</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">
                Attend Nischal's Birthday Party
              </h2>
              <p className="text-sm text-gray-500">
                Buy gifts and pick up cake. (6 PM | Fresh Elements)
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div>
              <span className="font-medium">Priority:</span>{" "}
              <span className="text-yellow-600">Moderate</span>
            </div>
            <div>
              <span className="font-medium">Status:</span>{" "}
              <span className="text-red-500">Not Started</span>
            </div>
            <div>Created on: 14/04/2025</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
