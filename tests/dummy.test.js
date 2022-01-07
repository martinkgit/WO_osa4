const listHelpers = require('../utils/list_helpers')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelpers.dummy(blogs)
  expect(result).toBe(1)
})