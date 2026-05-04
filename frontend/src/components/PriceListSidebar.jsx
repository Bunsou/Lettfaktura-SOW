import {
  FileText,
  Users,
  Briefcase,
  BookOpen,
  Tag,
  Files,
  XCircle,
  Folder,
  Clipboard,
  IdCard,
  Cloud,
  LogOut,
} from "lucide-react";
import "./PriceListSidebar.css";
import { logoutUser } from "../services/auth-api";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: FileText, label: "Invoices", color: "blue" },
  { icon: Users, label: "Customers", color: "green" },
  { icon: Briefcase, label: "My Business", color: "cyan" },
  { icon: BookOpen, label: "Invoice Journal", color: "blue" },
  { icon: Tag, label: "Price List", color: "orange", active: true },
  { icon: Files, label: "Multiple Invoicing", color: "blue" },
  { icon: XCircle, label: "Unpaid Invoices", color: "red" },
  { icon: Folder, label: "Offer", color: "gold" },
  {
    icon: Clipboard,
    label: "Inventory Control",
    color: "gray",
    disabled: true,
  },
  {
    icon: IdCard,
    label: "Member Invoicing",
    color: "gray",
    disabled: true,
  },
  { icon: Cloud, label: "Import/Export", color: "blue" },
  { icon: LogOut, label: "Log out", color: "cyan" },
];

function PriceListSidebar({ menuOpen, closeMenu }) {
  const navigate = useNavigate();
  const handleClick = async (item) => {
    // Only handle the logout click for now so that the tester can go to login easily.
    if (item.label === "Log out") {
      await logoutUser();
      navigate("/login");
    }
  };

  return (
    <aside className={`sidebar ${menuOpen ? "open" : ""}`} onClick={closeMenu}>
      <h3 className="title">Menu</h3>
      <ul className="list">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <li
              key={i}
              className={`item ${item.active ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
              onClick={() => handleClick(item)}
            >
              {item.active && <span className="active-dot"></span>}
              <Icon size={20} color={item.color} />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default PriceListSidebar;
