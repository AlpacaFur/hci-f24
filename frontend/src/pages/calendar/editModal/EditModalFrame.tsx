import { PropsWithChildren } from "react"

export const EditModalFrame: React.FC<
  PropsWithChildren<{ isShown: boolean; hide: () => void; title: string }>
> = ({ children, title, isShown, hide }) => {
  return (
    <div className={"assignment-edit-modal" + (isShown ? " editing" : "")}>
      <div className="header">
        <h3>{title}</h3>
        <button
          onClick={(event) => {
            hide()
            event.preventDefault()
          }}
        >
          ✗
        </button>
      </div>
      <div className="content">{children}</div>
    </div>
  )
}
