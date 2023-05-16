import { useParams } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import TextareaAutosize from "react-textarea-autosize"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

import { classNames } from "../../../utils"
import * as taskService from "../../../services/task.service"
import * as sectionService from "../../../services/section.service"

import Icon from "../../../components/Shared/Icon/Icon"
import Button from "../../../components/Shared/Button/Button"
import TaskModal from "../../../components/Modal/TaskModal"

let timer: any

const Kanban = (props: any) => {
  const { boardId } = useParams()

  const [data, setData] = useState([])
  const [selectedTask, setSelectedTask] = useState<any>(null)

  useEffect(() => {
    setData(props.data)
    return () => clearTimeout(timer)
  }, [props.data])

  const handleCreateSection = async () => {
    const res = await sectionService.createSection(boardId)
    if (res.success) setData([...data, res.section])
    else toast.error("There is a problem on the server side")
  }

  const handleDeleteSection = async (sectionId: string) => {
    const res = await sectionService.deleteSection(boardId, sectionId)
    if (!res.success) toast.error("There is a problem on the server side")
    const newData = [...data].filter((e) => e._id !== sectionId)
    setData(newData)
  }

  const handleUpdateSectionTitle = (e: ChangeEvent<HTMLInputElement>, sectionId: string) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    const newData = [...data]
    const index = newData.findIndex((e) => e._id === sectionId)
    newData[index].title = newTitle
    setData(newData)
    timer = setTimeout(async () => {
      const res = await sectionService.updateSection(boardId, sectionId, { title: newTitle })
      if (!res.success) toast.error("There is a problem on the server side")
    }, 500)
  }

  const handleCreateTask = async (sectionId: string) => {
    const res = await taskService.craeteTask(boardId, { sectionId })
    if (res.success) {
      const newData: any = [...data]
      const index = newData.findIndex((e: any) => e._id === sectionId)
      newData[index].tasks.unshift(res.task)
      setData(newData)
    } else toast.error("There is a problem on the server side")
  }

  const handleUpdateTask = (task: any) => {
    const newData: any = [...data]
    const sectionIndex = newData.findIndex((e: any) => e._id === task.section._id)
    const taskIndex = newData[sectionIndex].tasks.findIndex((e: any) => e._id === task._id)
    newData[sectionIndex].tasks[taskIndex] = task
    setData(newData)
  }

  const handleDeleteTask = (task: any) => {
    const newData: any = [...data]
    const sectionIndex = newData.findIndex((e: any) => e._id === task.section._id)
    const taskIndex = newData[sectionIndex].tasks.findIndex((e: any) => e._id === task._id)
    newData[sectionIndex].tasks.splice(taskIndex, 1)
    setData(newData)
  }

  const handleDragEnd = async ({ source, destination }: DropResult) => {
    if (!destination) return
    const sourceColIndex = data.findIndex((e) => e._id === source.droppableId)
    const destinationColIndex = data.findIndex((e) => e._id === destination.droppableId)
    const sourceCol = data[sourceColIndex]
    const destinationCol = data[destinationColIndex]

    const sourceSectionId = sourceCol._id
    const destinationSectionId = destinationCol._id

    const sourceTasks = [...sourceCol.tasks]
    const destinationTasks = [...destinationCol.tasks]

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, removed)
      data[sourceColIndex].tasks = sourceTasks
      data[destinationColIndex].tasks = destinationTasks
    } else {
      const [removed] = destinationTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, removed)
      data[destinationColIndex].tasks = destinationTasks
    }

    const res = await taskService.updatePositionTask(boardId, {
      resourceList: sourceTasks,
      destinationList: destinationTasks,
      resourceSectionId: sourceSectionId,
      destinationSectionId: destinationSectionId,
    })
    if (!res.success) toast.error("There is a problem on the server side")
  }

  return (
    <>
      <section>
        <div className="flex items-center justify-between px-4 sm:px-8 lg:px-14">
          <p className="text-xs text-[#37352fa6] font-bold">{data.length} SECTIONS</p>
          <Button variant="primary" size="small" onClick={handleCreateSection}>
            New section
          </Button>
        </div>

        <hr className="my-3 color-[#E9E9E7]" style={{ margin: "12px 0" }} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <section className="px-4 sm:px-8 lg:px-14 space-x-2.5 flex items-start w-full overflow-x-auto min-h-[384px]">
            {data.map((section) => (
              <div key={section._id} className="w-80">
                <Droppable key={section._id} droppableId={section._id}>
                  {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="w-72 space-y-1.5 px-1 group">
                      <div className="flex items-start justify-between group">
                        <TextareaAutosize
                          value={section.title}
                          placeholder="Untitled"
                          onChange={(e) => handleUpdateSectionTitle(e, section._id)}
                          className="flex-1 resize-none outline-none px-1 rounded-md transition duration-150 border-2 cursor-pointer border-transparent focus:cursor-text focus:border-primary text-sm py-2 text-[#37352f] placeholder:text-[#37352f80]"
                        />
                        <div className="flex items-start my-2 transition duration-150 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => handleCreateTask(section._id)}
                            className="w-6 h-6 grid place-items-center rounded-[3px] hover:bg-[#EFEFEF] active:bg-[#37352f29]"
                          >
                            <Icon name="more-horizontal" stroke="gray" size={19} />
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section._id)}
                            className="w-6 h-6 grid place-items-center rounded-[3px] hover:bg-[#EFEFEF] active:bg-[#37352f29]"
                          >
                            <Icon name="plus" stroke="gray" size={18} />
                          </button>
                        </div>
                        <span className="text-[#37352f80] pr-1 leading-10 transition duration-150 text-sm group-hover:opacity-0">
                          {section.tasks.length}
                        </span>
                      </div>
                      {/* tasks */}
                      {section.tasks.map((task: any, index: number) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setSelectedTask(task)}
                              className={classNames(
                                "py-2.5 px-2 bg-white text-sm shadow-[0px_0px_0px_1px_#0f0f0f1a,0px_2px_4px_#0f0f0f1a] text-[#37352f] rounded-md",
                              )}
                            >
                              <span
                                className={classNames(
                                  "line-clamp-1 select-none",
                                  task.title === "" && "text-[#37352f80]",
                                )}
                              >
                                {task.title === "" ? "Untitled" : task.title}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </section>
        </DragDropContext>
        <TaskModal
          task={selectedTask}
          boardId={boardId}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      </section>
      <Toaster position="top-right" />
    </>
  )
}

export default Kanban
