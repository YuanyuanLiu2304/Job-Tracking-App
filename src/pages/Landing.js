import main from "../assets/images/main.svg";
import LandingWrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <LandingWrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Gastropub jianbing wayfarers, hot chicken JOMO migas glossier
            cardigan meggings williamsburg portland copper mug. Pork belly
            shabby chic tumeric prism typewriter. Brunch mlkshk fanny pack,
            polaroid before they sold out migas artisan gluten-free etsy bodega
            boys truffaut. Lyft hot chicken everyday carry selfies meggings,
            squid asymmetrical vegan portland try-hard grailed. Pitchfork PBR&B
            plaid craft beer chambray. Brunch farm-to-table pinterest cornhole
            prism ethical. Gastropub mlkshk cronut hashtag kinfolk tumblr vegan
            gentrify.
          </p>
          <Link to="/login" className="btn btn-hero">
            Login / Register
          </Link>
        </div>

        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </LandingWrapper>
  );
};

export default Landing;
