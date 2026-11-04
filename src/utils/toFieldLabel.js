/** @param {string} field @returns {string} */
export function toFieldLabel(field) {
  return field.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase())
}
