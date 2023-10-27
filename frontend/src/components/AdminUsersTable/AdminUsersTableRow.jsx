import React from 'react';

function AdminUsersTableRow({ user, onDeleteUser }) {
  const handleDelete = () => {
    onDeleteUser(user._id);
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default AdminUsersTableRow;
