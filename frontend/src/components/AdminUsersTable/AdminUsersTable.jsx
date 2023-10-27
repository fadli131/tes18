import React from 'react';
import AdminUsersTableRow from './AdminUsersTableRow';

function AdminUsersTable({ users, onDeleteUser }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <AdminUsersTableRow key={user._id} user={user} onDeleteUser={onDeleteUser} />
        ))}
      </tbody>
    </table>
  );
}

export default AdminUsersTable;
