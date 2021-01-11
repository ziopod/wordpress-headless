<template>
  <article>
    <h3><g-link :to="post.path">{{ post.title }}</g-link></h3>
    <figure
      v-if="hasRemoteLink"
    >
      <g-image
        v-if="post.featuredMedia.remoteLink"
        :src="post.featuredMedia.remoteLink"
      />
    </figure>  
  </article>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasRemoteLink() {
      const hasFeaturedMedia = this.post.featuredMedia !== null
      if (!hasFeaturedMedia) return false
      return this.post.featuredMedia.remoteLink ? true : false
    }
  }
}
</script>