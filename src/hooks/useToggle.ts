import { useState, useCallback } from "react"

function useToggle(initialState: boolean = false): [boolean, any] {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState)

  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((): void => setState(state => !state), [])

  return [state, toggle]
}

export default useToggle
