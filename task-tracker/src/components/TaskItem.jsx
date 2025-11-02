import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Pencil, Trash2, Clock, RefreshCw, CheckCircle } from "lucide-react";

/**
 * TaskItem - Displays a single task row with timestamps and completion state.
 * Props include:
 *  - onToggle(id)
 *  - onEdit(task)
 *  - onDelete(id)
 */
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-start md:justify-between gap-3 hover:shadow-md transition-shadow duration-200">
      {/* Left Side: checkbox + content */}
      <div className="flex items-start gap-3 w-full">
        {/* Checkbox */}
        <div className="shrink-0">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!!task.completed}
              onChange={() => onToggle(task.id)}
              aria-label={`Mark ${task.title} as ${
                task.completed ? "pending" : "completed"
              }`}
              className="peer appearance-none w-5 h-5 border-2 border-[#6B705C] rounded-md cursor-pointer transition-all duration-200
                         checked:bg-[#6B705C] checked:border-[#6B705C] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#6B705C]"
            />
            <span className="absolute text-white text-sm font-bold left-1 -top-px opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none">
              ✓
            </span>
          </label>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm md:text-base ${
              task.completed
                ? "line-through text-gray-400"
                : "text-slate-800 font-medium"
            }`}
          >
            {task.title}
          </div>

          {task.description && (
            <div className="text-xs md:text-sm text-gray-500 mt-1 wrap-break-words">
              {task.description}
            </div>
          )}

          {/* timestamps */}
          {(task.createdAt || task.updatedAt || task.completedAt) && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-[11px] md:text-sm text-gray-400 mt-2 space-y-1 sm:space-y-0">
              {task.createdAt && (
                <div className="flex items-center gap-1">
                  <Clock
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-400 shrink-0"
                    aria-hidden
                  />
                  <span>
                    Added on{" "}
                    <span className="text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>
              )}

              {task.updatedAt && task.updatedAt !== task.createdAt && (
                <div className="flex items-center gap-1">
                  <RefreshCw
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-400 shrink-0"
                    aria-hidden
                  />
                  <span>
                    Updated on{" "}
                    <span className="text-gray-500">
                      {new Date(task.updatedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>
              )}

              {task.completed && task.completedAt && (
                <div className="flex items-center gap-1">
                  <CheckCircle
                    className="w-4 h-4 md:w-5 md:h-5 text-[#6B705C] shrink-0"
                    aria-hidden
                  />
                  <span className="text-[#6B705C] font-medium">
                    Completed on{" "}
                    <span className="text-[#36513f]">
                      {new Date(task.completedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 ml-0 md:ml-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onEdit(task)}
                className="text-[#000000] hover:text-[#00000080] cursor-pointer p-1"
                aria-label="Edit"
              >
                <Pencil className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="bg-[#6B705C] text-[#000000] p-2 rounded-md text-xs font-light">
                Edit Task
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onDelete(task.id)}
                className="text-[#000000] hover:text-[#00000080] cursor-pointer p-1"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="bg-[#6B705C] text-[#000000] p-2 rounded-md text-xs font-light">
                Delete Task
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
