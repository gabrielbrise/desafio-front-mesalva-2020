import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: "#0B3D91",
      marginBottom: `1.45rem`,
      position: "fixed",
      width: "100vw",
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: 8,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
            width={64}
            style={{ display: "inline", margin: 0 }}
          />
          <HeaderTitle className="OpenSans">
            NASA PICTURE OF THE DAY
          </HeaderTitle>
          <input
            type="date"
            style={{
              borderRadius: 90,
              padding: "4px 12px",
              fontSize: 18,
            }}
          />
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

const HeaderTitle = styled.span`
  text-transform: uppercase;
  opacity: 0.5;
  font-weight: 400;
  @media (max-width: 959px) {
    display: none;
  }
`
