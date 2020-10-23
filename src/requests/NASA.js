import { formatDate } from "../helpers/Date"

var myHeaders = new Headers()

var myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
}

export const fetchNASADayImage = async date => {
  return await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date}`,
    myInit
  ).then(response => response.json())
}

export const fetchNASADateRangeImages = async (
  startDate = null,
  dayRange = 30
) => {
  const daysList = Array(dayRange)
    .fill(undefined)
    .map((_, index) => {
      const day = new Date()
      day.setDate(day.getDate() - index)
      console.log(day)
      return formatDate(day)
    })
  return Promise.all(daysList.map(date => fetchNASADayImage(date)))
}
