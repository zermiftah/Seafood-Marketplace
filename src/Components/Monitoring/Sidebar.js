import { useNavigate } from 'react-router-dom';
import Logo from "../../Assets/img/logos.png";
import Avatar from "../../Assets/img/Avatar.jpg"
import {
  FolderIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';

const navigation = [
  { name: 'Account', href: '/ADMIN', icon: FolderIcon, current: false },
  { name: 'Master Data FI', href: '/MasterData', icon: ServerIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    navigate('/');

    const data = {
      ID_FI: null,
      LAST_LOGIN: null,
      TOKEN: token,
      ROLE: null,
      STATUS: 'NOT ACTIVED',
      PC_NAME: null,
      IP_ADDRESS: null,
    };

    console.log('Sending data:', data);

    try {
      const response = await axios.put('http://172.16.206.4:2001/updateFI_Account', data);

      if (response.status === 200) {
        console.log('LAST_LOGIN updated successfully');
        localStorage.removeItem('token');
      } else {
        console.error('Failed to update LAST_LOGIN');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <div>
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col bg-gray-900">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
            <div className="py-12 flex h-16 shrink-0 items-center">
              <img
                className="h-16 w-auto"
                src={Logo}
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-900',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-900"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-900"
                      src={Avatar}
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Administrator</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
