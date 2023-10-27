import React, { useState, useEffect } from 'react';
import axios from '../Axios/axios';
import AdminUsersTable from './AdminUsersTable/AdminUsersTable';

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/getUsers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/deleteUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <AdminUsersTable users={users} onDeleteUser={deleteUser} />
    </div>
  );
}

export default AdminPanel;
