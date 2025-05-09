import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-600 hover:text-blue-600 transition';

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Sol taraf linkler */}
        <div className="flex space-x-6">
          <Link to="/" className={linkClass('/')}>Dashboard</Link>
          <Link to="/todos" className={linkClass('/todos')}>Todo Listesi</Link>
          <Link to="/categories" className={linkClass('/categories')}>
            Kategoriler
          </Link>
        </div>

        {/* Sağ taraf buton */}
        <Link to="/todos/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Yeni Todo
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;