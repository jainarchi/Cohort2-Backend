import "../../style/exploreConnection.scss";
import ExploreCard from "../cards/ExploreCard";

const ExploreConnections = () => {
  return (
    <div className="explorePage">
      <div className="head">
        <h3>
          Explore <span>Network</span>
        </h3>

        <p>
          Expand your professional circle. Discover experts, collaborators and
          mentors tailored to your interests.
        </p>
      </div>

      

      <div className="exploreCards">
        <ExploreCard />
      </div>
    </div>
  );
};

export default ExploreConnections;
