import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  safelist: [
  ],
  theme: {
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  shortcuts: [
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
