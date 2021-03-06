import { formatDate } from "../helpers/Date"

var myInit = {
  method: "GET",
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
  startDate = Date.now() - 86400000,
  dayRange = 21
) => {
  const daysList = Array(dayRange)
    .fill(undefined)
    .map((_, index) => {
      const day = new Date(startDate)
      day.setDate(day.getDate() - index)
      return formatDate(day)
    })
  return Promise.all(daysList.map(date => fetchNASADayImage(date)))
}
