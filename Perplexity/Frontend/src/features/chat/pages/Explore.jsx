import React from 'react';
import { 
  RiTerminalBoxLine, 
  RiAddLine, 
  RiCompass3Line,
  RiFlashlightLine
} from '@remixicon/react';
import { Power_Promts_Data } from '../utils/powerPromt.js';
import "../style/explore.scss"
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hook/useChat.js';


const Explore = () => {
  const navigate = useNavigate()
  const {handleSelectPrompt} = useChat()


  const onSelectPrompt =(prompt , withChat) =>{
     handleSelectPrompt(prompt , withChat)
     navigate('/')
  }

  const formatCategory = (str) => {
    return str.replace(/([A-Z])/g, ' $1').toUpperCase();
  };

  return (
    <div className="explore-container">

      <header className="explore-header">
        <div className="title-group">
          <RiCompass3Line size={32} className="header-icon" />
          <h1>Neural Discovery</h1>
        </div>
        <p className="subtitle">
          Select a specialized power-module to accelerate your workflow.
        </p>
      </header>



      
     
      <div className="discovery-grid">

        {Object.entries(Power_Promts_Data).map(([category, items]) => (

          <section key={category} className="module-section">

            <h4 className="module-label">
              <RiTerminalBoxLine size={14} className="label-icon" /> 
              {formatCategory(category)}
            </h4>
            
            <div className="module-grid">
              {items.map((item) => (
                 
                <div 
                  key={item.title} 
                  className="module-pill quick-pill" 
                  onClick={() => onSelectPrompt(item.powerPrompt, 'current')}
                >
                  <div className="pill-content">
                    <RiFlashlightLine size={14} className="pill-icon" />
                    <span>{item.title}</span>
                  </div>

                  <RiAddLine 
                    size={18} 
                    className="plus-icon" 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      onSelectPrompt(item.powerPrompt, 'new');
                    }}
                    title="Start in New Chat"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Explore;