import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    setUsers(users.filter(u => u.id !== id));
    await axios.delete(`http://localhost:5000/users/${id}`);
  };

  const updateUser = async (user) => {
    await axios.put(`http://localhost:5000/users/${user.id}`, user);
    setEditUser(null);
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>

      <UserForm
        fetchUsers={fetchUsers}
        editUser={editUser}
        updateUser={updateUser}
      />

      {users.map(user => (
        <div key={user.id}>
          {user.name} - {user.email} - {user.age}

          <button onClick={() => setEditUser(user)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;