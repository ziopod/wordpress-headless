<template>
  <Layout>
    <h1>Blog</h1>
    <Pager :info="$page.posts.pageInfo"/>
    <PostAbstract
      v-for="({ node : post }) in $page.posts.edges"
      :key="post.id"
      :post="post"
    />
  </Layout>
</template>
<script>
import PostAbstract from '@/components/Post/Abstract.vue'
import { Pager } from 'gridsome'
export default {
  components: {
    PostAbstract,
    Pager
  }
}
</script>
<page-query>
query ($page: Int) {
  posts: allWordPressPost (perPage: 25, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
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