import { IoTelescopeOutline } from 'react-icons/io5'

const Award = ({ info, author }) => {
  return (
    <>
      <div className="font-sans text-white font-medium text-lg mb-24 px-8 py-6 bg-gradient-to-tr from-[#0d1c48] to-[#0f062d] rounded-sm">
        {/* <IoTelescopeOutline className="w-8 h-8 text-amber-500 mx-auto my-16" /> */}
        <p>
          <span dangerouslySetInnerHTML={{ __html: info }}></span> &mdash;congratulations to{' '}
          {author}!
        </p>
      </div>
    </>
  )
}

export default Award
