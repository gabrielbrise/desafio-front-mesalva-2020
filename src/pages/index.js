import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { fetchNASADayImage, fetchNASADateRangeImages } from "../requests/NASA"
import styled from "styled-components"
import Loader from "../components/Loader"

const IndexPage = () => {
  const [pictures, setPictures] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  useEffect(() => {
    setLoading(true)
    fetchNASADateRangeImages().then(list => {
      setPictures(list)
      setLoading(false)
    })
  }, [])
  const fetchMoreImages = () => {
    const lastDate = pictures[pictures.length - 1].date
    const nextDay = new Date(lastDate)
    nextDay.setDate(nextDay.getDate() - 1)
    const scrollTopPosition = document.documentElement.scrollTop

    fetchNASADateRangeImages(nextDay.valueOf(), 30).then(newPictures => {
      console.log(newPictures)
      setPictures([...pictures, ...newPictures])
      window.scrollTo(0, scrollTopPosition)
    })
  }

  const openModal = key => {
    setOpen(true)
    setModalData(pictures[key])
    document.body.style.maxHeight = "100vh"
    document.body.style.overflowY = "hidden"
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Modal open={open} {...modalData} setOpen={setOpen} />
      <NASAPictures>
        {pictures.map((image, key) => {
          if (image.media_type === "image")
            return (
              <div
                src={image.url}
                key={`NASA-IMAGE${image.date}`}
                onClick={() => openModal(key)}
                style={{
                  width: 280,
                  height: 280,
                  display: "inline-block",
                  margin: 12,
                  lineHeight: 280,
                  padding: 0,
                  backgroundImage: `url(${image.url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )
        })}
      </NASAPictures>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-content-center">
          <ShowMoreButton onClick={fetchMoreImages}>
            Show more pictures
          </ShowMoreButton>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage

const Modal = ({
  title = "",
  hdurl: image = "",
  explanation: description = "",
  date = "",
  copyright = "",
  open,
  setOpen,
}) => {
  const closeModal = () => {
    setOpen(false)
    document.body.style.overflowY = "auto"
  }
  return (
    <ModalContainer style={{ display: open ? "block" : "none" }}>
      <CloseButton onClick={closeModal} />
      <ModalContent>
        <div style={{ margin: 24, maxWidth: 600 }}>
          <p>{title}</p>
          <p>{description}</p>
          <p>{date}</p>
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

        <img
          className="FullPicture"
          src={image}
          alt={title}
          style={{ maxHeight: "80vh" }}
        />
      </ModalContent>
    </ModalContainer>
  )
}

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

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh;
  overflow: auto; /* Enable scroll if needed */
  @media (min-width: 960px) {
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
  background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
`

const NASAPictures = styled.div`
  text-align: center;
  line-height: 0;
`

const ShowMoreButton = styled.button`
  margin-top: 24px;
  background-color: #0b3d91;
  color: white;
  border: none;
  padding: 4px 24px;
`
