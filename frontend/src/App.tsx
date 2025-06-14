import React from 'react';
import RegisterAIAgent from './components/RegisterAIAgent';

const App: React.FC = () => {
  const handleRegistrationSuccess = (data: any) => {
    console.log('AI Agent registered successfully:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Registry</h1>
              <p className="mt-1 text-sm text-gray-600">Powered by Story Protocol</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://docs.storyprotocol.xyz/docs/ai-agents"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Documentation
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Register Your AI Agent
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create a unique digital identity for your AI agent on the blockchain. 
            Register your AI agent as an Intellectual Property asset using Story Protocol.
          </p>
        </div>

        <RegisterAIAgent onSuccess={handleRegistrationSuccess} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Story Protocol - The Future of IP on the Blockchain</p>
            <p className="mt-2">
              <a
                href="https://storyprotocol.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Learn more about Story Protocol
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App; 