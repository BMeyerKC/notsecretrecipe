import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import BrowseRecipesPage from '@/features/recipes/pages/BrowseRecipesPage'
import RecipeDetailPage from '@/features/recipes/pages/RecipeDetailPage'
import AddRecipePage from '@/features/authoring/pages/AddRecipePage'
import { RecipeProvider } from '@/features/recipes/store'

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <BrowseRecipesPage /> },
        { path: '/recipe/:slug', element: <RecipeDetailPage /> },
        { path: '/add', element: <AddRecipePage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

export default function App() {
  return (
    <RecipeProvider>
      <RouterProvider router={router} />
    </RecipeProvider>
  )
}
