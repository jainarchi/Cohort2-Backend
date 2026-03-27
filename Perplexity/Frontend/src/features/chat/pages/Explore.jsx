import '../style/explore.scss'
import React, { useState } from 'react';

import { 
  RiLightbulbFlashLine, 
  RiBug2Line, 
  RiRocket2Line, 
  RiChatVoiceLine, 
  RiFileUserLine, 
  RiAlignLeft, 
  RiHeart3Line, 
  RiHeart3Fill, 
  RiBookmark3Line,
  RiCloseLine
} from '@remixicon/react';


const TOP_CARDS = [
  { name: "Explain", icon: RiLightbulbFlashLine },
  { name: "Fix bug", icon: RiBug2Line },
  { name: "Build project", icon: RiRocket2Line },
  { name: "Prepare interview", icon: RiChatVoiceLine },
  { name: "Create resume", icon: RiFileUserLine },
  { name: "Summarize", icon: RiAlignLeft }
];

const SECTIONS = [
  { title: "💻 Coding", cards: ["Explain code", "Fix my bug", "Build a project", "Convert code", "Optimize code"] },
  { title: "💼 Career", cards: ["Create resume", "HR interview questions", "Write cover letter", "Improve LinkedIn bio"] },
  { title: "📚 Study", cards: ["Explain a topic", "Summarize notes", "Create short notes", "Make quiz"] },
  { title: "✍️ Writing", cards: ["Write email", "Generate content", "Fix grammar", "Rewrite text"] },
  { title: "🚀 Productivity / General", cards: ["Plan my day", "Brainstorm ideas", "Give project ideas", "Solve problem step-by-step"] }
];

const Explore = () => {
  const [savedPrompts, setSavedPrompts] = useState(["Explain code", "Fix my bug"]);

  const toggleSave = (e, prompt) => {
    e.stopPropagation();
    setSavedPrompts(prev => 
      prev.includes(prompt) ? prev.filter(p => p !== prompt) : [...prev, prompt]
    );
  };

  return (
    <div className="explore-container">
      <h1 className="main-title">Universal Commands</h1>
      
      {/* Top Universal Grid */}
      <div className="top-grid">
        {TOP_CARDS.map((card) => {
          const Icon = card.icon;
          const isSaved = savedPrompts.includes(card.name);
          return (
            <div key={card.name} className="top-card">
              <div className="card-header">
                <Icon size={24} className="icon-neon" />
                <div onClick={(e) => toggleSave(e, card.name)} className="save-btn">
                  {isSaved ? <RiHeart3Fill size={20} color="#ff3e3e" /> : <RiHeart3Line size={20} />}
                </div>
              </div>
              <h3>{card.name}</h3>
            </div>
          );
        })}
      </div>

      {/* Saved Prompts Section */}
      {savedPrompts.length > 0 && (
        <section className="module-section saved-section">
          <h4 className="module-label">
            <RiBookmark3Line size={14} /> SAVED_PROMPTS
          </h4>
          <div className="module-grid">
            {savedPrompts.map((prompt) => (
              <div key={prompt} className="module-pill saved">
                <span>{prompt}</span>
                <RiCloseLine 
                  size={16} 
                  className="remove-icon" 
                  onClick={(e) => toggleSave(e, prompt)} 
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categorized Sections */}
      {SECTIONS.map((section) => (
        <section key={section.title} className="module-section">
          <h4 className="module-label">/ {section.title.toUpperCase()}</h4>
          <div className="module-grid">
            {section.cards.map((card) => {
              const isSaved = savedPrompts.includes(card);
              return (
                <div key={card} className="module-pill" onClick={(e) => toggleSave(e, card)}>
                  {card}
                  {isSaved ? 
                    <RiHeart3Fill size={14} color="#ff3e3e" /> : 
                    <RiHeart3Line size={14} className="pill-heart-icon" />
                  }
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Explore;

