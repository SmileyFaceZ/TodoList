import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export default function TaskSettings() {
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [modalType, setModalType] = useState();
  const [formValue, setFormValue] = useState("");
  const [formColor, setFormColor] = useState("#a3a3a3");
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const [catRes, priRes] = await Promise.all([
      api.get("/api/categories/"),
      api.get("/api/priorities/"),
    ]);
    setCategories(catRes.data);
    setPriorities(priRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload =
        modalType === "priority"
          ? { name: formValue, color: formColor }
          : { name: formValue, color: formColor };

      if (editId) {
        await api.put(`/api/${modalType}/${editId}/`, payload);
      } else {
        if (modalType === "category") {
          await api.post(`/api/categories/`, payload);
        } else {
          await api.post(`/api/priorities/`, payload);
        }
      }

      setFormValue("");
      setFormColor("#a3a3a3");
      setEditId(null);
      setModalType(null);
      fetchData();
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  const handleDelete = async (type, id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${type}?`
    );
    if (!confirmed) return;

    try {
      console.log("Deleting:", type, id);
      await api.delete(`/api/${type}/${id}/`);
      fetchData();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const openModal = (type, name = "", id, color = "#a3a3a3") => {
    setModalType(type);
    setFormValue(name);
    setFormColor(color);
    setEditId(id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Task Settings</h1>

      {/* Categories */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Button
            onClick={() => openModal("category")}
            className="flex items-center gap-1"
          >
            <FiPlus /> Add Category
          </Button>
        </div>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-md"
            >
              <span
                className="font-medium text-white drop-shadow-sm px-2 py-0.5 rounded"
                style={{ backgroundColor: cat.color ?? "#e5e5e5" }}
              >
                {cat.name}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    openModal("category", cat.name, cat.id, cat.color)
                  }
                >
                  <FiEdit2 />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete("category", cat.id)}
                >
                  <FiTrash2 className="text-red-500" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Priorities */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Priorities</h2>
          <Button
            onClick={() => openModal("priority")}
            className="flex items-center gap-1"
          >
            <FiPlus /> Add Priority
          </Button>
        </div>
        <ul className="space-y-2">
          {priorities.map((pri) => (
            <li
              key={pri.id}
              className="flex bg-white justify-between items-center p-3 rounded-md"
            >
              <span
                className="font-medium text-white drop-shadow-sm px-2 py-0.5 rounded"
                style={{ backgroundColor: pri.color ?? "#e5e5e5" }}
              >
                {pri.name}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    openModal("priority", pri.name, pri.id, pri.color)
                  }
                >
                  <FiEdit2 />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete("priority", pri.id)}
                >
                  <FiTrash2 className="text-red-500" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Modal */}
      <Dialog open={!!modalType} onOpenChange={() => setModalType(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit" : "Add"} {modalType}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder={`Enter ${modalType} name`}
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              required
            />
            {/* Color picker for both categories and priorities */}
            {modalType && (
              <div className="space-y-2">
                <HexColorPicker color={formColor} onChange={setFormColor} />
                <div
                  className="h-8 w-full rounded-md border"
                  style={{ backgroundColor: formColor }}
                />
              </div>
            )}
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editId ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
