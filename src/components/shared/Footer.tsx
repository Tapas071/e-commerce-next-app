import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa"; // Sample social media icons

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-bold">FlaxBazar</h2>
          <p className="text-muted">Your go-to fashion destination.</p>
        </div>
        <ul className="flex space-x-4 mb-4 md:mb-0">
          <li>
            <a href="/about" className="hover:text-primary-foreground">
              About Us
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-primary-foreground">
              Contact
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-primary-foreground">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="hover:text-primary-foreground">
              Terms of Service
            </a>
          </li>
        </ul>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-muted hover:text-primary-foreground" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-muted hover:text-primary-foreground" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-muted hover:text-primary-foreground" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-muted hover:text-primary-foreground" />
          </a>
        </div>
      </div>
      <div className="text-center text-muted mt-4">
        &copy; {new Date().getFullYear()} FlaxBazar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
