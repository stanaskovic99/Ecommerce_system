import { MailOutline, PermIdentity, Storefront } from "@material-ui/icons";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import DehazeIcon from "@mui/icons-material/Dehaze";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeIcon from "@mui/icons-material/Home";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SignalWifiStatusbarNullIcon from "@mui/icons-material/SignalWifiStatusbarNull";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import React from "react";

import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";

const Menu = () => {
  const pathname = window.location.pathname;

  let user = getLocalStorage("user");
  if (!user) user = getSessionStorage("user");
  if (!user) window.location.href = "/";
  let id = user.id;

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top w-100">
        <div className="container-fluid">
          <button
            className="btn btn-dark d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <DehazeIcon />
          </button>

          <a
            className="navbar-brand text-uppercase ms-3 me-auto fw-bold fs-3"
            href="/"
          >
            Admin Verdi
          </a>

          <ul className="nav nav-sett-log">
            <li className="nav-item"></li>
            <li className="nav-item dropstart">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                <SettingsRoundedIcon className="text-white" />
              </a>
              <ul className="dropdown-menu dmeb dropdown-menu-dark">
                <li>
                  <a className="dropdown-item" href={`/edit-user/${id}`}>
                    Korisnički podaci
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href={`/ch-pass/${id}`}>
                    Izmjena lozinke
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <LogoutIcon className="text-white" onClick={() => logout()} />
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start sidebar bg-dark border border-dark text-white"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header d-lg-none">
          <button
            type="button"
            className="btn-close ms-auto me-1 mt-1 color-white-btn"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body px-4 py-3">
          <div className="d-flex flex-column mb-3">
            <h3 className="sidebar-title">Kontrolna tabla</h3>
            <ul className="nav px-3 d-flex flex-column">
              <Link
                to="/home"
                className={`link ${pathname == "/home" ? "active" : ""}`}
              >
                <li className="sidebar-item ">
                  <HomeIcon className="sidebarIcon" />
                  Početna
                </li>
              </Link>
            </ul>
          </div>
          <div className="d-flex flex-column mb-3">
            <h3 className="sidebar-title">Tabele</h3>
            <ul className="nav px-3 d-flex flex-column">
              <Link
                to="/users"
                className={`link ${pathname == "/users" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <PermIdentity className="sidebarIcon" />
                  Korisnici
                </li>
              </Link>
              <Link
                to="/statuses"
                className={`link ${pathname == "/statuses" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <SignalWifiStatusbarNullIcon className="sidebarIcon" />
                  Statusi
                </li>
              </Link>
              <Link
                to="/ads"
                className={`link ${pathname == "/ads" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <FontDownloadOutlinedIcon className="sidebarIcon" />
                  Reklame
                </li>
              </Link>
              <Link
                to="/newsletter"
                className={`link ${pathname == "/newsletter" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <SubscriptionsOutlinedIcon className="sidebarIcon" />
                  Newsletter
                </li>
              </Link>
              <Link
                to="/categories"
                className={`link ${pathname == "/categories" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <CategoryOutlinedIcon className="sidebarIcon" />
                  Kategorije
                </li>
              </Link>
              <Link
                to="/articles"
                className={`link ${pathname == "/articles" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <Storefront className="sidebarIcon" />
                  Artikli
                </li>
              </Link>
              <Link
                to="/orders"
                className={`link ${pathname == "/orders" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <AssignmentOutlinedIcon className="sidebarIcon" />
                  Narudžbe
                </li>
              </Link>
              <Link
                to="/transactions"
                className={`link ${
                  pathname == "/transactions" ? "active" : ""
                }`}
              >
                <li className="sidebar-item">
                  <PaidOutlinedIcon className="sidebarIcon" />
                  Transakcije
                </li>
              </Link>
            </ul>
          </div>
          <div className="d-flex flex-column mb-3">
            <h3 className="sidebar-title">Notifikacije</h3>
            <ul className="nav px-3 d-flex flex-column">
              <Link
                to="/email"
                className={`link ${pathname == "/email" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <MailOutline className="sidebarIcon" />
                  E-mail
                </li>
              </Link>
              <Link
                to="/info"
                className={`link ${pathname == "/info" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <InfoOutlinedIcon className="sidebarIcon" />
                  Informacije
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebar-sett-log">
            <ul className="nav d-flex flex-column pt-4 ">
              <Link
                to={`/edit-user/${id}`}
                className={`link ${pathname == "/settings" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <SettingsRoundedIcon className="sidebarIcon" />
                  Izmjena podataka korisnika
                </li>
              </Link>
              <Link
                to={`/ch-pass/${id}`}
                className={`link ${pathname == "/settings" ? "active" : ""}`}
              >
                <li className="sidebar-item">
                  <KeyIcon className="sidebarIcon" />
                  Izmjena lozinke
                </li>
              </Link>
              <li className="sidebar-item" onClick={() => logout()}>
                <LogoutIcon className="sidebarIcon" />
                Odjava
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
