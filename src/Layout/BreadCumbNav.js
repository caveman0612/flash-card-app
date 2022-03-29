import React from "react";
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";

const BreadCumbNav = ({ current, previous = null }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/" className="d-flex align-items-center">
            <BsFillHouseFill size={20} className="mr-1" /> Home
          </Link>
        </li>
        {previous ? (
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={previous.url}>{previous.name}</Link>
          </li>
        ) : null}
        <li className="breadcrumb-item active" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
};

export default BreadCumbNav;
