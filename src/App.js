import {Link} from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Navbar from './components/navbar';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
     {/* Navigation Bar */}
     
        <Navbar />
        <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
     
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto flex justify-center items-center h-full">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold">Welcome to ExamMate</h1>
            <p className="text-2xl">Your Ultimate Exam Preparation Platform</p>
            <p className="text-lg">Personalized study plans, practice tests, and expert tips to boost your performance.</p>
            <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features container mx-auto py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Key Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="feature-card p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <span className="text-blue-500 text-5xl">📚</span>
            <p className="text-xl mt-4">Personalized Study Plans</p>
          </div>
          <div className="feature-card p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <span className="text-green-500 text-5xl">📝</span>
            <p className="text-xl mt-4">Practice Tests & Quizzes</p>
          </div>
          <div className="feature-card p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <span className="text-red-500 text-5xl">💡</span>
            <p className="text-xl mt-4">Expert Tips & Strategies</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">About ExamMate</h2>
          <p className="text-lg text-gray-700 mb-4 mx-6">
            ExamMate is your ultimate companion for exam preparation. We provide personalized study plans, 
            practice tests, and expert strategies to help you ace your exams with confidence.
          </p>
          <p className="text-lg text-gray-700 mb-4 mx-6">
            Our platform is designed to cater to students of all levels, from beginners to advanced learners. 
            Join thousands of successful students who have improved their scores with ExamMate.
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-lg">© 2024 ExamMate. All rights reserved.</p>
          <p className="text-sm">Follow us on:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
