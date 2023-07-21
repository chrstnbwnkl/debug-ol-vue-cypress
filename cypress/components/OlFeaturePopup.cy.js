import OlFeaturePopup from '../../src/components/OlFeaturePopup.vue'
import OlGeoJSONSource from '../../src/components/OlGeoJSON.vue'
import OlMap from '../../src/components/OlMap.vue'
import fc from '../../src/assets/some_geo.json'
import { h } from 'vue'

import { fromLonLat } from 'ol/proj'

describe('<OlFeaturePopup />', () => {
  it('renders a map canvas', () => {
    const geoJsonWrapper = {
      render() {
        return h(
          OlGeoJSONSource,
          {
            geoJson: fc
          },
          () => h(OlFeaturePopup, null, ({ featProps }) => h('h3', `${featProps.temperature}`))
        )
      }
    }
    cy.mount(OlMap, {
      slots: {
        default: geoJsonWrapper
      }
    }).then(({ wrapper }) => {
      // if the map canvas does not render, the size is undefined
      expect(wrapper.vm.map.getSize()).to.be.instanceOf(Array)

      // we simulate a click event and check if the popup updates correctly
      const click = {
        type: 'singleclick',
        pixel: wrapper.vm.map.getPixelFromCoordinate(
          // dispatch click event for feature with ID = 2
          fromLonLat([-81.7587, 24.551745])
        )
      }
      wrapper.vm.map.dispatchEvent(click)

      // find popup component
      const popupWrapper = wrapper.findComponent(OlFeaturePopup)

      // make sure the right one is selected
      expect(popupWrapper.vm.featProps.rand_point_id).to.be.equals(1)

      // check the popup content is correct
      expect(popupWrapper.html()).to.contain('30.8')
    })
  })
})
