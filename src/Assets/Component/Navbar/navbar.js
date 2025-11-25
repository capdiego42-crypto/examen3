import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import DollarWidget from '../stats/DollarWidget'
import Hero from '../Hero/Hero'; // Asegúrate de que la ruta a tu componente Hero sea correcta

const user = {
  name: 'Tom Cook',
  email: 'tomi29@example.com',
  imageUrl:
    'data:image/png;base64,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',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-blue-500/90">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="data:image/png;base64,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"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-gray-950/50 text-white'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={user.imageUrl}
                        className="size-8 rounded-full outline outline-1 -outline-offset-1 outline-white/10"
                      />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline outline-1 -outline-offset-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-white/5 data-[focus]:outline-none"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-white/10 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="size-10 rounded-full outline outline-1 -outline-offset-1 outline-white/10"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>


        <main className="w-screen h-screen">
          <div className="w-full h-full">
            <Hero />
            <div className="w-full h-full">
              <h2></h2>
            </div>
            <h2></h2>
            <div className="mt-8 mb-8">
              <DollarWidget />
            </div>
            <div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
