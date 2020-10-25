import React, { useContext, useEffect, useState } from "react"
import { formatDate } from "../helpers/Date"
import Context from "../contexts/ContextAndProvider"
import styled from "styled-components"
import { isMobileResolution } from "../helpers/Screen"

const CardsLayout = () => {
  const { pictures, imageSize, openModal, numberOfPictures } = useContext(
    Context
  )

  const todayCard = [{ ...pictures[0], bigCard: true }]

  const picsPerRow = numberOfPictures / 2
  const picsPerSide = picsPerRow * 2 - 3

  const sideCards = pictures.slice(1, picsPerSide)
  console.log("sdsd", picsPerRow, picsPerSide)

  const restCards = pictures.slice(picsPerSide)

  if (pictures.length > 0) {
    if (isMobileResolution()) return <CardsList cards={pictures} />
    return (
      <div className="block justify-content-center align-items-center text-center">
        <div className="flex justify-content-center  text-center">
          <CardsList cards={todayCard} />
          <CardsList
            cards={sideCards}
            style={{
              maxWidth: (picsPerRow - 2) * imageSize + (picsPerRow - 2) * 24,
            }}
          />
        </div>
        <div className="flex justify-content-center align-items-center">
          <CardsList
            cards={restCards}
            style={{ maxWidth: picsPerRow * imageSize + (picsPerRow - 2) * 48 }}
          />
        </div>
      </div>
    )
  }
  return null
}

export default CardsLayout

const CardsList = ({ cards, style }) => {
  const { imageSize, openModal, numberOfPictures } = useContext(Context)

  return (
    <NASAPictures style={style}>
      {cards.map((media, key) => {
        const image =
          media.media_type === "video"
            ? `https://img.youtube.com/vi/${media.url
                .replace(/\?rel=0/, "")
                .replace(/^(.*embed\/)(.*)$/, "$2")}/0.jpg`
            : media.url
        return (
          <div
            className={media.bigCard ? "BigCard" : "Card"}
            id={`NASA-IMAGE-${media.date}`}
            key={`NASA-IMAGE-${media.date}`}
            style={{
              overflow: "hidden",
              "--big-card-size": `${imageSize * 2 + 24}px`,
              "--card-size": `${imageSize}px`,
              display: "inline-block",
              margin: 12,
              padding: 0,
              gridArea: key === 0 ? "today" : `previous-${key}`,
            }}
          >
            <NASAImage
              onClick={() => openModal(media)}
              style={{
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
  .BigCard {
    width: var(--card-size);
    height: var(--card-size);
    > * {
      width: var(--card-size);
      height: var(--card-size);
    }
    @media (min-width: 960px) {
      width: var(--big-card-size);
      height: var(--big-card-size);
      > * {
        width: var(--big-card-size);
        height: var(--big-card-size);
      }
    }
  }
  .Card {
    width: var(--card-size);
    height: var(--card-size);
    > * {
      width: var(--card-size);
      height: var(--card-size);
    }
  }
`

// const [gridString, setGridString] = useState("")

//   useEffect(() => {
//     if (pictures.length !== 0 && numberOfPictures !== 0) {
//       console.log("dh129d8h2389dh")
//       const picPerRow = numberOfPictures / 2
//       const totalPics = pictures.length
//       const numberOfRows = totalPics - 3 / picPerRow
//       console.log(picPerRow, totalPics, numberOfRows)
//       const array = Array(numberOfRows)
//         .fill(Array(picPerRow).fill(""))
//         .map(
//           (row, rowIndex) =>
//             `'${row.map((column, columnIndex) => {
//               if (
//                 (rowIndex === 0 || rowIndex === 1) &&
//                 (columnIndex === 0 || columnIndex === 1)
//               )
//                 return "today"
//               return `previous-${columnIndex + 1 * rowIndex + 1 - 3}`
//             })}'`
//         )
//         .join("\n")
//       setGridString(array)

//       console.log(array)
//     }
//   }, [pictures.length])
