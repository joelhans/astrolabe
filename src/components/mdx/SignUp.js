import ConvertKitForm from 'convertkit-react'

const config = {
  formId: 2474731,
  template: 'clare',
  submitText: 'Sign up',
  stack: false,
  buttonBackground: '#20b2aa',
}

const SignUp = ({ heading }) => {
  return (
    <div className="flex items-center w-full bg-steel bg-opacity-10 p-6 rounded">
      <ConvertKitForm {...config} />
    </div>
  )
}

export default SignUp
