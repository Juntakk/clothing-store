import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="border-t">
        <div className="p-5 flex-center">
          {currentYear} {APP_NAME} &copy; All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
