import React, { useContext } from "react"
import Context from "../contexts/ContextAndProvider"
import styled from "styled-components"
import Loader from "./Loader"

const ButtonContainer = () => {
  const { loading, fetchMoreImages } = useContext(Context)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            width: "100vw",
            background: "black",
            bottom: 0,
          }}
        >
          <ShowMoreButton className="OpenSans my-2" onClick={fetchMoreImages}>
            Show More Pictures
          </ShowMoreButton>
        </div>
      )}
    </>
  )
}

export default ButtonContainer

const ShowMoreButton = styled.button`
  background-color: #db362d;
  border-color: #db362d;
  color: black;
  border: 1px solid #db362d;
  border-radius: 4px;
  padding: 4px 24px;
  text-transform: uppercase;
  transition: all 0.2s ease;
  margin-right: 32px;

  cursor: pointer;
  :hover {
    background-color: transparent;
    color: #db362d;
  }
`
