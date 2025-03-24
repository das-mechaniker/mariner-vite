import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { ErrorBoundary } from './components/common';
import {
  Home,
  AgentLibrary,
  Documentation,
  Education,
  Labs,
  PromptLibrary,
  Chat,
  Search,
} from './pages';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agent-library" element={<AgentLibrary />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/education" element={<Education />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/prompt-library" element={<PromptLibrary />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
