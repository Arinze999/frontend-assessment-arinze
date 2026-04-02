# cm-webapp

A book discovery app built for the Checkit Frontend Engineer take-home assessment.

It uses the Open Library API to let users browse books, search by keyword, filter results by language, scroll through more results, and open a dedicated detail page for each book.

## Features

- Responsive book listing page
- Debounced search with URL-synced query state
- Language filtering
- Infinite scroll for loading more results
- Server-rendered book detail pages
- Loading, error, empty, and not-found states
- Image shimmer and fallback UI for missing book covers
- Rich description rendering for plain text, Markdown, and HTML
- Reset search/filter action
- Back to results action from the detail page

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Open Library API
- Vitest
- React Testing Library

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

The app follows a feature-based structure to keep route logic, UI components, and data utilities clearly separated.

- `src/app` – routes, layouts, and route-level UI states
- `src/components` – components not tied to a specific part of the app
- `src/features/books` – book-related components and feature logic
- `src/lib` – shared utilities and API helpers
- `src/types` – shared TypeScript types

## Key Decisions

### Why Open Library

I chose Open Library because it provides enough book and author data to support a realistic content explorer without needing authentication or a custom backend.

### Why infinite scroll

Infinite scroll felt like a better fit than pagination for this project because the app is built around browsing and discovery. It keeps the experience smoother while still allowing the first page to load quickly.

### Why an internal API route for loading more results

For infinite scroll, I used an internal `/api/books` route instead of calling Open Library directly from the client. This kept the client component simpler and gave me one place to handle request shaping, normalization, and error handling.

also

used native fetch with Next.js instead of TanStack Query because most of the important data in the app was already being loaded on the server, especially for the listing page and detail page. So I did not really need the extra client-side query setup. For loading more books during infinite scroll, I used an internal API route so the client side could stay focused on the UI and interaction part, while the request handling stayed in one place.

The trade-off is that it adds one extra internal hop, but for this project I felt the cleaner structure was worth it.

## Performance and UX Notes

- The first set of results is server-rendered for a faster initial load
- Search input uses a 900ms debounce to reduce noisy requests while typing
- Infinite scroll uses Intersection Observer with a preload buffer for smoother loading
- Book covers use next/image, with the main book cover on the detail page loaded eagerly for a better above-the-fold experience, while listing-page covers are left to load normally to avoid over-prioritizing too many images at once.
- Skipped priority because it is deprecated in Next 16, used loading="eager" on the detail page cover instead because that image is above the fold and should load immediately, while the listing page has many images so.. did not want to over-prioritize all of them.
- Missing or failed covers fall back to a styled placeholder instead of broken images
- Skeletons and spinners are used to make loading states feel more polished
- The search input and language filter both drive the listing query, and their state is synced to the URL. This makes the filtered view shareable, preserves state on refresh, and keeps the search experience aligned with the Open Library data source.

## Testing

This project uses Vitest and React Testing Library for focused unit and component tests.

Current test coverage includes:

- search param parsing
- Open Library helper logic
- rich text rendering behavior

I kept the tests focused on the most important logic rather than trying to over-test every UI detail.

## Build Notes

A few implementation details were adjusted during development to improve stability and polish:

- reduced the Open Library search payload to only the fields needed
- added retry handling for temporary upstream API failures
- fixed a query update loop in the debounced search flow
- added deduplication while appending paginated results

## Trade-offs

Because this is a small take-home project, I tried to keep the architecture clean without overcomplicating it.

A few examples:

- I added an API route for infinite scroll, but did not introduce unnecessary global state
- I added a reusable rich text viewer for descriptions, but kept the rest of the detail page simple
- I added route-level and root-level error handling where it improved resilience, but avoided extra setup that did not add much value for a project of this size

### Rendering strategy

The listing page is rendered server-side at request time rather than statically generated at build time.

I initially explored a cached/static-style approach, but Open Library’s availability was inconsistent during build, which made prerendering unreliable. I switched the listing page to SSR (`dynamic = 'force-dynamic'` with `cache: 'no-store'`) so the app remains stable in production while still satisfying the requirement for a server-rendered listing page.

Trade-off: this gives up build-time prerendering and some caching potential, but it avoids fragile builds caused by an unstable third-party API.
