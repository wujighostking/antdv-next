// @ts-expect-error this is type
import type { BaseInputProps } from '@v-c/input/dist/interface'
import { CloseCircleFilled } from '@antdv-next/icons'

export type AllowClear = BaseInputProps['allowClear']

function getAllowClear(allowClear: AllowClear): AllowClear {
  let mergedAllowClear: AllowClear
  if (typeof allowClear === 'object' && allowClear?.clearIcon) {
    mergedAllowClear = allowClear
  }
  else if (allowClear) {
    mergedAllowClear = {
      clearIcon: <CloseCircleFilled />,
    }
  }

  return mergedAllowClear
}

export default getAllowClear
