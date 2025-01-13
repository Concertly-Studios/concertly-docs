import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

// Navigation data structure
const navItems = {
  'Getting Started': {
    'Introduction': 'intro',
    'Quick Start': 'quickstart'
  },
  'API Reference': {
    'Overview': 'api-overview',
    'Endpoints': 'endpoints',
    'Rate Limits': 'rate-limits',
    'Error Handling': 'errors'
  }
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')    // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-')    // Replace multiple - with single -
    .replace(/^-+/, '')      // Trim - from start of text
    .replace(/-+$/, '');     // Trim - from end of text
};

const DocsLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('intro');
  const [content, setContent] = useState('');

  // Load current page content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/src/docs/${activePage}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading markdown:', error);
        setContent('# Error\nFailed to load content.');
      }
    };

    loadContent();
  }, [activePage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">Concertly</span>
              <span className="text-sm text-gray-600">Docs</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:block w-64 h-[calc(100vh-64px)] overflow-y-auto border-r bg-gray-50`}
        >
          <nav className="p-4">
            {Object.entries(navItems).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {category}
                </h3>
                <ul className="space-y-1">
                  {Object.entries(items).map(([title, id]) => (
                    <li key={id}>
                      <button
                        onClick={() => setActivePage(id)}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${
                          activePage === id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({node, children, ...props}) => {
                  const id = slugify(children[0]);
                  return <h1 id={id} {...props}>{children}</h1>;
                },
                h2: ({node, children, ...props}) => {
                  const id = slugify(children[0]);
                  return <h2 id={id} {...props}>{children}</h2>;
                },
                h3: ({node, children, ...props}) => {
                  const id = slugify(children[0]);
                  return <h3 id={id} {...props}>{children}</h3>;
                },
                code: ({node, inline, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="relative">
                      <pre className={className} {...props}>
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;