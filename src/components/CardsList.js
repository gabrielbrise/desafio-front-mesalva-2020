import React, { useContext } from "react"
import { formatDate } from "../helpers/Date"
import Context from "../contexts/ContextAndProvider"
import styled from "styled-components"

const CardsList = () => {
  const { pictures, imageSize, openModal } = useContext(Context)

  return (
    <NASAPictures>
      {pictures.map((media, key) => {
        const image =
          media.media_type === "video"
            ? `https://img.youtube.com/vi/${media.url.replace(
                /^(.*embed\/)(.*)([\?.*]?)$/,
                "$2"
              )}/0.jpg`
            : media.url
        return (
          <div
            id={`NASA-IMAGE-${media.date}`}
            key={`NASA-IMAGE-${media.date}`}
            style={{
              overflow: "hidden",
              width: key === 0 ? imageSize * 2 + 50 : imageSize,
              height: key === 0 ? imageSize * 2 + 50 : imageSize,
              display: "inline-block",
              margin: 12,
              padding: 0,
            }}
          >
            <NASAImage
              onClick={() => openModal(key)}
              style={{
                width: key === 0 ? imageSize * 2 + 50 : imageSize,
                height: key === 0 ? imageSize * 2 + 50 : imageSize,
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
                "--date": media.date,
              }}
            />
          </div>
        )
      })}
    </NASAPictures>
  )
}

export default CardsList

const NASAImage = styled.div`
  transform: scale(1.4);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  /* :after {
    content: attr(var(--date));
    width: 200px;
    height: 200px;
    color: white;
    position: absolute;
    display: inline;
    top: 50%;
    left: 25%;
    transition: all 0.2s ease;
    z-index: 2;
  }
  :before {
    content: "";
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    position: absolute;
    display: block;
    transition: all 0.2s ease;
  } */
  :hover {
  }
`

const NASAPictures = styled.div`
  text-align: center;
  line-height: 100vh;
  display: flex;
  flex-flow: wrap;
`
