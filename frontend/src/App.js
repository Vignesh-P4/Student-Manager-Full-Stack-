import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch Students
  const fetchStudents = async () => {
    const res = await axios.get('https://student-manager-full-stack.onrender.com/students');
    setStudents(res.data);
  };

  // Add Student
  const addStudent = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    if (!age || isNaN(age) || age <= 0) {
      toast.error("Age must be a valid number");
      return;
    }

    try {
      await axios.post('https://student-manager-full-stack.onrender.com/students', { name, age });
      toast.success("Student added successfully");
      setName('');
      setAge('');
      fetchStudents();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Update Student
  const updateStudent = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    if (!age || isNaN(age) || age <= 0) {
      toast.error("Age must be a valid number");
      return;
    }

    try {
      await axios.put(`https://student-manager-full-stack.onrender.com/students/${editId}`, { name, age });
      toast.success("Student updated");
      setName('');
      setAge('');
      setEditId(null);
      fetchStudents();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://student-manager-full-stack.onrender.com/students/${id}`);
      toast.success("Student deleted");
      fetchStudents();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // Start Editing
  const startEdit = (student) => {
    setName(student.name);
    setAge(student.age);
    setEditId(student.id);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-indigo-600 text-center">
          🎓 Student Manager
        </h1>

        <div className="flex flex-col gap-3 mb-6">
          <input
            className="border border-gray-300 rounded px-3 py-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded px-3 py-2"
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {editId ? (
            <button
              onClick={updateStudent}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
            >
              
              Update Student
            </button>
          ) : (
            <button
              onClick={addStudent}
              className="flex items-center justify-center gap-2 bg-green-600 text-white rounded py-2 hover:bg-green-700 transition"
            >
              Add Student
            </button>
          )}
        </div>

        <ul className="space-y-3">
          {students.map((s) => (
            <li
              key={s.id}
              className="flex justify-between items-center bg-gray-50 border p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300 animate-fade-in"
            >
              <span>{s.name} (Age: {s.age})</span>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(s)}
                  className="flex items-center gap-1 text-white bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(s.id)}
                  className="flex items-center gap-1 text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
