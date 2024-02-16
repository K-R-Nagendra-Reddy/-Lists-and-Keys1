import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here

class App extends Component {
  state = {
    taskList: [],
    addedTask: '',
    category: tagsList[0].optionId,
    buttonText: '',
  }

  renderEmptyCardView = () => (
    <div className="empty-container">
      <h1 className="down-heading">No Tasks Added Yet</h1>
    </div>
  )

  onSubmitForm = event => {
    event.preventDefault()
    const {addedTask, category} = this.state
    const newObject = {
      id: uuidv4(),
      task: addedTask,
      category,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newObject],
      addedTask: '',
      category: tagsList[0].displayText,
    }))
  }

  onChangeInputText = event => {
    this.setState({addedTask: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({category: event.target.value})
  }

  renderTasksList = () => {
    const {taskList} = this.state
    return (
      <ul className="tasks-given-container">
        {taskList.map(eachTask => (
          <li className="task-item-list" key={eachTask.id}>
            <p className="task-style">{eachTask.task}</p>
            <button type="button" className="category-style">
              {eachTask.category}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {taskList, addedTask, category} = this.state
    console.log(taskList[0])
    return (
      <div className="div-container">
        <form className="top-container" onSubmit={this.onSubmitForm}>
          <h1 className="heading">Create a task!</h1>
          <div className="input-select">
            <label htmlFor="text" className="text-element">
              Task
            </label>
            <input
              type="text"
              className="input-text"
              id="text"
              value={addedTask}
              placeholder="Enter the task here"
              onChange={this.onChangeInputText}
            />
          </div>
          <div className="input-select">
            <label htmlFor="select" className="text-element">
              Tags
              <select
                className="input-text"
                value={category}
                onChange={this.onChangeSelect}
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit" className="add-task-button">
            {' '}
            Add Task
          </button>
        </form>
        <div className="down-container">
          <h1 className="down-heading">Tags</h1>
          <ul className="ul-container">
            {tagsList.map(eachTag => {
              const {displayText} = eachTag
              const onClickCategoryFilter = () => {
                const filteredList = taskList.filter(
                  each => each.displayText === displayText,
                )
                this.setState({taskList: filteredList})
              }

              return (
                <li key={eachTag.optionId} className="list-item">
                  <button
                    type="button"
                    className="tag-button"
                    onClick={onClickCategoryFilter}
                  >
                    {eachTag.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="down-heading">Tasks</h1>
          {taskList.length === 0
            ? this.renderEmptyCardView()
            : this.renderTasksList()}
        </div>
      </div>
    )
  }
}

export default App
