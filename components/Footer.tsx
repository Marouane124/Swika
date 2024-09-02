import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#21443c] text-white py-8 px-10">
      <div className="container mx-auto flex flex-col items-center">
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[100px] text-center md:text-left">  {/* Use arbitrary gap value */}
            <div>
              <h3 className="font-bold mb-2">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/user-guides">User guides</Link></li>
                <li><Link href="/webinars">Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/contact">Contact us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Plans & Pricing</h3>
              <ul className="space-y-2">
                <li><Link href="/personal">Personal</Link></li>
                <li><Link href="/start-up">Start up</Link></li>
                <li><Link href="/organization">Organization</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-400 my-4 w-full" />

        <div className="text-center text-sm mt-4">
          <p className="text-gray-400">© 2024 Swika</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
