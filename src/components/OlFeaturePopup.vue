<script setup>
import { Overlay } from 'ol'
import { inject, onMounted, onUnmounted, ref } from 'vue'

const map = inject('map')
const overlay = new Overlay({})
const featProps = ref({})
const popupRef = ref()
const handleMapClick = (e) => {
  const features = map.getFeaturesAtPixel(e.pixel)

  if (features.length < 1) {
    overlay.setElement(undefined)
    overlay.setPosition(undefined)
    return
  }

  const feature = features[0]

  featProps.value = feature.getProperties()
  overlay.setElement(popupRef.value)
  overlay.setPosition(map.getCoordinateFromPixel(e.pixel))
}

onMounted(() => {
  map.on('singleclick', handleMapClick)
  map.addOverlay(overlay)
})
onUnmounted(() => map.un('singleclick', handleMapClick))
</script>
<template>
  <div ref="popupRef" class="ol-feature-popup">
    <slot :featProps="featProps"> </slot>
  </div>
</template>
