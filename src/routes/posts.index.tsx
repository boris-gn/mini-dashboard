import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/')({
  component: ContactIndexComponent,
})

function ContactIndexComponent() {
  return <div>Select a post.</div>
}
