import ProfileButton from "@/features/auth/ProfileButton"

const Navbar = () => {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-orange-500">
            JobHatch
          </a>
          <div className="space-x-6 hidden md:flex">
            <a href="#how" className="text-gray-600 hover:text-orange-500">How It Works</a>
            <a href="#features" className="text-gray-600 hover:text-orange-500">Features</a>
            <a href="#about" className="text-gray-600 hover:text-orange-500">About</a>
            <a
              href="/webapp"
              className="bg-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition"
            >
              Launch App
            </a>
          </div>
          <ProfileButton />
        </div>
      </nav>
    )
  }
  
  export default Navbar
  