import Link from 'next/link';
import Image from 'next/image';
import {
  RiFacebookCircleFill,
  RiDiscordFill,
  RiTwitterFill,
  RiInstagramFill,
} from 'react-icons/ri';
// import Logo from './Logo';

// privacy statement modal
// const Modal_Privacy = ({ closeHandler }) => {};

const Footer = (e) => {
  return (
    <>
      <footer className="flex select-none justify-center bg-base-300 p-10 text-base-content">
        <div className="w-full max-w-4xl">
          {/* app links */}
          <div className="flex flex-col lg:flex-row lg:justify-between">
            {/* logo */}
            <div className="mb-10 lg:mb-0">
              <Link href="/" passHref scroll>
                <p className="flex cursor-pointer items-center gap-3">
                  {/* <span className="relative h-8 w-8 ">
                    <Logo strokeColor="#D926A9" width={30} height={30} />
                  </span> */}
                  <span className="self-center whitespace-nowrap text-2xl font-semibold ">
                    Project Alumnus
                  </span>
                </p>
              </Link>
            </div>

            {/* links */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-bold uppercase text-secondary">
                  Links
                </h2>
                <ul className="flex flex-col gap-4 ">
                  <Link href="/events">
                    <li>
                      <a className="cursor-pointer hover:underline">
                        News and Events
                      </a>
                    </li>
                  </Link>
                  <Link href={'/listing'}>
                    <li>
                      <a className="cursor-pointer hover:underline">
                        Alumni Listing
                      </a>
                    </li>
                  </Link>
                  <Link href="/about">
                    <li>
                      <a className="cursor-pointer hover:underline">About Us</a>
                    </li>
                  </Link>
                </ul>
              </div>
              <div>
                <p className="mb-6 text-sm font-bold uppercase text-secondary ">
                  Follow us
                </p>
                <ul className="flex flex-col gap-4 ">
                  <Link href="https://www.facebook.com">
                    <li>
                      <p className="cursor-pointer hover:underline">Facebook</p>
                    </li>
                  </Link>
                  <Link href="https://www.discord.com">
                    <li>
                      <p className="cursor-pointer hover:underline">Discord</p>
                    </li>
                  </Link>
                  <Link href="https://www.twitter.com">
                    <li>
                      <p className="cursor-pointer hover:underline">Twitter</p>
                    </li>
                  </Link>
                  <Link href="https://www.instagram.com">
                    <li>
                      <p className="cursor-pointer hover:underline">
                        Instagram
                      </p>
                    </li>
                  </Link>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-bold uppercase text-secondary">
                  Legal
                </h2>
                <ul className="flex flex-col gap-4 ">
                  <li>
                    <Link href={'/privacypolicy'} passHref scroll={false}>
                      <p className="cursor-pointer hover:underline">
                        Privacy Policy
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/terms'} passHref scroll={false}>
                      <p className="cursor-pointer hover:underline">
                        Terms &amp; Conditions
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="divider my-8" />

          {/* copyright and social links */}
          <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
            <p className="text-sm text-gray-500 sm:text-center">
              &copy; 2022{' '}
              <span className="cursor-pointer hover:underline">
                Project Alumnus&trade;
              </span>
              . All Rights Reserved.
            </p>
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Link href="https://www.facebook.com">
                <p className="cursor-pointer text-base-content opacity-50 transition-opacity hover:opacity-100">
                  <RiFacebookCircleFill size={25} />
                </p>
              </Link>
              <Link href="https://www.discord.com">
                <p className="cursor-pointer text-base-content opacity-50 transition-opacity hover:opacity-100">
                  <RiDiscordFill size={25} />
                </p>
              </Link>
              <Link href="https://www.twitter.com">
                <p className="cursor-pointer text-base-content opacity-50 transition-opacity hover:opacity-100">
                  <RiTwitterFill size={25} />
                </p>
              </Link>
              <Link href="https://www.instagram.com">
                <p className="cursor-pointer text-base-content opacity-50 transition-opacity hover:opacity-100">
                  <RiInstagramFill size={25} />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
