import React, { useContext } from 'react'
import { Search } from 'lucide-react'
import { ThemeContext } from '../App'

const trends = [
  { id: 1, name: '#ReactJS', tweets: '25.5K' },
  { id: 2, name: '#ViteJS', tweets: '10.2K' },
  { id: 3, name: '#TailwindCSS', tweets: '15.7K' },
  { id: 4, name: '#WebDev', tweets: '32.1K' },
  { id: 5, name: '#JavaScript', tweets: '50.3K' },
]

const Widgets = () => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <div className="hidden lg:flex flex-col ml-8 w-1/4 space-y-5">
      <div className="sticky top-0 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search Twitter"
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} rounded-full py-2 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
        </div>
      </div>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-4`}>
        <h2 className="font-bold text-xl mb-4">What's happening</h2>
        {trends.map((trend) => (
          <div key={trend.id} className={`py-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors duration-200 cursor-pointer`}>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Trending</p>
            <p className="font-bold">{trend.name}</p>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{trend.tweets} Tweets</p>
          </div>
        ))}
        <button className="text-blue-400 hover:text-blue-500 mt-2">Show more</button>
      </div>
    </div>
  )
}

export default Widgets