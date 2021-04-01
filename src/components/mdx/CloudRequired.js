import CustomLink from '../Link'
import Callout from './Callout'

const CloudRequired = ({ ...rest }) => {
  return (
    <Callout emoji="💡" {...rest}>
      This document requires a Netdata Cloud account.&nbsp;
      <CustomLink href="https://app.netdata.cloud/sign-up?cloudRoute=/spaces">
        <a>Sign up</a>
      </CustomLink>
      &nbsp;or&nbsp;
      <CustomLink href="https://app.netdata.cloud/sign-in?cloudRoute=/spaces">
        <a>sign in</a>
      </CustomLink>
      &nbsp;to follow along.
    </Callout>
  )
}

export default CloudRequired
