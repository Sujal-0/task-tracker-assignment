import TaskItem from "./TaskItem";

/**
 * TaskList - This component renders entire list of tasks (grid)
 * Props:
 *  - tasks: Array
 *  - onToggle(id)
 *  - onEdit(task)
 *  - onDelete(id)
 */
export default function TaskList({ tasks = [], onToggle, onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No tasks yet. Add your first task!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
