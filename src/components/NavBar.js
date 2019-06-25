import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Nav = styled.nav`
  width: 70px;
  position: absolute;
  right: -76px;

  li {
    list-style: none;
    margin-bottom: 10px;
    background: #00a0ad;
    border-radius: 0 3px 3px 0;
    cursor: pointer;

    :hover {
      background: #10787c;
    }
    a {
      display: inline-block;
      padding: 10px 10px;
      color: #fff;
      font-weight: 700;
      :hover {
        text-decoration: none;
      }
    }
  }
`;

const NavItem = ({ linkTo, children }) => (
  <li>
    <Link to={linkTo}>{children}</Link>
  </li>
);
export default () => {
  return (
    <Nav>
      <NavItem linkTo="/">Home</NavItem>
      <NavItem linkTo="/about">About</NavItem>
    </Nav>
  );
};
