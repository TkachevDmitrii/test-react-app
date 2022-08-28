import { createPortal } from 'react-dom'

interface SlotProps {
  id: string
}

const elements = new Map<string, HTMLSpanElement>()

function getSlotElement(id: string) {
  let el = elements.get(id)
  if (el === undefined) {
    el = document.createElement('span')
    el.style.setProperty('display', 'contents')
    elements.set(id, el)
  }
  return el
}

export function renderToSlot(content: React.ReactNode, id: string) {
  const el = getSlotElement(id)
  return createPortal(content, el)
}

function appendSlotElement(node: HTMLSpanElement) {
  if (node) {
    node.style.setProperty('display', 'contents')
    const slotId = node.getAttribute('data-slot-id')
    if (slotId === null) return
    const el = getSlotElement(slotId)
    node.appendChild(el)
  }
}

export function Slot({ id }: SlotProps) {
  return <span data-slot-id={id} ref={appendSlotElement} />
}
