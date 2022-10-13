import Image from 'next/image'

const PageFooter = () => {
  return (
    <div className="flex flex-row justify-center bg-gray-200 -mt-16 mb-32 lg:mb-48 pt-16">
      <Image
        src="/static/clmp.png"
        alt="Proud member of CLMP, Community of Literary Magazines & Presses"
        width={375}
        height={229}
      />
    </div>
  )
}

export default PageFooter
