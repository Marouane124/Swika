import React from 'react';
import { Annonce } from '@/types/types';

interface AnnonceTableProps {
  annonces: Annonce[];
  handleAnnonceClick: (annonce: Annonce) => void;
  handleApprove: (id: number) => void;
  handleReject: (id: number) => void;
}

const AnnonceTable: React.FC<AnnonceTableProps> = ({ annonces, handleAnnonceClick, handleApprove, handleReject }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden table-fixed text-sm"> {/* Reduced font size */}
        <thead className="bg-[#f76545] text-white">
          <tr>
            <th className="w-1/4 py-2 px-3 text-left">Title</th> {/* Reduced padding */}
            <th className="w-1/5 py-2 px-3 text-left">Category</th>
            <th className="w-1/6 py-2 px-3 text-left">Statut</th>
            <th className="w-1/5 py-2 px-3 text-left">User</th>
            <th className="w-1/4 py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {annonces.map((annonce) => (
            <tr key={annonce.id} className="border-b cursor-pointer" onClick={() => handleAnnonceClick(annonce)}>
              <td className="w-1/4 py-2 px-3 text-black truncate">{annonce.attributes.title}</td>
              <td className="w-1/5 py-2 px-3 text-black truncate">{annonce.attributes.category}</td>
              <td className="w-1/6 py-2 px-3 text-black truncate">{annonce.attributes.Statut || 'N/A'}</td>
              <td className="w-1/5 py-2 px-3 text-black truncate">
                {annonce.attributes.users_permissions_user?.username || 'N/A'}
              </td>
              <td className="w-1/4 py-2 px-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(annonce.id);
                  }}
                  className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 text-xs" // Smaller button size
                >
                  Valider
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(annonce.id);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 text-xs" // Smaller button size
                >
                  Rejeter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnonceTable;
