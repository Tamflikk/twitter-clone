import React, { useState, useContext } from 'react'
import { ArrowLeft, MessageCircle, Repeat2, Heart, Share } from 'lucide-react'
import { Tweet } from '../types'
import { ThemeContext } from '../App'

interface TweetDetailsProps {
  tweet: Tweet;
  onClose: () => void;
  addComment: (tweetId: number, content: string) => void;
}

const TweetDetails: React.FC<TweetDetailsProps> = ({ tweet, onClose, addComment }) => {
  const [commentContent, setCommentContent] = useState('')
  const { isDarkMode } = useContext(ThemeContext)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentContent.trim()) {
      addComment(tweet.id, commentContent)
      setCommentContent('')
    }
  }

  return (
    <div className={`flex-grow border-x ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} max-w-2xl`}>
      <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-black' : 'bg-white'} bg-opacity-80 backdrop-blur`}>
        <div className="px-4 py-3 flex items-center">
          <button onClick={onClose} className="mr-4">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Tweet</h2>
        </div>
      </div>
      <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <div className="flex space-x-3">
          <img src={tweet.user.avatar} alt={tweet.user.name} className="w-12 h-12 rounded-full" />
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-bold">{tweet.user.name}</span>
              <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{tweet.user.username}</span>
            </div>
            <p className="mt-2 text-xl">{tweet.content}</p>
            <span className={`block mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{tweet.timestamp}</span>
            <div className="flex justify-between mt-3 border-t border-b py-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
              <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                <MessageCircle size={18} />
                <span>{tweet.comments.length}</span>
              </div>
              <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                <Repeat2 size={18} />
                <span>{tweet.retweets}</span>
              </div>
              <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                <Heart size={18} />
                <span>{tweet.likes}</span>
              </div>
              <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                <Share size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <form onSubmit={handleSubmit}>
          <textarea
            className={`w-full ${isDarkMode ? 'bg-transparent text-white' : 'bg-white text-black'} placeholder-gray-500 outline-none resize-none`}
            placeholder="Tweet your reply"
            rows={3}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-blue-400 text-white rounded-full px-4 py-2 font-bold hover:bg-blue-500 transition-colors duration-200"
            >
              Reply
            </button>
          </div>
        </form>
      </div>
      <div>
        {tweet.comments.map((comment) => (
          <div key={comment.id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
            <div className="flex space-x-3">
              <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full" />
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-bold">{comment.user.name}</span>
                  <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{comment.user.username}</span>
                </div>
                <p className="mt-1">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TweetDetails