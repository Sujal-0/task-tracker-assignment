import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import FilterBar from "@/components/FilterBar";
import { fetchTasks, saveTasks } from "@/services/taskService";
import { uid } from "@/utils/uid";
import toast from "react-hot-toast";
import { PartyPopper, Trash2 } from "lucide-react";
import Footer from "@/components/Footer";

/**
 * Home - Single page connects all components - TaskForm, FilterBar, TaskList and persistence
 */
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("taskFilter") || "All";
  });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    setTasks(fetchTasks());
  }, []);

  // Persist filter selection
  useEffect(() => {
    localStorage.setItem("taskFilter", filter);
  }, [filter]);

  const saveAll = (next) => {
    setTasks(next);
    saveTasks(next);
  };

  const handleSave = (task) => {
    if (task.id) {
      // To update
      const updatedTasks = tasks.map((t) =>
        t.id === task.id
          ? { ...t, ...task, updatedAt: new Date().toISOString() }
          : t
      );
      saveAll(updatedTasks);

      toast.success(`Task updated — "${task.title}"`, {
        icon: <PartyPopper className="w-4 h-4 text-white" />,
        style: { background: "#D1CFC8", color: "#000000" },
      });
    } else {
      // To ADD new
      const newTask = {
        id: uid(),
        ...task,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveAll([newTask, ...tasks]);

      toast.success(`Task added — "${task.title}"`, {
        icon: <PartyPopper className="w-4 h-4 text-white" />,
        style: { background: "#6B705C", color: "#000000" },
      });
    }
    setEditTask(null);
  };

  // To DELETE
  const handleDelete = (id) => {
    const removed = tasks.find((t) => t.id === id);
    saveAll(tasks.filter((t) => t.id !== id));

    toast.error(`Task deleted — "${removed?.title ?? ""}"`, {
      icon: <Trash2 className="h-4 w-4 text-white" />,
      style: { background: "#9f0712", color: "#000000" },
    });
  };

  const handleToggle = (id) => {
    const next = tasks.map((t) => {
      if (t.id === id) {
        const now = new Date().toISOString();
        return {
          ...t,
          completed: !t.completed,
          completedAt: !t.completed ? now : null, // add or clear
        };
      }
      return t;
    });
    saveAll(next);

    const changed = next.find((t) => t.id === id);
    toast(
      `${changed.completed ? "Marked complete" : "Marked pending"} — "${
        changed.title
      }"`,
      {
        style: { background: "#6B705C", color: "#000000" },
      }
    );
  };

  // (Total Tasks) counts for FilterBar
  const counts = useMemo(() => {
    const all = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = all - completed;
    return { all, completed, pending };
  }, [tasks]);

  // filtered tasks derived from filter state
  const filteredTasks = useMemo(() => {
    if (filter === "Completed") return tasks.filter((t) => t.completed);
    if (filter === "Pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="grow mt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* We have to pass onSave and editTask */}
            <TaskForm onSave={handleSave} editTask={editTask} />
          </div>

          <div className="mt-6 border-b-2 border-gray-200 pb-6 mb-6"></div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="font-grotesk font-medium text-base sm:text-xl md:text-3xl tracking-tight text-center md:text-left leading-tight">
              TASKS
            </h2>

            <div className="flex items-center gap-4">
              <FilterBar value={filter} onChange={setFilter} counts={counts} />
              <div className="text-sm text-gray-600">
                Total Task:{" "}
                <span className="font-semibold text-slate-800">
                  {counts.all}
                </span>
              </div>
            </div>
          </div>

          <section className="mt-4">
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggle}
              onEdit={(t) => setEditTask(t)}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
