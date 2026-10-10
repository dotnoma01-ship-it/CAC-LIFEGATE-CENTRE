import { Link, useLocation } from "react-router-dom";

function MobileNav() {
  const location = useLocation();

 const navItems = [
  {
    path: "/",
    icon: "⌂",
    label: "Home",
  },
  {
    path: "/hymns",
    icon: "♫",
    label: "Hymns",
  },
  {
    path: "/sermons",
    icon: "▶",
    label: "Sermons",
  },
  {
    path: "/prayer",
    icon: "♡",
    label: "Prayer",
  },
];
  return (
    <nav className="mobile-bottom-nav">

      {navItems.map((item) => {
        const isActive =
          item.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={isActive ? "mobile-nav-item active" : "mobile-nav-item"}
          >
            <span className="mobile-nav-icon">
              {item.icon}
            </span>

            <span className="mobile-nav-label">
              {item.label}
            </span>
          </Link>
        );
      })}

    </nav>
  );
}

export default MobileNav;