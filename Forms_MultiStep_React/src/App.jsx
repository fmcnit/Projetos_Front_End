import UserForm  from './Components/UserForm'
import ReviewForm from './Components/ReviewForm'
import Thanks from './Components/Thanks'
import Steps from './Components/Steps'


import { GrFormNext , GrFormPrevious} from 'React-icons/gr'
import { FiSend } from 'react-icons/fi'
import './App.css'

import { useForm } from './hooks/useForm'
import { useState } from 'react'

const formTemplate = {
  name: "",
  email: "",
  review: "",
  comment: "",
}

function App() {
  const [data, setData] = useState(formTemplate)

  const updateFieldHandler = (key, value) =>{
    setData((prev) => {
      return{...prev, [key]: value}
    })
  }

  const formComponents = [
    // eslint-disable-next-line react/jsx-key
    <UserForm data={data} updateFieldHandler={updateFieldHandler}/>,
    // eslint-disable-next-line react/jsx-key
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler}/>,
    // eslint-disable-next-line react/jsx-key
    <Thanks data={data}/>
  ]
  const {currentStep, currentComponent, changeStep, islastStep, isFirstStep} = useForm(formComponents)

  return (
    <div className='app'>
      <div className='header'>
        <h2>Deixe sua Avaliação</h2>
        <p>Ficamos felizes em saber sua opnião</p>
      </div>
      <div className='form-container'>
        <Steps currentSteps={currentStep}/>
        <form onSubmit={(e)=> changeStep(currentStep +1, e)}>
          <div className='input-container'>{currentComponent}</div>
          <div className='actions'>
            {!isFirstStep &&(
              <button type='button' onClick={()=> changeStep(currentStep -1)}>
              <GrFormPrevious/>
              <span>Voltar</span>

            </button>
            )}
            {!islastStep ? (
            <button type='submit'>
              <span>Avançar</span>
              <GrFormNext/>
              </button>
            ) : (
            <button type='button'>
            <span>Enviar</span>
            <FiSend/>
            </button> 
            )}
          </div>
        </form>

      </div>

    </div>
  )
}

export default App
