import React from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, autorun} from 'mobx';
import { observer } from 'mobx-react';

// class ObservableTodoStore {
// 	@observable todos = [];
//     @observable pendingRequests = 0;

//     constructor() {
//         autorun(() => console.log(this.report));
//     }

// 	@computed get completedTodosCount() {
//     	return this.todos.filter(
// 			todo => todo.completed === true
// 		).length;
//     }

// 	@computed get report() {
// 		if (this.todos.length === 0)
// 			return "<none>";
// 		return `Next todo: "${this.todos[0].task}". ` +
// 			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
// 	}

// 	addTodo(task) {
// 		this.todos.push({
// 			task: task,
// 			completed: false,
// 			assignee: null
// 		});
// 	}
// }
// const observableTodoStore = new ObservableTodoStore();

// @observer
// class TodoList extends React.Component {
//   render() {
//     const store = this.props.store;
//     return (
//       <div>
//         { store.report }
//         <ul>
//         { store.todos.map(
//           (todo, idx) => <TodoView todo={ todo } key={ idx } />
//         ) }
//         </ul>
//         { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
//         <button onClick={ this.onNewTodo }>New Todo</button>
//         <small> (double-click a todo to edit)</small>
//         <RenderCounter />
//       </div>
//     );
//   }

//   onNewTodo = () => {
//     this.props.store.addTodo(prompt('Enter a new todo:','coffee plz'));
//   }
// }

// @observer
// class TodoView extends React.Component {
//   render() {
//     const todo = this.props.todo;
//     return (
//       <li onDoubleClick={ this.onRename }>
//         <input
//           type='checkbox'
//           checked={ todo.completed }
//           onChange={ this.onToggleCompleted }
//         />
//         { todo.task }
//         { todo.assignee
//           ? <small>{ todo.assignee.name }</small>
//           : null
//         }
//         <RenderCounter />
//       </li>
//     );
//   }

//   onToggleCompleted = () => {
//     const todo = this.props.todo;
//     todo.completed = !todo.completed;
//   }

//   onRename = () => {
//     const todo = this.props.todo;
//     todo.task = prompt('Task name', todo.task) || todo.task;
//   }
// }

// ReactDOM.render(
//   <TodoList store={ observableTodoStore } />,
//   document.getElementById('root')
// )

class TodoList {
    @observable todos = [{
        id: 1,
        title: 1,
        finished: false
    }, { 
        id: 2,
        title: 2,        
        finished: false
    }, {
        id: 3,
        title: 3,        
        finished: false
    }];

    // constructor () {
    //     autorun(() => {
    //         console.log("Tasks left: " + this.todos.unfinishedTodoCount)
    //     })
    // }

    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}

@observer
class TodoListView extends React.Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <span> { todo.title } </span>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        ></input>
    </li>
)

const store = new TodoList();

ReactDOM.render(
    <TodoListView todoList={store} />, 
    document.getElementById('root')
)