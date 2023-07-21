<template>
  <slot></slot>
</template>
<script setup>
import VectorSource from 'ol/source/Vector'
import { GeoJSON } from 'ol/format'
import VectorLayer from 'ol/layer/Vector'
import { inject, onMounted, provide } from 'vue'

const props = defineProps({
  geoJson: {
    type: Object,
    required: true
  }
})
const features = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(props.geoJson)
const source = new VectorSource({ features })

const layer = new VectorLayer({ source })

const map = inject('map')
provide('layer', layer)
onMounted(() => map.addLayer(layer))
</script>
