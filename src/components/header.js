import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import styled from "styled-components"
import Context from "../contexts/ContextAndProvider"
import { formatDate } from "../helpers/Date"

const Header = ({ siteTitle }) => {
  const { openSpecificDayModal } = useContext(Context)
  return (
    <header
      style={{
        background: "#0B3D91",
        position: "fixed",
        width: "100vw",
        zIndex: 1,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: 8,
        }}
      >
        <Container
          style={{
            color: `white`,
            textDecoration: `none`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ display: "inline", lineHeight: 0 }}>
            <img src="/icons/NASA_Logo.svg" width={90} />
          </span>
          <HeaderTitle className="OpenSans">PICTURE OF THE DAY</HeaderTitle>

          <DateForm
            className="flex align-items-center"
            onSubmit={e => {
              e.preventDefault()
              openSpecificDayModal(e.currentTarget.date.value)
            }}
            style={{ margin: 0 }}
          >
            <DateInput
              type="date"
              id="d3234gf2"
              name="date"
              defaultValue={formatDate(new Date(Date.now()))}
              min="1998-01-01"
              max={formatDate(new Date(Date.now()))}
            />
            <DateButton className="OpenSans">GO</DateButton>
          </DateForm>
        </Container>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

const Container = styled.div`
  img,
  h1 {
    margin: 0;
  }
  @media (min-width: 960px) {
    > :first-child,
    > :last-child {
      width: 180px;
    }
  }
`

const DateButton = styled.button`
  background: transparent;
  border: 1px solid white;
  color: white;
  font-size: 18px;
  height: 34px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left: none;
  transition: all 0.2s ease;
  cursor: pointer;
  :hover {
    background: white;
    color: #db362d;
  }
`

const DateForm = styled.form`
  transition: all 0.2s ease;
  opacity: 0.5;
  :hover,
  :active {
    opacity: 0.8;
  }
`

const DateInput = styled.input`
  border-radius: 4px;
  width: 100%;
  padding: 2px 12px;
  font-size: 16px;
  background-color: #0b3d91;
  border: 1px solid white;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  color: white;
  :focus {
    outline: none;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`

const HeaderTitle = styled.h1`
  text-transform: uppercase;
  opacity: 0.5;
  font-size: 18px;
  font-weight: 400;
  @media (max-width: 959px) {
    display: none;
  }
`
