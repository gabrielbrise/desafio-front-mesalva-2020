import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Context, { Provider } from "../contexts/ContextAndProvider"
import Modal from "../components/Modal"
import CardsList from "../components/CardsList"
import ShowMoreButton from "../components/ShowMoreButton"

const IndexPage = () => (
  <Provider>
    <PageContent />
  </Provider>
)

const PageContent = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Modal />
      <CardsList />
      <ShowMoreButton />
    </Layout>
  )
}

export default IndexPage
