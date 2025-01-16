const Footer: React.FC = () => {
  return (
    <footer className=" text-center mt-32 text-sm">
      <p>
        {" "}
        &copy; {new Date().getFullYear()} Engineers Intelligence Quotient. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
