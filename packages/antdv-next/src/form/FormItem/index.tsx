import type { SlotsType } from 'vue'
import type { ComponentBaseProps } from '../../config-provider/context'
import type { FormItemLayout } from '../Form'
import type { FormItemInputProps } from '../FormItemInput'
import type { FormItemLabelProps, LabelTooltipType } from '../FormItemLabel'
import type { InternalNamePath, Meta, Rule } from '../types'
import { computed, defineComponent, shallowRef } from 'vue'
import { useComponentBaseConfig } from '../../config-provider/context'
import useCSSVarCls from '../../config-provider/hooks/useCSSVarCls'
import { useFormContext, useNoStyleItemContext } from '../context.tsx'
import useStyle from '../style'

const NAME_SPLIT = '__SPLIT__'

interface FieldError {
  errors: string[]
  warnings: string[]
}

const _ValidateStatuses = ['success', 'warning', 'error', 'validating', ''] as const
export type ValidateStatus = (typeof _ValidateStatuses)[number]

export type FeedbackIcons = (itemStatus: {
  status: ValidateStatus
  errors?: any[]
  warnings?: any[]
}) => { [key in ValidateStatus]?: any }

interface BaseFormItemProps {
  name?: string
  rules?: Rule[]
  trigger?: string
  validateTrigger?: string | string[] | false
  validateDebounce?: number
  validateFirst?: boolean | 'parallel'
}

export type FormItemProps = BaseFormItemProps
  & ComponentBaseProps
  & Omit<FormItemLabelProps, 'requiredMark'>
  & FormItemInputProps
  & {
    noStyle?: boolean
    id?: string
    hasFeedback?: boolean | { icons: FeedbackIcons }
    validateStatus?: ValidateStatus
    required?: boolean
    hidden?: boolean
    // initialValue?: any;
    messageVariables?: Record<string, string>
    tooltip?: LabelTooltipType
    layout?: FormItemLayout
  }

export interface FormItemEmits {
  [key: string]: (...args: any[]) => void
}
export interface FormItemSlots {
  default: () => any
}

function genEmptyMeta(): Meta {
  return {
    errors: [],
    warnings: [],
    touched: false,
    validating: false,
    name: [],
    validated: false,
  }
}

// https://github.com/ant-design/ant-design/issues/46417
// `getValueProps` may modify the value props name,
// we should check if the control is similar.
function isSimilarControl(a: object, b: object) {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  return (
    keysA.length === keysB.length
    && keysA.every((key) => {
      const propValueA = (a as any)[key]
      const propValueB = (b as any)[key]

      return (
        propValueA === propValueB
        || typeof propValueA === 'function'
        || typeof propValueB === 'function'
      )
    })
  )
}

const InternalFormItem = defineComponent<
  FormItemProps,
  FormItemEmits,
  string,
  SlotsType<FormItemSlots>
>(
  (props) => {
    const formContext = useFormContext()
    const mergedValidateTrigger = computed(() => {
      const { validateTrigger } = props
      return validateTrigger !== undefined
        ? validateTrigger
        : formContext.value?.validateTrigger
    })
    const { prefixCls } = useComponentBaseConfig('form', props)
    const notifyParentMetaChange = useNoStyleItemContext()
    const hasName = computed(() => !(props.name === undefined || props.name === null))
    // Style
    const rootCls = useCSSVarCls(prefixCls)
    const [hashId, cssVarCls] = useStyle(prefixCls, rootCls)

    // ========================= MISC =========================
    // Get `noStyle` required info
    const fieldKeyPathRef = shallowRef<InternalNamePath>()

    // ======================== Errors ========================
    // >>>>> Collect sub field errors
    //   const subFieldErrors =

    return () => {
      return null
    }
  },
  {
    name: 'AFormItem',
    inheritAttrs: false,
  },
)

export default InternalFormItem
