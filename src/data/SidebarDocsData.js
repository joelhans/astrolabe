const SidebarDocsData = [
  {
    sidebar: 'default',
    items: [
      {
        title: 'Get started',
        slug: '/docs/get-started',
        children: [
          { href: '/docs/get-started/installation', title: 'Install Netdata' },
          { href: '/docs/get-started/visit-dashboard', title: 'Visit the dashboard' },
        ],
      },
      {
        title: 'About Netdata',
        href: '/docs/about/what-is-netdata',
        children: [
          { href: '/docs/get-started', title: 'What is Netdata?' },
          { href: '/docs/sign-up', title: 'Why use Netdata?' },
          { separator: true },
          { href: '/docs/what-is-netdata', title: 'Release notes' },
          { href: '/docs/security', title: 'Changelog' },
          { href: '/docs/security', title: 'Security design' },
        ],
      },
      {
        title: 'Installation',
        children: [
          {
            href: '/docs/installation/kickstart',
            title: 'Install on Linux with one-line kickstart script',
          },
          { href: '/docs/sign-up', title: 'Run with Docker' },
          { href: '/docs/installation/kubernetes', title: 'Deploy on Kubernetes' },
          { href: '/docs/what-is-netdata', title: 'Install on Linux with .deb package' },
          { href: '/docs/security', title: 'Install on Linux with .rpm package' },
          {
            href: '/docs/installation/kickstart-64',
            title: 'Install with pre-built static binary',
          },
          { separator: true },
          { href: '/docs/installation/update', title: 'Update the Agent' },
          { href: '/docs/installation/upgrade', title: 'Reinstall the Agent' },
          { href: '/docs/installation/troubleshooting', title: 'Installation troubleshooting' },
          { href: '/docs/installation/uninstall', title: 'Uninstall the Agent' },
        ],
      },
      {
        title: 'Configuration',
        children: [
          { href: '/docs/get-started', title: 'Edit files with <code>edit-config</code>' },
          { href: '/docs/sign-up', title: 'Start, stop, or restart' },
          { href: '/docs/what-is-netdata', title: 'Common configuration changes' },
          { href: '/docs/security', title: 'Add security to a node' },
          { separator: true },
          { title: 'Reference', subcategory: 'true' },
          { href: '/docs/configuration/reference', title: 'Configuration' },
          { href: '/docs/configuration/daemon', title: 'Daemon' },
        ],
      },
      {
        title: 'Dashboards',
        slug: '/docs/dashboards/',
        children: [
          { href: '/docs/dashboards/local', title: 'Agent dashboard' },
          { href: 'zoom-pan-edit-charts', title: 'Zoom, pan, and edit charts' },
          { href: 'custom', title: 'Build custom dashboards' },
        ],
      },
      {
        title: 'Data collection',
        children: [
          { href: '/docs/get-started', title: 'How collectors work' },
          { href: '/integrations', title: 'Supported data collectors' },
          { href: '/docs/dashboards/agent', title: 'Enable or configure a collector' },
          { separator: true },
          { title: 'Reference', subcategory: 'true' },
          { href: '/docs/configuration/daemon', title: 'Collectors' },
        ],
      },
    ],
  },
  {
    sidebar: 'cloud',
    items: [
      {
        title: 'Get started',
        children: [
          { href: '/docs/cloud/sign-up', title: 'Sign up or sign in' },
          { href: '/docs/cloud/invite', title: 'Invite your team' },
          { href: '/docs/cloud/claim', title: 'Claim your nodes' },
          { href: '/docs/cloud/claim', title: 'Getting around Netdata Cloud' },
        ],
      },
      {
        title: 'Dashboards',
        children: [
          { href: '/docs/cloud/dashboards/overview', title: 'Overview' },
          { href: '/docs/cloud/dashboards/nodes', title: 'Nodes view' },
          { href: '/docs/cloud/dashboards/overview', title: 'Kubernetes' },
          { href: '/docs/cloud/dashboards/new', title: 'Build new dashboards' },
        ],
      },
    ],
  },
]

export default SidebarDocsData
