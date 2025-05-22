import React, { useState, useEffect } from 'react';

const MOCK_JOBS = [
  {
    title: 'Senior Software Engineer - React/Node.js',
    company: 'Tech Solutions NZ',
    location: 'Auckland CBD, Auckland',
    source: 'Seek',
    date: '2025-05-20',
    ai_summary: 'Seeking a Software Engineer with 5+ years of experience to build web applications using React and Node.js. Requires expertise in JavaScript, TypeScript, React, Node.js, AWS, and Agile.',
    link: 'https://www.seek.co.nz/job/12345',
    relevant: true,
    snippet: 'View Original Description Snippet',
  },
  {
    title: 'Full Stack Developer (Java & Angular)',
    company: 'Kiwi Digital Ltd.',
    location: 'Wellington Central, Wellington',
    source: 'TradeMe Jobs',
    date: '2025-05-19',
    ai_summary: 'Full Stack Developer role using Java (Spring Boot, RESTful APIs) for backend and Angular for frontend development. Cloud platform experience is a plus. Seeking a passionate and continuous learner for...',
    link: 'https://www.trademe.co.nz/a/jobs/listing/67890',
    relevant: true,
    snippet: 'View Original Description Snippet',
  },
  {
    title: 'Junior Software Developer - Python',
    company: 'Startup Hub NZ',
    location: 'Christchurch Central, Canterbury',
    source: 'Seek',
    date: '2025-05-18',
    ai_summary: 'Junior Python Developer role requiring familiarity with Django or Flask and a willingness to learn.',
    link: 'https://www.seek.co.nz/job/54321',
    relevant: true,
    snippet: 'View Original Description Snippet',
  },
  {
    title: 'Software Engineer - Mobile (iOS/Android)',
    company: 'Global Innovations Corp',
    location: 'Remote, New Zealand',
    source: 'LinkedIn',
    date: '2025-05-17',
    ai_summary: 'Develop iOS and Android mobile applications using Swift, Kotlin, or React Native. Experience with mobile CI/CD pipelines and automated testing is desired. The role is remote and emphasizes...',
    link: 'https://www.linkedin.com/jobs/view/123456',
    relevant: true,
    snippet: 'View Original Description Snippet',
  },
  {
    title: 'Lead Data Engineer',
    company: 'Data Insights Co.',
    location: 'Auckland, New Zealand',
    source: 'Seek',
    date: '2025-05-16',
    ai_summary: 'Lead Data Engineer role requiring Python and SQL coding skills, focusing on ETL, data warehousing, and big data technologies. Involves building and maintaining data pipelines.',
    link: 'https://www.seek.co.nz/job/67891',
    relevant: true,
    snippet: 'View Original Description Snippet',
  },
];

const gradientTextStyle = {
  background: 'linear-gradient(90deg, #0a84ff, #5e5ce6, #bf5af2, #ff375f, #ff9f0a)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  fontWeight: 700,
};

function App() {
  const [keywords, setKeywords] = useState('');
  const [startDate, setStartDate] = useState('2025-05-15');
  const [endDate, setEndDate] = useState('2025-05-22');
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set global background color
  useEffect(() => {
    document.body.style.background = '#18191A';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setJobs(MOCK_JOBS);
      setLoading(false);
    }, 800);
  };

  // Card style (no neon)
  const cardStyle = {
    background: '#23272F',
    borderRadius: 16,
    padding: 32,
    boxShadow: '0 2px 12px #0002',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 320,
    position: 'relative',
    maxWidth: 480,
    margin: '0 auto',
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', padding: '32px 0 0 0', width: '100%', maxWidth: 1400, margin: '0 auto' }}>
        {/* User-provided minimalist Kiwi SVG icon */}
        <svg width="50" height="50" viewBox="0 0 100 100" style={{ marginRight: 16 }}>
          <ellipse cx="50" cy="65" rx="40" ry="25" fill="#fff" />
          <circle cx="38" cy="58" r="8" fill="#18191A" />
          <path d="M70 40 Q 75 20 90 10 L 85 0 Q 70 10 70 40 Z" fill="#fff" />
        </svg>
        <span style={{ ...gradientTextStyle, fontSize: 46, letterSpacing: 0.5 }}>KiwiJobScrape</span>
      </header>
      {/* Main Content */}
      <main style={{ width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, margin: '40px 0 24px 0', textAlign: 'left', color: '#fff' }}>Available Software Engineer Jobs</h2>
        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 24, marginBottom: 48, alignItems: 'center', background: '#23272F', borderRadius: 12, padding: 20, justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Enter keywords (e.g., React, Node, Python)"
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
            style={{ flex: 2, minWidth: 260, background: '#18191A', color: '#fff', border: 'none', borderRadius: 6, padding: '16px 20px', fontSize: 18, outline: 'none' }}
          />
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            style={{ flex: 1, minWidth: 180, background: '#18191A', color: '#fff', border: 'none', borderRadius: 6, padding: '16px 20px', fontSize: 18, outline: 'none' }}
          />
          <span style={{ fontWeight: 600, color: '#fff', fontSize: 20 }}>-</span>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            style={{ flex: 1, minWidth: 180, background: '#18191A', color: '#fff', border: 'none', borderRadius: 6, padding: '16px 20px', fontSize: 18, outline: 'none' }}
          />
          <button
            type="submit"
            style={{ padding: '16px 40px', fontSize: 18, background: '#FF9100', color: '#18191A', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Jobs'}
          </button>
        </form>
        {/* Job Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(370px, 1fr))', gap: 36, justifyContent: 'center' }}>
          {jobs.map((job, idx) => (
            <div key={idx} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 20, color: '#fff', flex: 1 }}>{job.title}</span>
                {job.relevant && (
                  <span style={{ background: '#FF9100', color: '#18191A', fontWeight: 700, fontSize: 14, borderRadius: 16, padding: '2px 12px', marginLeft: 8, display: 'flex', alignItems: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}><circle cx="12" cy="12" r="12" fill="#fff" opacity="0.2"/><path d="M9 12l2 2 4-4" stroke="#18191A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Relevant
                  </span>
                )}
              </div>
              <div style={{ color: '#B0B3B8', fontSize: 16, marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="16" height="16" fill="#B0B3B8" style={{ marginRight: 2 }} viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  {job.company}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="16" height="16" fill="#B0B3B8" style={{ marginRight: 2 }} viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  {job.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="16" height="16" fill="#B0B3B8" style={{ marginRight: 2 }} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#B0B3B8" strokeWidth="2" fill="none"/><path d="M8 12l2 2 4-4" stroke="#B0B3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Source: {job.source}
                </span>
              </div>
              <div style={{ color: '#fff', fontWeight: 600, margin: '12px 0 4px 0', fontSize: 16 }}>AI Summary:</div>
              <div style={{ color: '#B0B3B8', fontSize: 16, marginBottom: 8 }}>{job.ai_summary}</div>
              <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ color: '#B0B3B8', fontSize: 15, textDecoration: 'underline', marginBottom: 18, display: 'inline-block' }}>
                ▸ {job.snippet}
              </a>
              <button
                style={{ marginTop: 'auto', background: '#FF9100', color: '#18191A', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 8, padding: '16px 0', width: '100%', cursor: 'pointer', boxShadow: '0 1px 4px #0002', transition: 'background 0.2s' }}
                onClick={() => window.open(job.link, '_blank', 'noopener noreferrer')}
              >
                View Original Post
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
