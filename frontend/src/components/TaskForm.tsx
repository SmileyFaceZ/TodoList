import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiPlus } from "react-icons/fi";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import api from "@/api";

export default function TaskForm({ onTaskAdded }) {
    const [priority, setPriority] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState<string | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, prioritiesRes] = await Promise.all([
                    api.get("/api/categories/"),
                    api.get("/api/priorities/"),
                ]);
                setCategory(categoriesRes.data);
                setPriority(prioritiesRes.data);
            } catch (error) {
                console.error("Error fetching data");
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries((formData as any).entries());

        try {
            const res = await api.post("/api/todos/", {
                title: data.title,
                description: data.description,
                priority_id: selectedPriority,
                category_id: selectedCategory,
            });
            onTaskAdded?.(res.data);

            form.reset();
            setSelectedPriority("");
            setSelectedCategory("");

            setOpenModal(false);
        } catch (error: any) {
            console.error("Error adding task");
        }
    };

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 
             bg-[length:200%_100%] bg-left hover:bg-right
             transition-all duration-500 ease-in-out text-white flex items-center gap-2 px-4 py-2 rounded-md shadow-md">
                    <FiPlus className="text-lg" />
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                        Fill in the details of your task. Click "Add Task" to save it.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Title */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Task Title"
                            className="col-span-3"
                            type="text"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Task Description"
                            className="col-span-3"
                            rows={3}
                        />
                    </div>

                    {/* Priority */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">Priority</Label>
                        <select
                            id="priority"
                            name="priority"
                            className="col-span-3 border rounded-md px-3 py-2 text-sm shadow-sm"
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            value={selectedPriority}
                            required
                        >
                            <option value="">Select Priority</option>
                            {priority.map((p: any) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <select
                            id="category"
                            name="category"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            value={selectedCategory}
                            className="col-span-3 border rounded-md px-3 py-2 text-sm shadow-sm"
                            required
                        >
                            <option value="">Select Category</option>
                            {category.map((c: any) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submit */}
                    <DialogFooter className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 
             bg-[length:200%_100%] bg-left hover:bg-right
             transition-all duration-500 ease-in-out text-white"
                        >
                            Add Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
