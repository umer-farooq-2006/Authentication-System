"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TaskForm, { Task } from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import { useRouter } from "next/navigation";

const initialTasks: Task[] = [
  { id: 1, title: "Design homepage mockup", description: "Create wireframes and high-fidelity designs for the new homepage", completed: true, createdAt: new Date("2026-03-20") },
  { id: 2, title: "Implement user authentication", description: "Set up login, signup, and password reset functionality", completed: false, createdAt: new Date("2026-03-22") },
  { id: 3, title: "Set up database schema", description: "Design and implement the database structure for users and tasks", completed: false, createdAt: new Date("2026-03-24") },
  { id: 4, title: "Write documentation", description: "Document API endpoints and component usage", completed: false, createdAt: new Date("2026-03-25") },
];

export default function DashboardPage() {
  const router = useRouter();
  const userName = "John";
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const editTask = (id: number, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleLogout = () => {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.clear(); // sab clean
    router.push("/signin");
  }
};

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={userName} onLogout={handleLogout} />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome, {userName} 👋</h2>
          <p className="mt-1 text-sm text-gray-600">
            You have {pendingCount} pending {pendingCount === 1 ? "task" : "tasks"} and {completedCount} completed
          </p>
        </div>

        <div className="mb-8">
          <TaskForm onAddTask={addTask} />
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks yet</h3>
              <p className="mt-2 text-sm text-gray-600">Get started by creating your first task above.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleComplete}
                onEdit={editTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
