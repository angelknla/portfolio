import { Container, ContainerSucces } from './styles'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import validator from 'validator'

export function Form() {
  const formState = {
    succeeded: false
  }
  const [state, setState] = useState(formState)

  const [validEmail, setValidEmail] = useState(false)
  const [message, setMessage] = useState('')

  function verifyEmail(email: string) {
    if (validator.isEmail(email)) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }
  }

  useEffect(() => {
    if (state.succeeded) {
      toast.success('Message sent succesfully!', {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: 'succeeded',
      })
    }
  }, [state])

  if (state.succeeded) {
    return (
      <ContainerSucces>
        <h3>Thank you for getting in touch!</h3>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Back to top
        </button>
        <ToastContainer />
      </ContainerSucces>
    )
  }

  return (
    <Container>
      <h2>Use the form below to get in touch</h2>
      <form>
        <input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={(e) => {
            verifyEmail(e.target.value)
          }}
          required
        />
        <textarea
          required
          placeholder="Type here your message"
          id="message"
          name="message"
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        
        <button 
          type="submit"
          onClick={() => {setState({succeeded: true})}}
          disabled={ !validEmail || !message }
        >
          <a type='submit' href = "mailto: angel.canela@kurtgeiger.com">
          Send
          </a>
        </button>
        
      </form>
      <ToastContainer />
    </Container>
  )
}
