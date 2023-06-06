import { BsGithub, BsLinkedin } from "react-icons/bs";
import "./SocialLinks.css"
import { Link } from "react-router-dom";

const SocialLinks = () => {

    return (
        <div className="social-links-container">
            <Link to={{pathname: "https://github.com/katpvu" }} target="_blank">
                <BsGithub />
            </Link>
            <Link to={{pathname: "https://www.linkedin.com/in/kat-vu-57b50411b/" }} target="_blank">
                <BsLinkedin />
            </Link>
        </div>
    );
};

export default SocialLinks;