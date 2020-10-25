import React, { useState, useEffect } from "react"
import { createContextAndProvider } from "../helpers/ContextApi"
import { getHeight, getWidth } from "../helpers/Screen"
import { fetchNASADayImage, fetchNASADateRangeImages } from "../requests/NASA"

const [Context, Provider] = createContextAndProvider(
  () => {
    const [pages, setPages] = useState([])
    const [pictures, setPictures] = useState([])
    const [numberOfPictures, setNumberOfPictures] = useState(0)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [imageSize, setImageSize] = useState(280)
    const [modalData, setModalData] = useState({})
    useEffect(() => {
      initialLoad()
    }, [])

    const initialLoad = () => {
      getImageSizeAndNumberOfPictures()
      setLoading(true)

      fetchNASADateRangeImages(
        Date.now() - 86400000,
        getImageSizeAndNumberOfPictures().numberOfPictures - 3
      )
        .then(list => {
          setPictures(list)
          setPages(pages.concat(list))
          setLoading(false)
        })
        .catch(console.error)
    }

    const openSpecificDayModal = date =>
      fetchNASADayImage(date).then(picture => {
        setModalData(picture)
        setOpen(true)
        document.body.style.maxHeight = "100vh"
        document.body.style.overflowY = "hidden"
      })

    const getImageSizeAndNumberOfPictures = () => {
      const screenHeight = getHeight()
      const screenWidth = getWidth()
      if (screenHeight < 800) {
        setImageSize(screenWidth - 48)
        setNumberOfPictures(7)
        return { imageSize: screenWidth - 48, numberOfPictures: 7 }
      }

      const imageSize = (screenHeight - 80 - 24 * 3) / 2
      const picturesPerRow = Math.floor(screenWidth / imageSize)
      const numberOfPictures = picturesPerRow * 2
      setImageSize(imageSize)
      setNumberOfPictures(numberOfPictures)
      return { imageSize, numberOfPictures }
    }

    const fetchMoreImages = () => {
      const lastDate = pictures[pictures.length - 1].date
      const nextDay = new Date(lastDate)
      nextDay.setDate(nextDay.getDate() - 1)

      fetchNASADateRangeImages(nextDay.valueOf(), numberOfPictures).then(
        newPictures => {
          setPictures([...pictures, ...newPictures])
          setPages(pages.concat(newPictures))
          console.log(newPictures)
          setTimeout(
            window.scrollTo({
              top:
                document.getElementById(`NASA-IMAGE-${lastDate}`).offsetTop +
                imageSize +
                72,
              behavior: "smooth",
            }),
            400
          )
        }
      )
    }

    const openModal = content => {
      setOpen(true)
      setModalData(content)
      document.body.style.maxHeight = "100vh"
      document.body.style.overflowY = "hidden"
    }

    const closeModal = () => {
      setOpen(false)
      document.body.style.overflowY = "auto"
    }

    return {
      pictures,
      numberOfPictures,
      loading,
      open,
      imageSize,
      modalData,
      openModal,
      closeModal,
      fetchMoreImages,
      openSpecificDayModal,
    }
  },
  {
    pictures: [],
    numberOfPictures: 0,
    loading: false,
    open: false,
    imageSize: 0,
    modalData: {},
    openModal: () => null,
    closeModal: () => null,
    fetchMoreImages: () => null,
    openSpecificDayModal: () => null,
  }
)

export { Provider }
export default Context
