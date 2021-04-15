import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'

const CodeBlock = ({ children }) => {
  const code = children.props.children.trim()
  const [language, meta] = children.props.className.split(':')
  const lang = language.replace(/language-/, '').replace('conf', '')

  const title = meta && meta.includes('title=') && meta.split('title=')[1]

  console.log(JSON.stringify(code))

  return (
    <>
      <div className="CodeBlock group">
        {title && <div className="remark-code-title text-erin">{title}</div>}
        <Highlight {...defaultProps} theme={theme} code={code} language={lang}>
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} relative overflow-x-scroll text-left mt-0 mb-0`}>
              <button
                className="opacity-0 group-hover:opacity-100 absolute pin top-4 right-6 text-sm font-sans text-salmon hover:text-erin font-medium py-1 px-2 rounded focus:outline-none focus:ring focus:ring-erin focus:ring-opacity-50"
                onClick={() => {
                  navigator.clipboard.writeText(code)
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
