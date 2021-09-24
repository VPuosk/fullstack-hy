/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm >', () => {
  test('correct return to blog creation', () => {

    const mockCaller = jest.fn()

    const component = render(
      <BlogForm createBlogPost={mockCaller}/>
    )

    const inputData = {
      title: 'TestiBlogi',
      author: 'Julkaisija',
      url: 'osoite',
    }

    const titleInput = component.getByLabelText('Title')
    const authorInput = component.getByLabelText('Author')
    const urlInput = component.getByLabelText('URL')
    const submitForm = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: inputData.title }
    })
    fireEvent.change(authorInput, {
      target: { value: inputData.author }
    })
    fireEvent.change(urlInput, {
      target: { value: inputData.url }
    })

    fireEvent.submit(submitForm)

    expect(mockCaller.mock.calls).toHaveLength(1)

    const feedValues = mockCaller.mock.calls[0][0]

    expect(feedValues.title).toBe(inputData.title)
    expect(feedValues.author).toBe(inputData.author)
    expect(feedValues.url).toBe(inputData.url)
    expect(feedValues.likes).toBe(0)
  })
})