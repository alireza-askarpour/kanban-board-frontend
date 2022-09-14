export const setInputHeight = (element: any, defaultHeight: string) => {
  // Support passing an event and a row element via React ref
  const target = element.target ? element.target : element
  target.style.height = defaultHeight
  target.style.height = `${target.scrollHeight}px`
}
