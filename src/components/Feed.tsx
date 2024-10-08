import React, { useState, useContext } from 'react'
import { MessageCircle, Repeat2, Heart, Share } from 'lucide-react'
import { Tweet } from '../types'
import { ThemeContext } from '../App'

interface FeedProps {
  tweets: Tweet[];
  addTweet: (content: string) => void;
  onSelectTweet: (tweet: Tweet) => void;
}

const TweetComponent = ({ tweet, onSelect }: { tweet: Tweet; onSelect: (tweet: Tweet) => void }) => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <div className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-900' : 'border-gray-200 hover:bg-gray-50'} p-4 transition-colors duration-200`}>
      <div className="flex space-x-3">
        <img src={tweet.user.avatar} alt={tweet.user.name} className="w-12 h-12 rounded-full" />
        <div>
          <div className="flex items-center space-x-1">
            <span className="font-bold">{tweet.user.name}</span>
            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{tweet.user.username}</span>
            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>·</span>
            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{tweet.timestamp}</span>
          </div>
          <p className="mt-2">{tweet.content}</p>
          <div className="flex justify-between mt-3">
            <div 
              className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-500 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} cursor-pointer`}
              onClick={() => onSelect(tweet)}
            >
              <MessageCircle size={18} />
              <span>{tweet.comments.length}</span>
            </div>
            <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-500 hover:text-green-400' : 'text-gray-600 hover:text-green-500'}`}>
              <Repeat2 size={18} />
              <span>{tweet.retweets}</span>
            </div>
            <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-600 hover:text-red-500'}`}>
              <Heart size={18} />
              <span>{tweet.likes}</span>
            </div>
            <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-500 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`}>
              <Share size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Feed: React.FC<FeedProps> = ({ tweets, addTweet, onSelectTweet }) => {
  const [tweetContent, setTweetContent] = useState('')
  const { isDarkMode } = useContext(ThemeContext)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tweetContent.trim()) {
      addTweet(tweetContent)
      setTweetContent('')
    }
  }

  return (
    <div className={`flex-grow border-x ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} max-w-2xl`}>
      <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-black' : 'bg-white'} bg-opacity-80 backdrop-blur`}>
        <h2 className="px-4 py-3 text-xl font-bold">Home</h2>
      </div>
      <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <form onSubmit={handleSubmit}>
          <textarea
            className={`w-full ${isDarkMode ? 'bg-transparent text-white' : 'bg-white text-black'} placeholder-gray-500 outline-none resize-none`}
            placeholder="What's happening?"
            rows={3}
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
          ></textarea>
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-2 text-blue-400">
              {/* Add tweet composition icons here */}
            </div>
            <button
              type="submit"
              className="bg-blue-400 text-white rounded-full px-4 py-2 font-bold hover:bg-blue-500 transition-colors duration-200"
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet.id} tweet={tweet} onSelect={onSelectTweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed