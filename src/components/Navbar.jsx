import { navIcons, navLinks } from '#constants';
import dayjs from 'dayjs';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="relative w-full h-8 flex justify-between items-center bg-white/20 backdrop-blur-2xl px-4 select-none border-b border-white/10 shadow-sm z-[100] font-inter text-black">
      {/* Left side: Logo & Title */}
      <div className="flex items-center gap-2">
        <img src="/images/logo.svg" alt="logo" className="size-4" />
        <p className="font-bold text-[13px] font-mona tracking-tight flex items-center">
          Sruthika<span className="hidden sm:inline">'s Portfolio</span>
        </p>

        {/* Desktop Links - hidden on mobile */}
        <ul className="ml-4 hidden md:flex items-center">
          {navLinks.map(({ id, name }) => (
            <li key={id} className="cursor-pointer hover:bg-white/30 px-2.5 py-0.5 rounded-md transition-all text-[13px] font-medium">
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Icons & Time */}
      <div className="flex items-center gap-3">
        {/* Icons - hidden on mobile to keep it clean */}
        <ul className="hidden md:flex items-center gap-3">
          {navIcons.map(({ id, img }) => (
            <li key={id} className="p-1 hover:bg-white/30 rounded-md transition-all cursor-pointer">
              <img src={img} className="size-4 opacity-75" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        {/* Time - Always visible but more compact on mobile */}
        <time className="text-[13px] font-semibold opacity-90">
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
}

export default Navbar;


