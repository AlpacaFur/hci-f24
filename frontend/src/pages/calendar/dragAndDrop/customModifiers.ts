import { DropAnimation, Modifier } from "@dnd-kit/core"
import { Transform } from "@dnd-kit/utilities"

export function createSnapModifier(
  gridSizeX: number,
  gridSizeY: number
): Modifier {
  return ({ transform }) => ({
    ...transform,
    x: Math.ceil((transform.x - gridSizeX / 2) / gridSizeX) * gridSizeX,
    y: Math.ceil((transform.y - gridSizeY / 2) / gridSizeY) * gridSizeY,
  })
}
export type ClientRect = NonNullable<Parameters<Modifier>[0]["activeNodeRect"]>

export function restrictToBoundingRect(
  transform: Transform,
  rect: ClientRect,
  boundingRect: ClientRect
): Transform {
  const value = {
    ...transform,
  }

  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top
  } else if (
    rect.bottom + transform.y >=
    boundingRect.top + boundingRect.height
  ) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left
  } else if (
    rect.right + transform.x >=
    boundingRect.left + boundingRect.width
  ) {
    value.x = boundingRect.left + boundingRect.width - rect.right
  }

  return value
}

export const restrictToParentElement: (
  containerRef: React.RefObject<HTMLDivElement>
) => Modifier =
  (containerRef): Modifier =>
  ({ draggingNodeRect, transform }) => {
    const rect = containerRef.current?.getBoundingClientRect()

    if (!draggingNodeRect || rect === undefined) {
      return transform
    }

    const clientRect = {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
    }

    return restrictToBoundingRect(transform, draggingNodeRect, clientRect)
  }

export const customDropAnimation: DropAnimation = {
  keyframes: (props) => [
    {
      transform: `translate(${props.transform.initial.x}px, ${props.transform.initial.y}px)`,
    },
    {
      transform: `translate(${props.transform.final.x}px, ${props.transform.final.y}px)`,
    },
  ],
  easing: "ease",
  duration: 300,
}
