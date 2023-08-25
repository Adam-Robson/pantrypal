import { Link } from 'react-router-dom';

export default function MenuList(textVisible) {
  return (
    <div className="w-full floating-in flex justify-around">
    <ul className={ textVisible ? 'visible' : '' }>
      <li className="text-sm md:text-lg subpixel-antialiased">
        <Link className="menu-link subpixel-antialiased" to="/tutorial">tutorial</Link>
      </li>
      <li className="text-sm md:text-lg subpixel-antialiased">
        <Link className="menu-link subpixel-antialiased" to="/resources">resources</Link>
      </li>
      <li className="text-sm md:text-lg subpixel-antialiased">
        <Link className="menu-link subpixel-antialiased" to="/about">about</Link>
      </li>
    </ul>
    </div>
  );
}
