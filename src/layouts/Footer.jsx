import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer className="sticky bottom-0 left-0 w-full flex justify-center p-6 bg-white text-secondary border-t">
      <a
        href="https://github.com/minyoungKuk/outsourcing-project.git"
        className="flex flex-col"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faGithub}
          className="text-3xl text-secondary pb-4"
        />
        <span>©️2024 폭격기. All Rights Reserved</span>
      </a>
    </footer>
  );
};

export default Footer;
