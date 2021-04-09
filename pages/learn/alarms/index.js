import siteMetadata from '@data/siteMetadata'
import AlarmsLayout from '@/layouts/AlarmsLayout'
import { PageSeo } from '@components/SEO'

export default function Alarms() {
  return (
    <>
      <PageSeo
        title={`Alarms`}
        description={`Find information about every preconfigured alarm that comes with an installation of the open-source Netdata monitoring agent.`}
        url={`${siteMetadata.siteUrl}/learn/alarms`}
      />
      <AlarmsLayout title="Alarms" />
    </>
  )
}
