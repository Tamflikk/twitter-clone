import React, { useContext } from 'react'
import { Home, Hash, Bell, Mail, Bookmark, User, MoreHorizontal, Twitter, Sun, Moon } from 'lucide-react'
import { ThemeContext } from '../App'

const SidebarItem = ({ Icon, text }: { Icon: React.ElementType; text: string }) => {
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <div className={`flex items-center space-x-2 px-4 py-3 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} cursor-pointer transition-colors duration-200`}>
      <Icon size={24} />
      <span className="hidden md:inline">{text}</span>
    </div>
  )
}

const Sidebar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="flex flex-col h-screen p-2 md:w-1/4">
      <div className="p-4">
        <Twitter size={32} className="text-blue-400" />
      </div>
      <nav className="space-y-2">
        <SidebarItem Icon={Home} text="Home" />
        <SidebarItem Icon={Hash} text="Explore" />
        <SidebarItem Icon={Bell} text="Notifications" />
        <SidebarItem Icon={Mail} text="Messages" />
        <SidebarItem Icon={Bookmark} text="Bookmarks" />
        <SidebarItem Icon={User} text="Profile" />
        <SidebarItem Icon={MoreHorizontal} text="More" />
      </nav>
      <button className="mt-5 bg-blue-400 text-white rounded-full py-3 px-8 font-bold shadow-md hover:bg-blue-500 transition-colors duration-200">
        Tweet
      </button>
      <button
        onClick={toggleTheme}
        className={`mt-5 flex items-center justify-center space-x-2 ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300'} rounded-full py-2 px-4 font-bold shadow-md transition-colors duration-200`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
      <div className="mt-auto mb-4 flex items-center space-x-2 px-4 pt-4">
        <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=AlejandroTamayo" alt="Alejandro" className="w-10 h-10 rounded-full" />
        <div className="hidden md:block">
          <p className="font-bold">Alejandro Tamayo</p>
          <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>@tamflikk</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar