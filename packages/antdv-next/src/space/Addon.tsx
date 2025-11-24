import type { InputStatus } from '../_util/statusUtils'
import type { Variant } from '../config-provider/context'
import { clsx } from '@v-c/util'
import { defineComponent } from 'vue'
import { getAttrStyleAndClass } from '../_util/hooks'
import { getStatusClassNames } from '../_util/statusUtils'
import { useBaseConfig } from '../config-provider/context'
import { useCompactItemContext } from './Compact.tsx'
import useStyle from './style/addon'

export interface SpaceCompactCellProps {
  prefixCls?: string
  variant?: Variant
  disabled?: boolean
  status?: InputStatus
}

const defaults = {
  variant: 'outlined',
} as any
const SpaceAddon = defineComponent<SpaceCompactCellProps>(
  (props = defaults, { slots, attrs }) => {
    const { prefixCls, direction: directionConfig } = useBaseConfig('space-addon', props)
    const [hashId, cssVarCls] = useStyle(prefixCls)
    const { compactItemClassnames, compactSize } = useCompactItemContext(prefixCls, directionConfig)
    return () => {
      const {
        status,
        variant,
        disabled,
      } = props
      const statusCls = getStatusClassNames(prefixCls.value, status)
      const { className, style, restAttrs } = getAttrStyleAndClass(attrs)
      const classes = clsx(
        prefixCls.value,
        hashId.value,
        compactItemClassnames.value,
        cssVarCls.value,
        `${prefixCls.value}-variant-${variant}`,
        statusCls,
        {
          [`${prefixCls.value}-${compactSize.value}`]: compactSize.value,
          [`${prefixCls.value}-disabled`]: disabled,
        },
        className,
      )

      return (
        <div class={classes} style={style} {...restAttrs}>
          {slots?.default?.()}
        </div>
      )
    }
  },
  {
    name: 'ASpaceAddon',
    inheritAttrs: false,
  },
)

export default SpaceAddon
