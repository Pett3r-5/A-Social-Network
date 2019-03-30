import populate_user from './populate_user'
import define_auth from './define_auth'


const http_request_get_self = (user) => {
  return (dispatch, getState) => {
    fetch('http://localhost:3001',
    {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({username: user.username.value, password: user.password.value})
    }).then(res=> res.json()).then((result)=>{
      dispatch(populate_user(result))
      dispatch(define_auth(true))
    }).catch(error=>{
      dispatch(define_auth(false))
      console.log(error)
    })
  }
}

export default http_request_get_self
