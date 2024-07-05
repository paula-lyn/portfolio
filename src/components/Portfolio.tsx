import "./styles.scss";

const Portfolio = () => {
  return (
    <div className="portfolio">
      <h1>My Work</h1>
      <div className="projects">
        {/*  
        <div className="project">
          <h2>Project Title</h2>
          <p>Description of the project.</p>
          <a href="link-to-project" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div> */}
        {/* End of project block */}
        <div className="project in-progress text-center">
          <h2>Work in Progress</h2>
          <p>This section of my portfolio is currently under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
