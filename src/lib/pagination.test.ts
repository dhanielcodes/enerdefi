import { describe, expect, it } from 'vitest'
import { getPageItems } from './pagination'

describe('getPageItems', () => {
  it('shows every page when there are only a few', () => {
    expect(getPageItems(1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('shows the first and last pages when near the start', () => {
    expect(getPageItems(1, 10)).toEqual([1, 2, 3, 'ellipsis', 8, 9, 10])
  })

  it('keeps the current page visible in the middle', () => {
    expect(getPageItems(5, 10)).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 10])
  })
})
