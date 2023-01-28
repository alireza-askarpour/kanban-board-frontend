import SingleBoardItem from "./SingleBoardItem"

interface IProps {
  boards: any
  boardId: string
  parentBoardId: string
}

const InsideBoardItem = ({ boards, boardId, parentBoardId }: IProps) => {
  return boards.map(
    (item: any) =>
      parentBoardId === item.responseTo && (
        <div key={item._id} className="pl-4">
          <SingleBoardItem board={item} boardId={boardId} />
          <InsideBoardItem boards={boards} boardId={boardId} parentBoardId={item._id} />
        </div>
      )
  )
}

export default InsideBoardItem
