import useUser from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/api";
import { useState, useEffect, use } from "react";
import TaskForm from "@/components/TaskForm";
import TodoModal from "@/components/TodoModal";

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

  const [allPriorities, setAllPriorities] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [priRes, catRes] = await Promise.all([
          api.get("/api/priorities/"),
          api.get("/api/categories/"),
        ]);
        setAllPriorities(priRes.data);
        setAllCategories(catRes.data);
      } catch (err) {
        console.error("Failed to fetch options", err);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      console.log("username", username);
      if (username === null) {
        return;
      }
      try {
        const response = await api.get("api/todos/");
        if (response.status === 401) {
          return;
        }

        setTodoList(response.data);
      } catch (err) {
        // alert("Error fetching todos");
      } finally {
        setDashboardLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <main className="flex-1 p-6 space-y-6">
        <div>
          {loading ? (
            <Skeleton className="w-80 h-7 mt-2" />
          ) : !username ? (
            <main className="flex-1 p-6 flex items-center justify-center">
              <h2 className="text-xl font-semibold text-gray-600">
                🚫 Please login before using the dashboard.
              </h2>
            </main>
          ) : (
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                Welcome back, {username} 👋
              </h1>

              <TaskForm
                onTaskAdded={(newTask) =>
                  setTodoList((prev) => [newTask, ...prev])
                }
              />
            </div>
          )}
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
                className="bg-white hover:shadow-lg transition-shadow duration-200 rounded-xl shadow-md p-6 border border-gray-100 cursor-pointer"
                onClick={() => setSelectedTodo(todo)}
              >
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <h2 className="text-xl font-semibold mb-1 break-words">
                      {todo.title}
                    </h2>
                    <p className="text-sm text-gray-600 break-words">
                      {todo.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Priority:</span>
                    <span
                      className="text-white px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: todo.priority?.color || "#808080",
                      }}
                    >
                      {todo.priority?.name || "None"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Category:</span>
                    <span
                      className="text-white px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: todo.category?.color || "#808080",
                      }}
                    >
                      {todo.category?.name || "None"}
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

        {/* Render Modal */}
        {selectedTodo && (
          <TodoModal
            todo={selectedTodo}
            onClose={() => setSelectedTodo(null)}
            allPriorities={allPriorities}
            allCategories={allCategories}
            formatDate={formatDate}
            setTodoList={setTodoList}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
