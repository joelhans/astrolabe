import AlarmLayout from '@/layouts/AlarmLayout'
import AlarmsData from '@data/Alarms.json'

export async function getStaticPaths() {
  const paths = AlarmsData.map((alarm) => ({
    params: { slug: [alarm.name] },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  slug = slug.toString()
  const page = AlarmsData.find((page) => page.name === slug) || { notfound: true }

  return { props: { page } }
}

export default function Doc({ page, toc }) {
  console.log(toc)
  return (
    <>
      <AlarmLayout data={page} />
    </>
  )
}
