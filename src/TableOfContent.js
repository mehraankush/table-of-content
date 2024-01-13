import './tableOfContent.css'
import { useEffect, useState } from 'react';
import { useHeadsObserver } from './hook'

function TableOfContent() {
    const [headings, setHeadings] = useState([])
    const {activeId} = useHeadsObserver()

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3, h4"))
            .map((elem) => ({
                id: elem.id,
                text: elem.innerText,
                level: Number(elem.nodeName.charAt(1))
            }))
        setHeadings(elements)
    }, [])

    const getClassName = (level) => {
        switch (level) {
          case 2:
            return 'head2'
          case 3:
            return 'head3'
          case 4:
            return 'head4'
          default:
            return null
        }
      }

    return (
        <nav>
            <ul>
                {headings.map(heading => (
                    <li
                        key={heading.id}
                        className={getClassName(heading.level)}
                    >
                        <a
                        style={{
                            fontWeight: activeId === heading.id ? "bold" : "normal" 
                          }}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault()
                                document.querySelector(`#${heading.id}`).scrollIntoView({
                                    behavior: "smooth"
                                })
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default TableOfContent