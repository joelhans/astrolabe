import { IoTelescopeOutline } from 'react-icons/io5'

const ContentWarning = ({ info }) => {
  return (
    <>
      <div className="inline-block text-lg font-sans font-medium bg-gray-200 mb-12 lg:mb-16 px-4 py-2 rounded-sm">
        Content warning: {info}
      </div>
    </>
  )
}

export default ContentWarning
