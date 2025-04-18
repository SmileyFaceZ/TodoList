import useUser from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/api";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import TaskForm from "@/components/TaskForm";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

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
              <Skeleton className="w-80 h-7 mt-2" />
            ) : (
              <h1 className="text-2xl font-bold">
                Welcome back, {username} 👋
              </h1>
            )}
          </div>
          
          <TaskForm />
        </div>

        {dashboardLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {todoList.map((todo) => (
              <div
                key={todo.id}
                className="bg-white hover:shadow-lg transition-shadow duration-200 rounded-xl shadow-md p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{todo.title}</h2>
                    <p className="text-sm text-gray-600">{todo.description}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Priority:</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                      {todo.priority?.name || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Category:</span>
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">
                      {todo.category?.name || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Created:</span>
                    <span>{formatDate(todo.created_at)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Updated:</span>
                    <span>{formatDate(todo.updated_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
