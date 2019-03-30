import populate_user from './populate_user'
import populate_other_user from './populate_other_user'
import set_token from './set_token'


const http_request_get_self = (user) => {


  return (dispatch) => {
    return fetch('http://localhost:3001',
    {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({username: user.username.value, password: user.password.value})
    }).then(res=> res.json()).then((result)=>{
      dispatch(populate_user(result.user))
      dispatch(populate_other_user(result.user))
      dispatch(set_token(result.token))
    }).catch(error=>{
      throw error
    })
  }
}

export default http_request_get_self
