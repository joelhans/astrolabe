import siteMetadata from '@data/siteMetadata'
import AlarmsHome from '@/layouts/AlarmsHome'
import { PageSeo } from '@components/SEO'

export default function Alarms() {
  return (
    <>
      <PageSeo
        title={`Alarms`}
        description={`Find information about every preconfigured alarm that comes with an installation of the open-source Netdata monitoring agent.`}
        url={`${siteMetadata.siteUrl}/learn/alarms`}
      />
      <AlarmsHome title="Alarms" />
    </>
  )
}
