import { useState, useEffect, useRef, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from '../authSlice';
import { AppDispatch, RootState } from '../../../app/store';
import { isAdmin } from '@/utils/adminUtils';
import AdminLoginModal from './AdminLoginModal';

function ProfileButton() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);

  const toggleMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;
  
    const closeMenu = (e: Event) => {
      if (ulRef.current && !ulRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
  
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(thunkLogout());
    setShowMenu(false);
    navigate('/');
  };

  const openAdminLogin = () => {
    setShowMenu(false);
    setShowAdminModal(true);
  };

  const handleAdminLoginSuccess = () => {
    setShowAdminModal(false);
    navigate('/admin/dashboard'); // Redirect to admin dashboard
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        <FaUserCircle className="text-2xl" />
      </button>

      {showMenu && (
        <ul
          ref={ulRef}
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
        >
          {user ? (
            <>
              <li className="px-4 py-2 text-sm border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{user.email}</span>
                  {isAdmin(user) && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </div>
              </li>
              {isAdmin(user) && (
                <li>
                  <button
                    onClick={() => {
                      navigate('/admin/dashboard');
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <i className="fas fa-shield-alt mr-2"></i>
                    Admin Dashboard
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate('/login');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                >
                  Log In
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                >
                  Sign Up
                </button>
              </li>
              <li className="border-t border-gray-200">
                <button
                  onClick={openAdminLogin}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                >
                  <i className="fas fa-shield-alt mr-2"></i>
                  Admin Login
                </button>
              </li>
            </>
          )}
        </ul>
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}

export default ProfileButton;
