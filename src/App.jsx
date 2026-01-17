import React from 'react';
import FloatingLines from './components/floating-lines/FloatingLines';
import Dock from './components/dock/dock';
import './App.css';
import { 
  VscHome, VscInfo, VscCalendar, VscFiles, 
  VscOrganization, VscMail, VscEdit 
} from 'react-icons/vsc';

function App() {
  const navItems = [
    { icon: <VscHome size={22} />, label: 'Home', onClick: () => window.scrollTo({top: 0, behavior: 'smooth'}) },
    { icon: <VscInfo size={22} />, label: 'About', onClick: () => console.log('About clicked') },
    { icon: <VscCalendar size={22} />, label: 'Events', onClick: () => console.log('Events clicked') },
    { icon: <VscFiles size={22} />, label: 'Gallery', onClick: () => console.log('Gallery clicked') },
    { icon: <VscOrganization size={22} />, label: 'Team', onClick: () => console.log('Team clicked') },
    { icon: <VscMail size={22} />, label: 'Contact', onClick: () => console.log('Contact clicked') },
    { icon: <VscEdit size={22} />, label: 'Register', onClick: () => console.log('Register clicked'), className: 'dock-register' },
  ];

  return (
    <div className="app-wrapper">
      <div className="bg-layer">
        <FloatingLines
          llinesGradient={['#4C1D95', '#7C3AED', '#f80202']}
          lineCount={[15, 12, 12]}
          lineDistance={[5, 4, 3]}
          animationSpeed={0.5}
          interactive={true}
          bendStrength={-1.8}
        />
      </div>

      <div className="content-layer">
        <main className="container">
          {/* Hero Section */}
          <section className="about-hero">
             <div className="logo-placeholder" style={{marginBottom: '20px', fontSize: '2rem'}}>
                <strong>&lt;/&gt; E-TAN</strong>
             </div>
             <h1>About <span>E-TAN</span></h1>
             <p className="subtitle">Empowering students to create meaningful change through technology</p>
          </section>

          {/* About Content Grid */}
          <div className="about-container">
            <div className="about-grid">
              <div className="info-column">
                <div className="card mission-card">
                  <div className="card-header-row">
                    <div className="card-icon blue-icon">🎯</div>
                    <h3>Our Mission</h3>
                  </div>
                  <p className="card-text-indented">To leverage technological advancements to address and solve pressing social issues, creating a better tomorrow through innovation and collaboration.</p>
                </div>

                <div className="card values-card">
                  <div className="card-header-row">
                    <div className="card-icon orange-icon">💟</div>
                    <h3>What We Stand For</h3>
                  </div>
                  <p className="card-text-indented">We believe in the power of technology to drive social inclusion and positive change. Every project we undertake aims to make a meaningful impact in society.</p>
                </div>
              </div>

              <div className="goals-column">
                <div className="card goals-card">
                  <div className="card-header">
                    <span className="small-icon">📈</span>
                    <h3>Our Goals</h3>
                  </div>
                  <ul className="goals-list">
                    <li><span>1</span> Develop innovative tech-based solutions that address real-world social challenges</li>
                    <li><span>2</span> Raise awareness about pressing social issues through technology-driven campaigns</li>
                    <li><span>3</span> Foster a collaborative community where students can learn, innovate, and create impact together</li>
                  </ul>
                </div>

                <div className="stats-row">
                  <div className="stat-box blue-bg">
                    <h2>100+</h2>
                    <p>Active Members</p>
                  </div>
                  <div className="stat-box orange-bg">
                    <h2>20+</h2>
                    <p>Projects Launched</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <section className="events-section">
            <div className="section-header">
              <h1>Upcoming <span>Events</span></h1>
              <p className="subtitle">Join us for exciting workshops, hackathons, and networking opportunities</p>
            </div>

            <div className="events-grid">
              <div className="event-card border-blue">
                <div className="event-date">📅 December 15, 2025</div>
                <h3>Tech Workshop: AI & Machine Learning</h3>
                <p>Hands-on workshop exploring the fundamentals of AI and ML applications in social impact.</p>
                <div className="event-details">
                  <span>🕒 2:00 PM - 5:00 PM</span>
                  <span>📍 SFIT Campus, Lab 301</span>
                </div>
                <button className="btn-event-blue">Register Now →</button>
              </div>

              <div className="event-card border-cyan">
                <div className="event-date">📅 January 20, 2026</div>
                <h3>Hackathon: Code for Change</h3>
                <p>Build innovative solutions to real-world problems in this 12-hour coding marathon.</p>
                <div className="event-details">
                  <span>🕒 9:00 AM - 9:00 PM</span>
                  <span>📍 SFIT Main Auditorium</span>
                </div>
                <button className="btn-event-cyan">Register Now →</button>
              </div>

              <div className="event-card border-red">
                <div className="event-date">📅 February 5, 2026</div>
                <h3>Guest Lecture: Tech for Social Good</h3>
                <p>Industry experts share insights on leveraging technology for social impact.</p>
                <div className="event-details">
                  <span>🕒 4:00 PM - 6:00 PM</span>
                  <span>📍 Virtual Event</span>
                </div>
                <button className="btn-event-red">Register Now →</button>
              </div>
            </div>

            <button className="btn-view-all">View All Events</button>
          </section>
        </main>

        {/* The Floating Dock */}
        <Dock items={navItems} />
      </div>
    </div>
  );
}

export default App;