<script setup>
import fc from './assets/some_geo.json'

import OlMap from './components/OlMap.vue'
import OlGeoJSON from './components/OlGeoJSON.vue'
import OlFeaturePopup from './components/OlFeaturePopup.vue'
</script>
<template>
  <OlMap>
    <OlGeoJSON :geo-json="fc">
      <OlFeaturePopup v-slot="{ featProps }">
        <h3>{{ featProps.temperature }}</h3>
      </OlFeaturePopup>
    </OlGeoJSON>
  </OlMap>
</template>
<style>
body,
html {
  margin: 0;
  padding: 0;
}
</style>
