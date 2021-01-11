<template>
  <Layout>
    <h2>Stickies</h2>
    <article
      v-for="({ node: post }) in $page.allWordPressPost.edges"
      :key="post.id"
    >
      <h3><g-link :to="post.path">{{ post.title }}</g-link></h3>
      <div v-if="post.featuredMedia">
        <figure
          v-if="post.featuredMedia.remoteLink"
        >
          <g-image
            :src="post.featuredMedia.remoteLink"
          />
        </figure>
      </div>
    </article>
  </Layout>
</template>
/**
 * Note : g-image et plugin-remote-image
 * Les options de g-images euvent être placées dans la
 * requête GraphQL.
 */
<page-query>
query {
  allWordPressPost (
    filter: {
      sticky: { eq: true}
    }
  ) {
    edges {
      node {
        id
        path
        title
        featuredMedia {
          id
          link
          remoteLink(
            width: 600,
            height: 100
          )
          sourceUrl
        }
      }
    }
  }
}
</page-query>