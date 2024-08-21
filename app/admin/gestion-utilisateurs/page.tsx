'use client';

import React, { useState, useEffect } from 'react';
import Loading from '@/components/Loading';
import UserTable from '@/components/Admin/Users/UserTable';
import FilterControls from '@/components/Admin/Users/FilterControls';
import Pagination from '@/components/Admin/Users/Pagination';
import { User } from '@/types/types';
import { fetchUsers, updateUserStatus } from '@/actions/user-actions';

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 9;

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers || []);
        setTotalPages(Math.ceil(fetchedUsers.length / pageSize));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleBlock = async (id: number) => {
    try {
      await updateUserStatus(id, 'Blocked');
      setUsers(users.map((user) => 
        user.id === id ? { ...user, blocked: true } : user
      ));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblock = async (id: number) => {
    try {
      await updateUserStatus(id, 'Confirmed');
      setUsers(users.map((user) => 
        user.id === id ? { ...user, blocked: false } : user
      ));
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const filteredUsers = users.filter((user) => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <div className="flex-grow container mx-auto pt-1 px-4">
        <FilterControls 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {loading ? (
          <Loading />
        ) : (
          <>
            <UserTable 
              users={paginatedUsers}
              handleBlock={handleBlock}
              handleUnblock={handleUnblock}
            />
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              handleNextPage={() => setCurrentPage(currentPage + 1)}
              handlePreviousPage={() => setCurrentPage(currentPage - 1)}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default UserPage;
