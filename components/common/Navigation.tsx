'use client';

import React from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import { scrollToElement } from '@/lib/utils';

interface INavigationProps {
  mobile?: boolean;
}

/**
 * Navigation component for header menu
 */
export const Navigation: React.FC<INavigationProps> = ({ mobile = false }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const elementId = href.substring(1);
      scrollToElement(elementId);
    }
  };

  const navClass = mobile
    ? 'flex flex-col space-y-4 py-4'
    : 'flex items-center space-x-8';

  const linkClass = mobile
    ? 'block py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-[#23CF65] dark:hover:text-[#23CF65] transition-colors'
    : 'text-gray-700 dark:text-gray-300 hover:text-[#23CF65] dark:hover:text-[#23CF65] transition-colors font-medium';

  return (
    <nav className={navClass}>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={(e) => handleClick(e, link.href)}
          className={linkClass}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
