import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BrowseRecipesPage from './BrowseRecipesPage'
import { RecipeProvider } from '../store'
import { describe, it, expect } from 'vitest'

function renderWithProviders() {
  return render(
    <MemoryRouter>
      <RecipeProvider>
        <BrowseRecipesPage />
      </RecipeProvider>
    </MemoryRouter>,
  )
}

describe('BrowseRecipesPage', () => {
  it('renders hero and recipe cards', () => {
    renderWithProviders()
    expect(screen.getByText(/cook from the collective memory/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Sheet-Pan Lemon Garlic Salmon/i })).toBeInTheDocument()
  })

  it('filters recipes via search', async () => {
    renderWithProviders()
    const searchInput = screen.getByPlaceholderText(/search ingredients/i)
    fireEvent.change(searchInput, { target: { value: 'tacos' } })
    await waitFor(() => {
      const cards = within(screen.getByTestId('recipe-list')).getAllByRole('link')
      expect(cards).toHaveLength(1)
    })
    expect(screen.getByRole('heading', { name: /Smoky Chipotle Lentil Tacos/i })).toBeInTheDocument()
  })
})
