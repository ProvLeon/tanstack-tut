import * as React from 'react'
// import { Outlet, createRootRoute } from '@tanstack/react-router'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '@/styles.css?url'
import Header from '@/components/Header'
import { getTheme, resolveTheme } from '@/lib/theme'

export const Route = createRootRoute({
  beforeLoad: async () => {
    const theme = await getTheme()
    return { theme }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        title: 'Tanstart',

      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {

  const { theme } = Route.useRouteContext()
  const resolvedTheme = resolveTheme(theme)

  return (
    <html lang="en" className={resolvedTheme} suppressHydrationWarning>
      <head><HeadContent /></head>
      <body>
        {/*<ThemeProvider>*/}
        <div className='fixed inset-0 bg-grid pointer-events-none -z-10'
          aria-hidden='true'
        />

        <div className='fixed w-72 h-72 bg-blue-800 rounded-full -right-20 -top-30 blur-3xl opacity-10 dark:opacity-40 -z-10 pointer-events-none' />
        <div className='fixed w-md h-112 bg-orange-500 rounded-full -left-30 -bottom-50 blur-3xl opacity-10 dark:opacity-20 -z-10 pointer-events-none' />

        <React.Fragment>
          <Header />

          <main className='relative z-0 px-8'>
            {/*</div>*/}
            {children}
          </main>
        </React.Fragment>

        {/*<TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />*/}
        {/*<Toaster position="top-center" richColors />*/}
        <Scripts />
        {/*</ThemeProvider>*/}
      </body>
    </html>
  )
}
