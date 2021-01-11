<template>
  <Layout>
    <article>
      <h1>{{ $page.post.title }}</h1>
      <div v-html="$page.post.content"></div>
    </article>
  </Layout>
</template>
<page-query>
query ($path: String) {
  post: wordPressPost(path: $path) {
    title
    content
    featuredMedia {
      sourceUrl
    }
  }
}
</page-query>