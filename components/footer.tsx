import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoNoName from '@/public/LogoNoName.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 py-8">
      <div className="container mx-auto flex flex-col items-center">
        <Image src={LogoNoName} alt="Swika" width={100} height={50} />
        <p className="mt-4 mb-8 text-lg font-semibold">Abonnez-vous à notre newsletter</p>
        <div className="flex w-full max-w-sm mb-8">
          <input
            type="email"
            placeholder="Input your email"
            className="w-full p-2 border border-gray-300 rounded-l-md text-gray-700"
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition duration-300">
            Abonnez
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full text-center md:text-left">
          <div>
            <h3 className="font-bold mb-2">Product</h3>
            <ul>
              <li><Link href="/features" className="hover:underline">Features</Link></li>
              <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Resources</h3>
            <ul>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/user-guides" className="hover:underline">User guides</Link></li>
              <li><Link href="/webinars" className="hover:underline">Webinars</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Company</h3>
            <ul>
              <li><Link href="/about" className="hover:underline">About us</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Plans & Pricing</h3>
            <ul>
              <li><Link href="/personal" className="hover:underline">Personal</Link></li>
              <li><Link href="/start-up" className="hover:underline">Start up</Link></li>
              <li><Link href="/organization" className="hover:underline">Organization</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex space-x-4 mt-8">
          <Link href="https://www.twitter.com" aria-label="Twitter" className="text-gray-800 hover:text-purple-600">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.718 0-4.917 2.199-4.917 4.917 0 .386.044.762.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.423.726-.666 1.571-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.379 4.6 3.418-1.68 1.317-3.809 2.103-6.102 2.103-.396 0-.787-.023-1.174-.069 2.179 1.397 4.768 2.211 7.548 2.211 9.056 0 14.001-7.496 14.001-13.986 0-.213-.005-.426-.014-.637.961-.693 1.8-1.562 2.462-2.549z"/>
            </svg>
          </Link>
          <Link href="https://www.facebook.com" aria-label="Facebook" className="text-gray-800 hover:text-purple-600">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.344v21.312C0 23.4.6 24 1.325 24h11.52v-9.294H9.845v-3.622h2.999v-2.673c0-2.961 1.792-4.577 4.502-4.577 1.286 0 2.388.096 2.709.14v3.142h-1.857c-1.459 0-1.742.693-1.742 1.712v2.256h3.478l-.453 3.622h-3.025V24h5.933c.725 0 1.325-.6 1.325-1.344V1.344C24 .6 23.4 0 22.675 0z"/>
            </svg>
          </Link>
          <Link href="https://www.linkedin.com" aria-label="LinkedIn" className="text-gray-800 hover:text-purple-600">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.337-.025-3.062-1.865-3.062-1.868 0-2.154 1.459-2.154 2.967v5.699h-3v-11h2.881v1.5h.041c.402-.761 1.381-1.563 2.844-1.563 3.041 0 3.605 2.002 3.605 4.607v6.456z"/>
            </svg>
          </Link>
          <Link href="https://www.youtube.com" aria-label="YouTube" className="text-gray-800 hover:text-purple-600">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M23.499 6.203c-.272-1.042-1.079-1.857-2.127-2.126C19.476 3.438 12 3.438 12 3.438s-7.476 0-9.372.639c-1.048.269-1.855 1.084-2.127 2.126-.633 2.319-.633 7.151-.633 7.151s0 4.832.633 7.151c.272 1.042 1.079 1.857 2.127 2.126C4.524 20.562 12 20.562 12 20.562s7.476 0 9.372-.639c1.048-.269 1.855-1.084 2.127-2.126.633-2.319.633-7.151.633-7.151s0-4.832-.633-7.151zm-13.821 9.906v-7.479l6.485 3.748-6.485 3.731z"/>
            </svg>
          </Link>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-400">© 2024 Swika. Privacy · Terms · Sitemap</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
