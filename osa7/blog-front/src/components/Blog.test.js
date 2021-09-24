/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



describe('<Blog >', () => {

  /*
  Tee testi, joka varmistaa että blogin näyttävä komponentti renderöi blogin titlen,
  authorin mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää.
  */

  test('renders content', () => {
    const blog = {
      title: 'Jokin lisätty blogi',
      author: 'Muu',
      url: 'devtools',
      likes: 5,
      user: {
        name: 'Lisääjä'
      }
    }

    const user = {
      name: 'Lisääjä'
    }

    const mockLikeHandler = jest.fn()
    const mockRemiveHandler = jest.fn()

    const component = render(
      <Blog blog={blog} likeABlog={mockLikeHandler} removeABlog={mockRemiveHandler} user={user} />
    )

    const div = component.container.querySelector('.defaultContent')
    const otherDiv = component.container.querySelector('.togglableContent')

    expect(div).not.toHaveStyle('display: none')
    expect(otherDiv).toHaveStyle('display: none')

    expect(div).toHaveTextContent(
      'Jokin lisätty blogi'
    )

    expect(div).toHaveTextContent(
      'Muu'
    )

    expect(div).not.toHaveTextContent(
      5
    )

    expect(div).not.toHaveTextContent(
      'devtools'
    )
  })

  /*
  Tee testi, joka varmistaa että myös url ja likejen määrä näytetään
  kun blogin kaikki tiedot näyttävää nappia on painettu.
  */

  describe('button press tests', () => {

    test('verify style change', () => {
      const blog = {
        title: 'Jokin lisätty blogi',
        author: 'Muu',
        url: 'devtools',
        likes: 5,
        user: {
          name: 'Lisääjä'
        }
      }

      const user = {
        name: 'Lisääjä'
      }

      const mockLikeHandler = jest.fn()
      const mockRemoveHandler = jest.fn()

      const component = render(
        <Blog blog={blog} likeABlog={mockLikeHandler} removeABlog={mockRemoveHandler} user={user} />
      )

      const div = component.container.querySelector('.togglableContent')

      expect(div).toHaveStyle('display: none')

      const button = component.getByText('Show')
      fireEvent.click(button)

      expect(div).not.toHaveStyle('display: none')
    })

    test('verify content inside', () => {
      const blog = {
        title: 'Jokin lisätty blogi',
        author: 'Muu',
        url: 'devtools',
        likes: 5,
        user: {
          name: 'Lisääjä'
        }
      }

      const user = {
        name: 'Lisääjä'
      }

      const mockLikeHandler = jest.fn()
      const mockRemoveHandler = jest.fn()

      const component = render(
        <Blog blog={blog} likeABlog={mockLikeHandler} removeABlog={mockRemoveHandler} user={user} />
      )

      const div = component.container.querySelector('.togglableContent')

      expect(div).toHaveTextContent(
        'devtools'
      )
      expect(div).toHaveTextContent(
        5
      )
    })
  })

  describe('like button test', () => {
    test('press twice', () => {
      const blog = {
        title: 'Jokin lisätty blogi',
        author: 'Muu',
        url: 'devtools',
        likes: 5,
        user: {
          name: 'Lisääjä'
        }
      }

      const user = {
        name: 'Lisääjä'
      }

      const mockLikeHandler = jest.fn()
      const mockRemoveHandler = jest.fn()

      const component = render(
        <Blog blog={blog} likeABlog={mockLikeHandler} removeABlog={mockRemoveHandler} user={user} />
      )

      const button = component.getByText('Like this blog')

      fireEvent.click(button)
      fireEvent.click(button)

      expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
  })
})