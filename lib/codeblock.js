const visit = require('unist-util-visit')

module.exports = (options) => (tree) => {
  // console.log(tree)
  visit(
    tree,
    // only visit pre tags that contain a code element
    (node) => node.type === 'code',
    (node, index) => {
      console.log(node)

      const titleNode = {
        type: 'html',
        value: `<div class="block">hello there man</div>`.trim(),
      }

      tree.children.splice(index, 0, titleNode)
    }
  )
}
