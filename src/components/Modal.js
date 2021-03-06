import React, { useContext } from "react"
import styled from "styled-components"
import Context from "../contexts/ContextAndProvider"
import { isMobileResolution } from "../helpers/Screen"

const Modal = () => {
  const { open, closeModal, modalData } = useContext(Context)
  const {
    title = "",
    hdurl: image = "",
    explanation: description = "",
    date = "",
    copyright = "",
    url,
    media_type: type,
  } = modalData
  return (
    <ModalContainer
      style={{
        transform: open ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <CloseButton onClick={closeModal} />
      <ModalContent>
        <div className="TextContent" style={{ margin: 24, maxWidth: 600 }}>
          <p className="OpenSans" style={{ fontSize: 24, fontWeight: 700 }}>
            {date}
          </p>
          <p className="OpenSans" style={{ fontSize: 24 }}>
            {title}
          </p>
          <p>{description}</p>

          <p>{copyright}</p>

          <button
            onClick={closeModal}
            style={{
              background: "transparent",
              color: "white",
              border: "1px solid white",
              padding: "4px 16px",
            }}
          >
            FECHAR
          </button>
        </div>
        {type === "video" ? (
          <iframe
            id="ytplayer"
            type="text/html"
            width="100%"
            height="640px"
            src={url}
            frameBorder="0"
          />
        ) : (
          <img
            className="FullPicture"
            src={url}
            alt={title}
            style={{ maxHeight: "80vh" }}
          />
        )}
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal

const ModalContent = styled.div`
  display: flex;
  flex-direction: column-reverse;

  height: 100vh;
  overflow: auto; /* Enable scroll if needed */

  .TextContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @media (min-width: 960px) {
    padding: 10vh;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .TextContent {
      padding-right: 32px;
    }
    .FullPicture {
      max-width: 50vw;
    }
  }
`

const ModalContainer = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
  transition: all 0.3s ease;
`

const CloseButton = styled.span`
  display: block;
  position: absolute;
  top: 18px;
  right: 24px;
  font-family: "Raleway", sans-serif;
  :after {
    content: "X";
    font-size: 40px;
  }
`
