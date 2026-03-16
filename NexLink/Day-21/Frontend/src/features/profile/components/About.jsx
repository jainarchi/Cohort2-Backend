import React from "react";

const About = () => {
  return (
    <div className="aboutPage">

      <div className="about box">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
        quisquam! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>

      <div className="skill box">

       <div className="top">
         <h4>Skills</h4>
        <span>Add</span>
       </div>

        <ul>
          <li>Java</li>
          <li>C++</li>
          <li>Node JS</li>
        </ul>
      </div>

      <div className="personalInfo box">
  
         <h4>Contact</h4>
       

        <ul>
          <li>email</li>
          <li>location</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
