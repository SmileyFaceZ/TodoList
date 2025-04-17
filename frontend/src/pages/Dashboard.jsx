import useUser from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/api";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { username, email, loading } = useUser();
  const [todoList, setTodoList] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get("api/todos/");
        if (response.status !== 200) {
          throw new Error("Failed to fetch todos");
        }
        setTodoList(response.data);
        console.log(response.data); 
      } catch (err) {
        alert("Error fetching todos");
      } finally {
        setDashboardLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            {loading ? (
              <div>
                <Skeleton className="w-80 h-7 mt-2" />
              </div>
            ) : (
              <h1 className="text-2xl font-bold">
                Welcome back, {username} 👋
              </h1>
            )}
          </div>
        </div>

        {todoList.map((todo) => (
          <div className="bg-white rounded-xl shadow-md p-6" key={todo.id}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  {todo.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {todo.description}
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
                <span className="text-red-500">{todo.category.name}</span>
              </div>
              <div>Created on: 14/04/2025</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
