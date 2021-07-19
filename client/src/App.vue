<template>
  <div id="app">
    <SiteNavigation />
    <div class="container mt-3">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SiteNavigation from '@/components/SiteNavigation'

export default {
  components: {
    SiteNavigation
  }
}
</script>