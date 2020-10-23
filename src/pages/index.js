import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { fetchNASADayImage, fetchNASADateRangeImages } from "../requests/NASA"

const IndexPage = () => {
  const [NASAImages, setNASAImages] = useState([])
  useEffect(() => {
    fetchNASADateRangeImages().then(list => setNASAImages(list))
  }, [])
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {NASAImages.map((image, key) => {
        if (image.media_type === "image")
          return (
            <div
              src={image.url}
              key={`NASA-IMAGE${image.date}`}
              style={{
                width: 280,
                height: 280,
                display: "inline-block",
                margin: 4,
                backgroundImage: `url(${image.url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )
        if (image.media_type === "video") return
      })}
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
  )
}

export default IndexPage
