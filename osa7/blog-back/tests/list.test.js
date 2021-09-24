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

describe('favBlog', () => {
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

    const result = listHelper.favoriteBlogs(blogs)
    expect(result).toEqual(blogs[2])
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

    const result = listHelper.favoriteBlogs(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('none', () =>  {
    const blogs = []

    const result = listHelper.favoriteBlogs(blogs)
    expect(result).toEqual(null)
  })
})

describe('mostBlogs', () => {
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
        author: 'TEVES',
        url: 'dev/null',
        likes: 25,
        __v: 0
      },
    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'DEVES',
      blogs: 2
    })
  })

  test('test many 2', () =>  {
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
        author: 'TEVES',
        url: 'dev/null',
        likes: 3,
        __v: 0
      },
      {
        _id: 'EEEEFFFFF',
        title: 'Testi 3',
        author: 'TEVES',
        url: 'dev/null',
        likes: 1,
        __v: 0
      },
      {
        _id: 'FFFFGGGGG',
        title: 'Testi 3',
        author: 'TEVES',
        url: 'dev/null',
        likes: 2,
        __v: 0
      },
    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'TEVES',
      blogs: 3
    })
  })

  test('test one', () =>  {
    const blogs = [
      {
        _id: 'AAAAAABBBBB',
        title: 'Testi 1',
        author: 'AVES',
        url: 'dev/null',
        likes: 15,
        __v: 0
      },
    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'AVES',
      blogs: 1
    })
  })

  test('none', () =>  {
    const blogs = []

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(null)
  })
})

describe('mostLikes', () => {
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
        author: 'TEVES',
        url: 'dev/null',
        likes: 25,
        __v: 0
      },
    ]

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'TEVES',
      likes: 25
    })
  })

  test('test many 2', () =>  {
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
        author: 'TEVES',
        url: 'dev/null',
        likes: 3,
        __v: 0
      },
      {
        _id: 'EEEEFFFFF',
        title: 'Testi 3',
        author: 'TEVES',
        url: 'dev/null',
        likes: 1,
        __v: 0
      },
      {
        _id: 'FFFFGGGGG',
        title: 'Testi 3',
        author: 'TEVES',
        url: 'dev/null',
        likes: 2,
        __v: 0
      },
    ]

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'DEVES',
      likes: 20
    })
  })

  test('test one', () =>  {
    const blogs = [
      {
        _id: 'AAAAAABBBBB',
        title: 'Testi 1',
        author: 'AVES',
        url: 'dev/null',
        likes: 15,
        __v: 0
      },
    ]

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'AVES',
      likes: 15
    })
  })

  test('none', () =>  {
    const blogs = []

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(null)
  })
})