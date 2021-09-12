const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  test('test many', () =>  {
    const blogs = [
      {
        _id: 'AAAAAABBBBB',
        title: 'Testi 1',
        author: 'DEVES',
        url: 'dev/null',
        likes: 15,
        __v: 0
      },
      {
        _id: 'BBBBBCCCCC',
        title: 'Testi 1',
        author: 'DEVES',
        url: 'dev/null',
        likes: 5,
        __v: 0
      },
      {
        _id: 'CCCCCDDDDD',
        title: 'Testi 3',
        author: 'DEVES',
        url: 'dev/null',
        likes: 25,
        __v: 0
      },
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(15 + 5 + 25)
  })

  test('test one', () =>  {
    const blogs = [
      {
        _id: 'AAAAAABBBBB',
        title: 'Testi 1',
        author: 'DEVES',
        url: 'dev/null',
        likes: 15,
        __v: 0
      },
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(15)
  })

  test('none', () =>  {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
})