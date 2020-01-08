const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
    description: `A simple description about pandas eating lots...`,
    author: `gatsbyjs`,
  },
  plugins: [
    {
    resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatbsyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatbsy-plugin-react-helmet`,
  ],
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`){
   const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {

const { createPage } = actions
const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
result.data.allMarkdownRemark.edges.forEach(({ node }) => {
  createPage({
    path: node.fields.slug,
    component: path.resolve(`./src/templates/blog-post.js`),
    context: {
      slug: node.fields.slug,
    },
  })
})
}
