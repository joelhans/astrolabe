import AlarmLayout from '@/layouts/AlarmLayout'

import alarms from '@data/Alarms.json'

export async function getStaticPaths() {
  const paths = alarms.map((alarm) => ({
    params: { slug: [alarm.name] },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  slug = slug.toString()
  const page = alarms.find((page) => page.name === slug) || { notfound: true }

  return { props: { page } }
}

export default function Doc({ page }) {
  return (
    <>
      <AlarmLayout data={page} />
    </>
  )
}
