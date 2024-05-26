import { Fragment, useEffect, useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, Navigate, Outlet, redirect } from 'react-router-dom'
import { userStateContext } from '../context/ContextProvider'
import axiosClient from '../axios'
import axios from 'axios'

const navigation = [
//   { name: 'Recetas', href: '#', current: true },
//   { name: 'Cuentas vigentes', href: '#', current: false },
//   { name: 'Ultimos retiros', href: '#', current: false },
//   { name: 'Stock', href: '#', current: false },
  { name: 'Llamador', to: '/llamador'},
]

const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DefaultLayout() {

  const { currentUser, userToken, setCurrentUser, setUserToken } = userStateContext()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const checkAuth = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/user');
        if (response.data) {
            // Usuario autenticado, maneja los datos del usuario
            setCurrentUser(response.data);
            // console.log('User is authenticated', response.data);
        }
    } catch (error) {
        console.error('User is not authenticated', error);
    }
  };
  
  // Llama a checkAuth al cargar la aplicación
  useEffect(() => {
    checkAuth();
  }, []);
  
  // Llama a checkAuth al cargar la aplicación
  useEffect(() => {
    <Navigate to='/' />
  }, [isLoggingOut]);

  if(!userToken){
    return <Navigate to="login" />
  }

  if(!userToken){
    return <Navigate to="login" />
  }

  const logout = async (e) => {
    e.preventDefault();
    setIsLoggingOut(true);
    
    const cookie = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
    })

    await axios.post("http://localhost:8000/api/logout",
      {
        headers: {
          accept: "application/json",
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        withCredentials: true
      })
      .then(({ data }) => {
        setCurrentUser('');
        setUserToken(null);
      })
      .catch((error) => {
        console.log(error);
    });

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    }
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <h3 className='text-slate-50 font-sans text-xl border-2 pr-6 pl-1 font-semibold shadow-lg rounded-md'>logo Farmacia</h3>
                    </div>
                    {/* Botos del nav bar------------------------------------------------------------------------------- */}
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({isActive}) => classNames(
                                isActive
                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                    {/* END Botos del nav bar------------------------------------------------------------------------------- */}
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative">
                        <div className='flex gap-3 items-end'>
                          <MenuButton className='text-slate-100 font-roboto hover:text-blue-300'>Sin asignar</MenuButton>
                          <p className='text-slate-100 font-roboto'>{currentUser.name}</p>
                          <Link to='/logout'>
                            <ArrowRightEndOnRectangleIcon className='h-7 text-red-500' />
                          </Link>
                        </div>
                        {/* ----------------Menu desplegable------------------------------------ */}
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-16 z-10 mt-2 w-48 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <MenuItem>
                              <>
                                  <a href="#" className={'block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white'}>Ventanilla</a>
                                  <a href="#" className={'block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white'}>Preparacion</a>
                                  <a href="#" className={'block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white'}>Caja</a>
                                  <a href="#" className={'block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white'}>Entrega</a>
                              </>
                              </MenuItem>
                          </MenuItems>
                        </Transition>
                         {/* ------------FIN Menu desplegable------------------------------------ */}
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              {/* Version mobile */}
              <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={currentUser.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white"></div>
                      <div className="text-sm font-medium leading-none text-gray-400"></div>
                    </div>
                  </div>
                  {/* Menu de la verion mobile */}
                  {/* <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </div> */}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>

        <Outlet />
      </div>
    </>
  )
}
