import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import api from "@/api";
import { useState, useEffect } from "react";

const TodoModal = ({
  todo,
  onClose,
  allPriorities,
  allCategories,
  formatDate,
  setTodoList,
}) => {
  if (!todo) return null;

  const [localTodo, setLocalTodo] = useState(todo);
  const [priorityPopoverOpen, setPriorityPopoverOpen] = useState(false);
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState(false);

  useEffect(() => {
    setLocalTodo(todo);
  }, [todo]);

  const updateTodoField = async (field, value, closePopover) => {
    try {
      const res = await api.patch(`/api/todos/${todo.id}/`, {
        [field]: value,
      });

      const updatedKey = field.split("_")[0];

      setTodoList((prev) =>
        prev.map((t) => (t.id === todo.id ? res.data : t))
      );

      setLocalTodo(res.data);

      closePopover(false);
    } catch (err) {
      console.error(`Failed to update ${field}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-5 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 break-words">{localTodo.title}</h2>
        <p className="mb-4 text-sm text-gray-700 break-words">{localTodo.description}</p>

        <div className="space-y-2 text-sm">
          {/* Priority */}
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-500">Priority:</span>
            <Popover
              open={priorityPopoverOpen}
              onOpenChange={setPriorityPopoverOpen}
              className="w-48"
            >
              <PopoverTrigger asChild>
                <button
                  className="text-white px-2 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: localTodo.priority?.color || "#808080",
                  }}
                >
                  {localTodo.priority?.name || "None"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 space-y-2">
                {allPriorities.map((priority) => (
                  <Button
                    key={priority.id}
                    variant="ghost"
                    className="w-full justify-start"
                    style={{
                      backgroundColor: priority.color,
                      color: "white",
                    }}
                    onClick={async () => {
                      await updateTodoField(
                        "priority_id",
                        priority.id,
                        setPriorityPopoverOpen
                      );
                    }}
                  >
                    {priority.name}
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {/* Category */}
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-500">Category:</span>
            <Popover
              open={categoryPopoverOpen}
              onOpenChange={setCategoryPopoverOpen}
              className="w-48"
            >
              <PopoverTrigger asChild>
                <button
                  className="text-white px-2 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: localTodo.category?.color || "#808080",
                  }}
                >
                  {localTodo.category?.name || "None"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 space-y-2">
                {allCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant="ghost"
                    className="w-full justify-start"
                    style={{
                      backgroundColor: cat.color,
                      color: "white",
                    }}
                    onClick={async () => {
                      await updateTodoField(
                        "category_id",
                        cat.id,
                        setCategoryPopoverOpen
                      );
                    }}
                  >
                    {cat.name}
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {/* Created/Updated */}
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Created:</span>
            <span>{formatDate(todo.created_at)}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Updated:</span>
            <span>{formatDate(localTodo.updated_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
