<template>
  <div id="my-map"><slot></slot></div>
</template>
<script setup>
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import { onMounted, provide } from 'vue'
const view = new View({
  center: [-9101767, 2822912],
  zoom: 13
})
const layer = new TileLayer({ source: new OSM() })

const map = new Map({ layers: [layer], view })

provide('map', map)
onMounted(() => map.setTarget('my-map'))
</script>
<style>
#my-map {
  width: 100vw;
  height: 100vh;
}
</style>
