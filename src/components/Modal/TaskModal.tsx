import { ChangeEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import moment from "moment"

import * as taskService from "services/task.service"
import { setInputHeight } from "utils"

import Modal from "components/Shared/Modal/Modal"
import Icon from "components/Shared/Icon/Icon"
import { Button, Input } from "components/Shared"

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
    <Modal isOpen={task !== null} onClose={onClose} className=" max-w-[500px]">
      <div className="space-y-3">
        <Input
          value={title}
          placeholder="Untitled"
          inputClassName="text-xl text-gray-600 placeholder:text-gray-400"
          onChange={handleUpdateTitle}
        />
        <textarea
          value={content}
          placeholder="Add a description"
          className="text-gray-500 w-full h-40 resize-none py-2 px-4 text-base mb-4 outline-none border rounded-lg placeholder:font-light focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          onChange={handleUpdateContent}
        ></textarea>
      </div>
      <div className="flex justify-end space-x-3 mt-3">
        <Button variant="secondary" size="small" className="px-4">
          Close
        </Button>
        <Button variant="danger" size="small" className="px-4" onClick={handleDeleteTask}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}

export default TaskModal
