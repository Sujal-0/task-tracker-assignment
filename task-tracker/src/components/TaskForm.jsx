import React, { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

/**
 * TaskForm - Firstly single input when user clicks - that expands into a title + description layout.
 */
export default function TaskForm({ onSave, editTask = null }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [singleText, setSingleText] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });

  const textareaRef = useRef(null);
  const singleInputRef = useRef(null);

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title || "",
        description: editTask.description || "",
      });
      setSingleText(editTask.title || "");
      setIsExpanded(true);
      setTimeout(() => textareaRef.current && textareaRef.current.focus(), 50);
    } else {
      setForm({ title: "", description: "" });
      setSingleText("");
      setIsExpanded(false);
    }
  }, [editTask]);

  // Autosize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.max(38, ta.scrollHeight) + "px";
  }, [form.description, isExpanded]);

  const handleExpand = () => {
    // expand only when user interacts with it
    setIsExpanded(true);
    setForm((prev) => ({ ...prev, title: singleText }));
    setTimeout(() => textareaRef.current && textareaRef.current.focus(), 50);
  };

  const handleSingleChange = (e) => setSingleText(e.target.value);

  const handleSingleKeyDown = (e) => {
    // Expand on Enter or Space for keyboard users
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleExpand("user");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = (isExpanded ? form.title : singleText).trim();
    const description = (form.description || "").trim();

    if (!title && !description) return;

    const payload = {
      ...(editTask ? { id: editTask.id } : {}),
      title: title || description.slice(0, 40) || "Untitled task",
      description,
      completed: editTask ? !!editTask.completed : false,
    };

    onSave && onSave(payload);

    if (!editTask) {
      setSingleText("");
      setForm({ title: "", description: "" });
      setIsExpanded(false);
      // leave focus where it is; user can click to add again
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Collapsed single-line input (expands on click or keyboard) */}
          {!isExpanded && (
            <input
              ref={singleInputRef}
              type="text"
              value={singleText}
              onChange={handleSingleChange}
              onClick={() => handleExpand("user")}
              onKeyDown={handleSingleKeyDown}
              placeholder="Take a task..."
              aria-label="Take a task"
              className="w-full px-4 py-3 placeholder:text-slate-400 text-slate-800 focus:outline-none"
            />
          )}

          {/* Expanded area (it render only when expanded) */}
          {isExpanded && (
            <div aria-hidden={!isExpanded} className="w-full">
              <input
                name="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="Title"
                className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none text-slate-800"
              />

              <textarea
                name="description"
                ref={textareaRef}
                value={form.description}
                onChange={handleFormChange}
                placeholder="Describe the task..."
                rows={3}
                className="w-full px-4 py-3 resize-none focus:outline-none text-slate-700"
                style={{ minHeight: 64 }}
              />
            </div>
          )}
        </div>

        {/* Floating Add / Update button */}
        <button
          type="submit"
          aria-label={editTask ? "Update task" : "Add task"}
          className={`absolute right-3 -bottom-6 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg
            transform transition-all duration-300 ease-in-out
            ${
              isExpanded
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }
            bg-[#6B705C] hover:bg-[#59634f]`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Plus className="h-6 w-6 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#6B705C] text-[#000000] p-2 rounded-md text-xs font-light">
                  {editTask ? "Update Task" : "Add Task"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="sr-only">
            {editTask ? "Update task" : "Add task"}
          </span>
        </button>
      </div>
    </form>
  );
}
