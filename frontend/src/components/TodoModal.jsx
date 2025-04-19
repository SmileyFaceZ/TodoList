import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import api from "@/api";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";

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
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocalTodo(todo);
    setIsEditing(false); // reset edit mode when opening a new todo
  }, [todo]);

  const updateTodoField = async (field, value, closePopover) => {
    try {
      const res = await api.patch(`/api/todos/${todo.id}/`, {
        [field]: value,
      });

      setTodoList((prev) => prev.map((t) => (t.id === todo.id ? res.data : t)));

      setLocalTodo(res.data);
      if (closePopover) closePopover(false);
    } catch (err) {
      console.error(`Failed to update ${field}`, err);
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const res = await api.patch(`/api/todos/${todo.id}/`, {
        title: localTodo.title,
        description: localTodo.description,
      });

      setTodoList((prev) => prev.map((t) => (t.id === todo.id ? res.data : t)));
      setLocalTodo(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save changes", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteTodo = async () => {
    if (!confirm("Are you sure you want to delete this todo?")) return;
    try {
      await api.delete(`/api/todos/${todo.id}/`);
      setTodoList((prev) => prev.filter((t) => t.id !== todo.id));
      onClose();
    } catch (err) {
      console.error("Failed to delete todo", err);
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

        {/* Editable Title */}
        {isEditing ? (
          <Input
            className="text-2xl font-bold mb-2"
            value={localTodo.title}
            onChange={(e) =>
              setLocalTodo({ ...localTodo, title: e.target.value })
            }
          />
        ) : (
          <h2 className="text-2xl font-bold mb-2 break-words">
            {localTodo.title}
          </h2>
        )}

        {isEditing ? (
          <Textarea
            className="mb-4"
            value={localTodo.description}
            onChange={(e) =>
              setLocalTodo({ ...localTodo, description: e.target.value })
            }
          />
        ) : (
          <p className="mb-4 text-sm text-gray-700 break-words">
            {localTodo.description}
          </p>
        )}

        <div className="space-y-2 text-sm">
          {/* Priority */}
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-500">Priority:</span>
            <Popover
              open={priorityPopoverOpen}
              onOpenChange={setPriorityPopoverOpen}
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
                    onClick={() =>
                      updateTodoField(
                        "priority_id",
                        priority.id,
                        setPriorityPopoverOpen
                      )
                    }
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
                    onClick={() =>
                      updateTodoField(
                        "category_id",
                        cat.id,
                        setCategoryPopoverOpen
                      )
                    }
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
            <span>{formatDate(localTodo.created_at)}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Updated:</span>
            <span>{formatDate(localTodo.updated_at)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setIsEditing((prev) => !prev)}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <FiX /> Cancel
              </>
            ) : (
              <>
                <FiEdit /> Edit
              </>
            )}
          </Button>

          {isEditing ? (
            <Button
              onClick={saveChanges}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <FiCheck />
              {saving ? "Saving..." : "Save"}
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={deleteTodo}
              className="flex items-center gap-2"
            >
              <FiTrash /> Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
