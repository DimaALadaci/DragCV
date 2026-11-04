import { useState } from 'react'

/**
 * Small reusable state helper for expandable UI.
 * @param {boolean} initialValue
 */
export function useDisclosure(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue)

  function toggle() {
    setIsOpen((currentValue) => !currentValue)
  }

  return { isOpen, toggle }
}
