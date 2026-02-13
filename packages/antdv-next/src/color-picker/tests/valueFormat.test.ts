import { describe, expect, it } from 'vitest'
import { AggregationColor } from '../color'
import { formatColorValue } from '../util'

describe('color-picker valueFormat', () => {
  it('should return original color object when valueFormat is not set', () => {
    const color = new AggregationColor('#1677ff')
    const result = formatColorValue(color)

    expect(result).toBe(color)
  })

  it('should format single color to hex/rgb/hsb string', () => {
    const color = new AggregationColor('#1677ff')

    expect(formatColorValue(color, 'hex')).toBe(color.toHexString())
    expect(formatColorValue(color, 'rgb')).toBe(color.toRgbString())
    expect(formatColorValue(color, 'hsb')).toBe(color.toHsbString())
  })

  it('should support custom formatter', () => {
    const color = new AggregationColor('#1677ff')

    expect(
      formatColorValue(color, current => `x:${current.toHexString()}`),
    ).toBe(`x:${color.toHexString()}`)
  })

  it('should format gradient color entries', () => {
    const gradient = new AggregationColor([
      { color: '#1677ff', percent: 0 },
      { color: '#52c41a', percent: 100 },
    ])

    const result = formatColorValue(gradient, 'hex')

    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual([
      { color: '#1677ff', percent: 0 },
      { color: '#52c41a', percent: 100 },
    ])
  })
})
