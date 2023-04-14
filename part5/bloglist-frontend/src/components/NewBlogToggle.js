import { useState, forwardRef, useImperativeHandle } from 'react'

const NewBlogToggle = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false)
  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }
  NewBlogToggle.displayName= 'NewBlogToggle'

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} id='newBlogButton'>Create New Blog!</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>

  )
})

export default NewBlogToggle