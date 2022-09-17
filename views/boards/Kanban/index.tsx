import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

import * as taskService from "services/task.service"
import * as sectionService from "services/section.service"

import Icon from "components/Shared/Icon/Icon"
import Button from "components/Shared/Button/Button"
import TaskModal from "components/Modal/TaskModal"

let timer

const Kanban = (props: any) => {
  const [data, setData] = useState([])
  const [selectedTask, setSelectedTask] = useState<any>(null)

  const router = useRouter()
  const boardId = router.query.boardId

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
      const newData = [...data]
      const index = newData.findIndex((e) => e._id === sectionId)
      newData[index].tasks.unshift(res.task)
      setData(newData)
    } else toast.error("There is a problem on the server side")
  }

  const handleUpdateTask = (task: any) => {
    const newData = [...data]
    const sectionIndex = newData.findIndex((e) => e._id === task.section._id)
    const taskIndex = newData[sectionIndex].tasks.findIndex((e) => e._id === task._id)
    newData[sectionIndex].tasks[taskIndex] = task
    setData(newData)
  }

  const handleDeleteTask = (task: any) => {
    const newData = [...data]
    const sectionIndex = newData.findIndex((e) => e._id === task.section._id)
    const taskIndex = newData[sectionIndex].tasks.findIndex((e) => e._id === task._id)
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
        <div className="flex items-center justify-between">
          <Button variant="outline-primary" size="small" onClick={handleCreateSection}>
            Add section
          </Button>
          <p className="text-sm mr-10 text-gray-800">{data.length} Sections</p>
        </div>

        <hr className="my-3" style={{ margin: "12px 0" }} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <section className="flex items-start w-80 overflow-x-auto">
            {data.map((section) => (
              <div key={section._id} className="w-80">
                <Droppable key={section._id} droppableId={section._id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="w-80 p-3 mr-3">
                      <div className="flex items-center justify-between mb-3 p-3 bg-red-500">
                        <input
                          type="text"
                          value={section.title}
                          className="flex-1  outline-none"
                          placeholder="Untitled"
                          onChange={(e) => handleUpdateSectionTitle(e, section._id)}
                        />
                        <button
                          className="rounded-full p-1 transition hover:bg-gray-100 active:bg-gray-200"
                          onClick={() => handleCreateTask(section._id)}
                        >
                          <Icon name="add" color="gray" size={20} />
                        </button>
                        <button
                          className="rounded-full p-1 transition hover:bg-red-100 active:bg-red-200"
                          onClick={() => handleDeleteSection(section._id)}
                        >
                          <Icon name="trash" color="gray" size={20} />
                        </button>
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
                              // style={{ cursor: snapshot.isDragging ? "grab" : "pointer!important" }}
                            >
                              <p style={{ background: "orange", padding: "10px", borderRadius: "6px" }} className="bg-red-900">
                                {task.title === "" ? "Untitled" : task.title}
                              </p>
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
