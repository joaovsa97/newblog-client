import "./style.scss"

const Button = (props) => {
    const {text} = props
  return (
    <button>{text}</button>
  )
}

export default Button