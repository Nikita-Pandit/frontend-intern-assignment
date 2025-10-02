
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function TaskCard({ task, onDelete, onToggle, onEdit }) {
  return (
    <div className="glass p-4 rounded-lg flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start gap-3">
          <h3 className="card-title text-lg truncate">{task.title}</h3>
          <span className="badge text-xs">{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
        {task.description && <p className="card-sub mt-2 line-clamp-3">{task.description}</p>}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggle(task)}
            className={`px-3 py-1 rounded ${task.completed ? "bg-green-600 text-white" : "btn-ghost"}`}
            aria-pressed={task.completed}
          >
            {task.completed ? "Completed" : "Mark"}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 rounded btn-ghost"
            title="Edit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="px-3 py-1 rounded bg-red-600/80 hover:bg-red-500 text-white"
            title="Delete"
          >
            Delete
          </button>
        </div>
        <div className="text-sm text-[rgba(255,255,255,0.55)]">{task.completed ? "Done" : "Open"}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/tasks");
      setTasks(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load tasks");
      
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    
  }, []);

  // add or update task
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return;
    try {
      setSubmitting(true);
      if (editingTask) {
        
        const { data } = await API.put(`/tasks/${editingTask._id}`, { title, description });
        setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      } else {
      
        const { data } = await API.post("/tasks", { title, description });
        setTasks((prev) => [data, ...prev]);
      }
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save task");
    } finally {
      setSubmitting(false);
    }
  };


  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

 
  const handleToggle = async (task) => {
    try {
      const { data } = await API.put(`/tasks/${task._id}`, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update");
    }
  };

    const openAddModal = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setModalOpen(true);
  };


  const openEditModal = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setError("");
  };


  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    (t.description || "").toLowerCase().includes(search.toLowerCase())
  );

 
  const handleLogout = () => {
    // logout();
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-80px)]">
      
      <div className="p-6">
        <div className="glass p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl card-title">Hello, {user?.name || "there"}</h1>
            <p className="card-sub">Your tasks and quick actions</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              className="input w-full md:w-64"
              placeholder="Search tasks by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tasks"
            />
            <button onClick={openAddModal} className="btn-primary" aria-label="New Task">New Task</button>
            <button onClick={handleLogout} className="btn-ghost" aria-label="Logout">Logout</button>
          </div>
        </div>

       
        {error && <div className="p-3 bg-red-600/10 text-red-200 rounded mb-4">{error}</div>}
        {loading && <div className="p-3 bg-[rgba(255,255,255,0.02)] rounded mb-4">Loading tasks...</div>}

        {!loading && tasks.length === 0 && (
          <div className="glass p-8 rounded text-center">
            <h3 className="card-title mb-2">No tasks yet</h3>
            <p className="card-sub mb-4">Create your first task — it's quick and easy.</p>
            <div className="flex items-center justify-center">
              <button onClick={openAddModal} className="btn-primary">Create task</button>
            </div>
          </div>
        )}

     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={openEditModal}
            />
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} aria-hidden="true" />

          <div className="relative w-full max-w-lg glass p-6 rounded-lg z-10">
            <h2 className="text-xl card-title mb-1">{editingTask ? "Edit Task" : "New Task"}</h2>
            <p className="card-sub mb-4">{editingTask ? "Update your task details." : "Add a task with title and optional description."}</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className="input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                aria-label="Task title"
              />
              <textarea
                className="input"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                aria-label="Task description"
              />
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={closeModal} className="btn-ghost">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? (editingTask ? "Saving..." : "Creating...") : (editingTask ? "Save" : "Create")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
