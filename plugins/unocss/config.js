const { defineConfig, presetUno, presetIcons } = require('unocss')
const heroicons = require('@iconify-json/heroicons')

const rules = [
  // 文本色
  ['text-color-1', { color: 'var(--color-text-1)' }],
  ['text-color-2', { color: 'var(--color-text-2)' }],
  ['text-color-3', { color: 'var(--color-text-3)' }],
  ['text-color-4', { color: 'var(--color-text-4)' }],
  // 边框颜色
  ['border-color-1', { 'border-color': 'var(--color-border-1)' }],
  ['border-color-2', { 'border-color': 'var(--color-border-2)' }],
  ['border-color-3', { 'border-color': 'var(--color-border-3)' }],
  ['border-color-4', { 'border-color': 'var(--color-border-4)' }],
  // 填充颜色
  ['fill-color-1', { 'fill': 'var(--color-fill-1)' }],
  ['fill-color-2', { 'fill': 'var(--color-fill-2)' }],
  ['fill-color-3', { 'fill': 'var(--color-fill-3)' }],
  ['fill-color-4', { 'fill': 'var(--color-fill-4)' }],
  // 背景颜色
  ['bg-color-1', { 'background-color': 'var(--color-bg-1)' }],
  ['bg-color-2', { 'background-color': 'var(--color-bg-2)' }],
  ['bg-color-3', { 'background-color': 'var(--color-bg-3)' }],
  ['bg-color-4', { 'background-color': 'var(--color-bg-4)' }],
  ['bg-color-5', { 'background-color': 'var(--color-bg-5)' }],
  ['bg-color-white', { 'background-color': 'var(--color-bg-white)' }],
  // 文字大小
  ['text-body-1', { 'font-size': '12px' }],
  ['text-body-2', { 'font-size': '13px' }],
  ['text-body-3', { 'font-size': '14px' }],
  ['text-body-caption', { 'font-size': '12px' }],
  ['text-title-1', { 'font-size': '16px' }],
  ['text-title-2', { 'font-size': '20px' }],
  ['text-title-3', { 'font-size': '24px' }],
  ['text-display-1', { 'font-size': '36px' }],
  ['text-display-2', { 'font-size': '48px' }],
  ['text-display-3', { 'font-size': '56px' }],
]

const colors = {
  primary: {
    DEFAULT: 'rgb(var(--primary-7))',
    1: 'rgb(var(--primary-1))',
    2: 'rgb(var(--primary-2))',
    3: 'rgb(var(--primary-3))',
    4: 'rgb(var(--primary-4))',
    5: 'rgb(var(--primary-5))',
    6: 'rgb(var(--primary-6))',
    7: 'rgb(var(--primary-7))',
    8: 'rgb(var(--primary-8))',
    9: 'rgb(var(--primary-9))',
    10: 'rgb(var(--primary-10))',
  },
  warning: {
    DEFAULT: 'rgb(var(--warning-7))',
    1: 'rgb(var(--warning-1))',
    2: 'rgb(var(--warning-2))',
    3: 'rgb(var(--warning-3))',
    4: 'rgb(var(--warning-4))',
    5: 'rgb(var(--warning-5))',
    6: 'rgb(var(--warning-6))',
    7: 'rgb(var(--warning-7))',
    8: 'rgb(var(--warning-8))',
    9: 'rgb(var(--warning-9))',
    10: 'rgb(var(--warning-10))',
  },
  danger: {
    DEFAULT: 'rgb(var(--danger-7))',
    1: 'rgb(var(--danger-1))',
    2: 'rgb(var(--danger-2))',
    3: 'rgb(var(--danger-3))',
    4: 'rgb(var(--danger-4))',
    5: 'rgb(var(--danger-5))',
    6: 'rgb(var(--danger-6))',
    7: 'rgb(var(--danger-7))',
    8: 'rgb(var(--danger-8))',
    9: 'rgb(var(--danger-9))',
    10: 'rgb(var(--danger-10))',
  },
  success: {
    DEFAULT: 'rgb(var(--success-7))',
    1: 'rgb(var(--success-1))',
    2: 'rgb(var(--success-2))',
    3: 'rgb(var(--success-3))',
    4: 'rgb(var(--success-4))',
    5: 'rgb(var(--success-5))',
    6: 'rgb(var(--success-6))',
    7: 'rgb(var(--success-7))',
    8: 'rgb(var(--success-8))',
    9: 'rgb(var(--success-9))',
    10: 'rgb(var(--success-10))',
  },
  gray: {
    DEFAULT: 'rgb(var(--gray-7))',
    1: 'rgb(var(--gray-1))',
    2: 'rgb(var(--gray-2))',
    3: 'rgb(var(--gray-3))',
    4: 'rgb(var(--gray-4))',
    5: 'rgb(var(--gray-5))',
    6: 'rgb(var(--gray-6))',
    7: 'rgb(var(--gray-7))',
    8: 'rgb(var(--gray-8))',
    9: 'rgb(var(--gray-9))',
    10: 'rgb(var(--gray-10))',
  },
}

module.exports = defineConfig({
  presets: [
    presetUno(),
    presetIcons()
  ],
  safelist: [
    ...Object.keys(heroicons.icons.icons).map(name => `i-${heroicons.icons.prefix}:${name}`),
    ...Array.from({ length: 100 }, (_, i) => `w-${i + 1}`),
    ...Array.from({ length: 100 }, (_, i) => `h-${i + 1}`),
    ...Array.from({ length: 100 }, (_, i) => `lg:w-${i + 1}`),
    ...Array.from({ length: 100 }, (_, i) => `lg:h-${i + 1}`),
    ...Array.from({ length: 100 }, (_, i) => `md:w-${i + 1}`),
    ...Array.from({ length: 100 }, (_, i) => `md:h-${i + 1}`),
    ...rules.map(item => item[0]),
    ...Object.keys(colors).reduce((prev, key) => {
      Object.keys(colors[key]).forEach(key1 => {
        if (key1 === 'DEFAULT') {
          return
        }
        prev.push(`bg-${key}-${key1}`)
        prev.push(`text-${key}-${key1}`)
      })
      return prev
    }, [])
  ],
  rules,
  darkMode: 'class',
  theme: {
    colors
  },
  include: [
    /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
    /duxweb\.js($|\?)/,
  ]
})