import React from 'react';
import { User } from '@/types/types';

interface UserTableProps {
  users: User[];
  handleBlock: (id: number) => void;
  handleUnblock: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, handleBlock, handleUnblock }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden table-fixed text-sm">
        <thead className="bg-[#f76545] text-white">
          <tr>
            <th className="w-1/4 py-2 px-3 text-left">Username</th>
            <th className="w-1/4 py-2 px-3 text-left">Email</th>
            <th className="w-1/4 py-2 px-3 text-left">Status</th>
            <th className="w-1/4 py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b cursor-pointer">
              <td className="w-1/4 py-2 px-3 text-black truncate">{user.username}</td>
              <td className="w-1/4 py-2 px-3 text-black truncate">{user.email}</td>
              <td className="w-1/4 py-2 px-3 text-black truncate">
                {user.blocked ? 'Blocked' : 'Active'}
              </td>
              <td className="w-1/4 py-2 px-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBlock(user.id);
                  }}
                  className="mr-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 text-xs"
                >
                  Block
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnblock(user.id);
                  }}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 text-xs"
                >
                  Unblock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
