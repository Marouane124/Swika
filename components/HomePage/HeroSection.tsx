import React, { useState } from 'react';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import HeroSectionBg from '@/public/HeroSectionBg.png';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/annonces?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex justify-between items-center py-8 px-4 bg-white relative mt-10">
      <div className="flex flex-col max-w-md ml-16">
        <h1 className="text-6xl font-extrabold leading-tight text-black font-sans">
          ALL <br />
          YOU NEED <br />
          <span className="text-[#FF471C]">is</span> SWIKA
        </h1>
        <form onSubmit={handleSearch} className="relative mt-4">
          <input
            type="text"
            placeholder="Que recherchez-vous ?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-6 pr-14 py-3 text-lg border border-gray-300 rounded-full focus:outline-none text-black shadow-lg"
          />
          <button
            type="submit"
            className="hover:scale-110 absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#FF471C] w-10 h-10 rounded-full flex items-center justify-center"
          >
            <SearchIcon style={{ color: 'white' }} />
          </button>
        </form>
      </div>

      <div className="relative mr-16">
        <div className="absolute -top-6 -left-8 w-20 h-32 grid grid-cols-4 grid-rows-7 gap-2 mt-3">
          {[...Array(28)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-[#FF471C] rounded-full"></div>
          ))}
        </div>
        <Image src={HeroSectionBg} alt="Hero Image" width={400} height={400} className="rounded-lg relative z-10" />
      </div>
    </div>
  );
};

export default HeroSection;
