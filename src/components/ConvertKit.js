import ConvertKitForm from 'convertkit-react'

const config = {
  formId: 2474731,
  template: 'clare',
  submitText: 'Sign up',
  stack: false,
  buttonBackground: '#20b2aa',
}

const ConvertKit = () => {
  return (
    <div className="flex w-full flex-wrap bg-gray-50 -mx-8 my-12 p-8 rounded-sm shadow-md">
      <div className="prose prose-md lg:prose-lg dark:prose-dark mx-auto max-w-none">
        <p>
          Sign up for my newsletter, which I send once a month, for my writing, my disguises, and
          the tools I'm working on to make writing on the web better.
        </p>
      </div>
      <ConvertKitForm className="w-full mt-8" {...config} />
    </div>
  )
}

export default ConvertKit
