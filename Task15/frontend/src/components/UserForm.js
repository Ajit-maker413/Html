import React, { useState, useEffect } from "react";
import axios from "axios";

function UserForm({ fetchUsers, editUser, updateUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editUser) {
      setForm(editUser);
    }
  }, [editUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editUser) {
      updateUser(form);
    } else {
      await axios.post("http://localhost:5000/users", form);
      fetchUsers();
    }

    setForm({ name: "", email: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e)=>setForm({...form, name: e.target.value})}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e)=>setForm({...form, email: e.target.value})}
      />

      <input
        placeholder="Age"
        value={form.age}
        onChange={(e)=>setForm({...form, age: e.target.value})}
      />

      <button type="submit">
        {editUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
}

export default UserForm;