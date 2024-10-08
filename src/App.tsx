import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Widgets from './components/Widgets'
import TweetDetails from './components/TweetDetails'
import { Tweet, Comment } from './types'

export const ThemeContext = React.createContext({
  isDarkMode: true,
  toggleTheme: () => {},
})

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: 1,
      user: {
        name: 'John Doe',
        username: '@johndoe',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
      },
      content: 'Just had an amazing coffee! ☕️ #CoffeeLovers',
      timestamp: '2h ago',
      likes: 15,
      retweets: 5,
      comments: [
        { id: 1, content: 'Sounds delicious!', user: { name: 'Coffee Fan', username: '@coffeefan', avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=CoffeeFan' } },
        { id: 2, content: 'Where did you get it?', user: { name: 'Curious George', username: '@curiousgeorge', avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=CuriousGeorge' } },
      ],
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        username: '@janesmith',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Jane',
      },
      content: 'Working on a new project. Can\'t wait to share it with you all! 🚀 #CodingLife',
      timestamp: '5h ago',
      likes: 32,
      retweets: 8,
      comments: [
        { id: 3, content: 'Can\'t wait to see it!', user: { name: 'Tech Enthusiast', username: '@techenthusiast', avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=TechEnthusiast' } },
      ],
    },
  ])
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const addTweet = (content: string) => {
    const newTweet: Tweet = {
      id: tweets.length + 1,
      user: {
        name: 'Alejandro Tamayo',
        username: '@tamflikk',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=AlejandroTamayo',
      },
      content,
      timestamp: 'Just now',
      likes: 0,
      retweets: 0,
      comments: [],
    }
    setTweets([newTweet, ...tweets])
  }

  const addComment = (tweetId: number, content: string) => {
    const updatedTweets = tweets.map(tweet => {
      if (tweet.id === tweetId) {
        const newComment: Comment = {
          id: tweet.comments.length + 1,
          content,
          user: {
            name: 'Alejandro Tamayo',
            username: '@tamflikk',
            avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=AlejandroTamayo',
          },
        }
        return { ...tweet, comments: [newComment, ...tweet.comments] }
      }
      return tweet
    })
    setTweets(updatedTweets)
    if (selectedTweet && selectedTweet.id === tweetId) {
      setSelectedTweet(updatedTweets.find(t => t.id === tweetId) || null)
    }
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="container mx-auto flex">
          <Sidebar />
          {selectedTweet ? (
            <TweetDetails tweet={selectedTweet} onClose={() => setSelectedTweet(null)} addComment={addComment} />
          ) : (
            <Feed tweets={tweets} addTweet={addTweet} onSelectTweet={setSelectedTweet} />
          )}
          <Widgets />
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App