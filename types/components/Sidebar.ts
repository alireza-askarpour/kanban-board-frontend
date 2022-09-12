export interface IResult {
  draggableId: string
  destination: {
    droppableId: string
    index: number
  }
  source: {
    droppableId: string
    index: number
  }
}
