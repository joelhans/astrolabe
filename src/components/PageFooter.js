import Image from 'next/image'
import SocialIcon from '@components/social-icons'
import Link from './Link'
import headerNavLinks from '@data/headerNavLinks'

const PageFooter = () => {
  return (
    <footer className="bg-gray-100 -mt-16 py-16 lg:pl-32">
      <div className="max-w-screen-lg mx-auto mb-auto px-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div>
            <p className="text-2xl">&copy; Astrolabe, 2022 &rarr; ?</p>
            <div className="flex mt-4">
              <SocialIcon
                kind="mastodon"
                href="https://writing.exchange/@astrolabe"
                className="mr-2"
              />
              <SocialIcon kind="instagram" href="https://www.instagram.com/ooo_astrolabe/" />
            </div>
          </div>
          <div>
            {headerNavLinks.map((link) => (
              <div key={link.title} className="mb-2 last:mb-0">
                <Link
                  href={link.href}
                  className="text-2xl italic tracking-wide text-gray-900 hover:text-green transform ease-in-out duration-300"
                >
                  {link.title}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <Image
              src="/static/clmp.png"
              alt="Proud member of CLMP, Community of Literary Magazines & Presses"
              width={281}
              height={172}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PageFooter
