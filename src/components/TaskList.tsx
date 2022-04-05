import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if(!newTaskTitle) return  
    // Verifica se tem algo escrito no campo de ToDo

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    //

    setTasks(oldState => [...oldState, newTask]) 
    //oldState = Pega todos os itens e "coloca em um novo array".
    //newTask = Adiciona a nova task no array.

    setNewTaskTitle('') 
    // Deixa o campo vazio para nova task
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newTasks = tasks.map(task => task.id == id ? {
      //Tasks.map - Vai verificar o ID se é o mesmo que foi selecionado e Sobrescrever o isComplete 
      ...task,
      isComplete: !task.isComplete
      //Sobrescreve o isComplete 
    } : task) 

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const filteredTasks = tasks.filter(task => task.id != id)
    //Filtra todas as tasks com o ID diferente da selecionada. 

    setTasks(filteredTasks)
    //Mostra em tela apenas as tasks que não tiverem o mesmo ID da que esta sendo excluida.
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}