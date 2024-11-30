import Questions from "./components/TakeQuiz/Questions";
import QuizForm from "./components/Quiz/QuizForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quiz" element={<Questions />} />
        <Route path="/" element={<QuizForm />} />
      </Routes>
    </Router>
  );
}

export default App;
