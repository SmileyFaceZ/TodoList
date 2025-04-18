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

export default function TaskForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-md shadow-md transition duration-200">
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

                <form className="grid gap-4 py-4">
                    {/* Title */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input
                            id="title"
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
                            className="col-span-3"
                            rows={3}
                        />
                    </div>

                    {/* Due Date */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="due" className="text-right">Due Date</Label>
                        <Input
                            id="due"
                            type="date"
                            className="col-span-3"
                        />
                    </div>

                    {/* Priority */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">Priority</Label>
                        <select
                            id="priority"
                            className="col-span-3 border rounded-md px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            required
                        >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Category */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <select
                            id="category"
                            className="col-span-3 border rounded-md px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="home">Home</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Add Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
