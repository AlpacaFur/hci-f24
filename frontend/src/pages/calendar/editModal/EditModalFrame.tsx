import { PropsWithChildren } from "react"

export type ModalSide = "left" | "right"
export type VerticalAlign = "top" | "bottom"

export const EditModalFrame: React.FC<
  PropsWithChildren<{
    isShown: boolean
    hide: () => void
    title: string
    side: ModalSide
    verticalAlign: VerticalAlign
  }>
> = ({ children, title, isShown, hide, side, verticalAlign }) => {
  return (
    <div
      className={
        `assignment-edit-modal ${side} ${verticalAlign}` +
        (isShown ? " editing" : "")
      }
    >
      <div className="header">
        <h3>{title}</h3>
        <button
          onClick={(event) => {
            hide()
            event.preventDefault()
          }}
        >
          ✓
        </button>
      </div>
      <div className="content">{children}</div>
    </div>
  )
}
