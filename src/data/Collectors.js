const IntegrationsData = [
  {
    name: 'MySQL',
    description: 'Montior X, Y, and Z.',
    slug: 'mysql',
    type: 'service',
    category: ['database', 'storage'],
    orchestrator: 'go.d.plugin',
  },
  {
    name: 'Apache',
    description: 'Montior X, Y, and Z.',
    slug: 'apache',
    type: 'service',
    category: ['web server'],
    orchestrator: 'go.d.plugin',
  },
  {
    name: 'Nginx',
    description: 'Montior X, Y, and Z.',
    slug: 'nginx',
    type: 'service',
    category: ['web server'],
    orchestrator: 'go.d.plugin',
  },
  {
    name: 'RabbitMQ',
    description: 'Montior X, Y, and Z.',
    slug: 'rabbitmq',
    type: 'service',
    category: ['messaging'],
    orchestrator: 'go.d.plugin',
  },
  {
    name: 'Page cache',
    description: 'Montior X, Y, and Z.',
    slug: 'pache-cache',
    type: 'hardware',
    category: ['system core', 'memory'],
    orchestrator: 'internal',
  },
]

export default IntegrationsData
