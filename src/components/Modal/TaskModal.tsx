import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import moment from "moment"

import * as taskService from "services/task.service"

import Modal from "components/Shared/Modal/Modal"
import Icon from "components/Shared/Icon/Icon"
import { setInputHeight } from "utils"

let timer
let isModalClosed = false

interface IProps {
  task: any
  boardId: any
  onClose: any
  onUpdate: any
  onDelete: any
}

const TaskModal = (props: IProps) => {
  const router = useRouter()

  const [task, setTask] = useState(props.task)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    setTask(props.task)
    setTitle(props.task !== null ? props.task.title : "")
    setContent(props.task !== null ? props.task.content : "")
    if (props.task !== null) {
      isModalClosed = false
    }
  }, [props.task])

  const handleUpdateTitle = async (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    const newTitle = e.target.value

    timer = setTimeout(async () => {
      const res = await taskService.updateTask(props.boardId, task._id, { title: newTitle })
      if (!res.success) toast.error("there is a problem on the server side")
    }, 500)

    task.title = newTitle
    setTitle(newTitle)
    props.onUpdate(task)
  }

  const onClose = () => {
    isModalClosed = true
    props.onUpdate(task)
    props.onClose()
  }

  const handleUpdateContent = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer)
    setInputHeight(e, "60px")
    const newContent = e.target.value

    if (!isModalClosed) {
      timer = setTimeout(async () => {
        const res = await taskService.updateTask(props.boardId, task._id, { content: newContent })
        if (!res.success) toast.error("There is a problem on the server side")
      }, 500)
    }

    task.content = newContent
    setContent(newContent)
    props.onUpdate(task)
  }

  const handleDeleteTask = async () => {
    const res = await taskService.deleteTask(props.boardId, task._id)
    if (res.success) {
      props.onDelete(task)
      setTask(null)
    } else toast.error("There is a problem on the server side")
  }

  return (
    <Modal isOpen={task !== null} onClose={onClose} className=" max-w-[480px]">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-500">{task !== null ? moment(task.createdAt).format("YYYY-MM-DD") : ""}</p>
        <button className="rounded-full p-2 transition hover:bg-red-100 active:bg-red-200" onClick={handleDeleteTask}>
          <Icon name="trash" color="red" size={20} />
        </button>
      </div>
      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={handleUpdateTitle}
          placeholder="Untitled"
          className="outline-none border text-2xl w-full font-medium text-gray-700 placeholder:text-gray-400 px-4 py-2 rounded-md"
        />
        <textarea
          value={content}
          placeholder="Add a description"
          className="text-gray-800 overflow-hidden w-full resize-none px-4 py-2 text-base mb-4 outline-none h-[60px] border rounded-md"
          onChange={handleUpdateContent}
        ></textarea>
      </div>
    </Modal>
  )
}

export default TaskModal
