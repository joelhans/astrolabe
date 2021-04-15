import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'

const CodeBlock = ({ children, code, language, title }) => {
  // Get the code itself. If CodeBlock is called via MDX, it has `children`,
  // which contains the code. If CodeBlock is called directly, then the code is
  // inside the `code` prop.
  const codeText = children ? children.props.children.trim() : code

  // Get the language. If CodeBlock is called via MDX, the language is found via
  // the child's className, then stripped of unnecessary strings. If CodeBlock
  // is called directly, then the language is found via the `language` prop.
  const codeLang = children
    ? children.props.className.split(':')[0].replace('language-', '').replace('conf', '')
    : language

  // Get the title. If CodeBlock is called via MDX, the title is found via the
  // child's className, then stripped. If CodeBlock is called directly, then the
  // language is found via the `title` prop.
  const codeTitle = children ? children.props.className.split('title=')[1] : title

  return (
    <>
      <div className="CodeBlock group">
        {codeTitle && <div className="remark-code-title text-erin">{codeTitle}</div>}
        <Highlight {...defaultProps} theme={theme} code={codeText} language={codeLang}>
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} relative overflow-x-scroll text-left mt-0 mb-0`}>
              <button
                className="opacity-0 group-hover:opacity-100 absolute pin top-4 right-6 text-sm font-sans text-salmon hover:text-erin font-medium py-1 px-2 rounded focus:outline-none focus:ring focus:ring-erin focus:ring-opacity-50"
                onClick={() => {
                  navigator.clipboard.writeText(codeText)
                }}
              >
                Copy
              </button>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  <div className="table-row">
                    <span className="table-cell select-none pr-4">{i + 1}</span>
                    <div className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </>
  )
}

export default CodeBlock
