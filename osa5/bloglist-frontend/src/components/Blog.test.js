/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

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

  expect(component.container.querySelector('.defaultContent')).toHaveTextContent(
    'Jokin lisätty blogi'
  )

  expect(component.container.querySelector('.defaultContent')).toHaveTextContent(
    'Muu'
  )

  expect(component.container.querySelector('.defaultContent')).not.toHaveTextContent(
    5
  )

  expect(component.container.querySelector('.defaultContent')).not.toHaveTextContent(
    'devtools'
  )

  component.debug()

})