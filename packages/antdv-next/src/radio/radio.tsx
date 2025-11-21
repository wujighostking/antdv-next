import type { SlotsType } from 'vue'
import type { RadioEmits, RadioProps, RadioSlots } from './interface.ts'
import { defineComponent } from 'vue'

const InternalRadio = defineComponent<
  RadioProps,
  RadioEmits,
  string,
  SlotsType<RadioSlots>
>(
  (props, { slots, expose, attrs }) => {
    return () => {
      return null
    }
  },
)

export default InternalRadio
