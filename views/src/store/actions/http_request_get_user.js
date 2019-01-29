
const http_request_get_user = (user) => {
  return (dispatch, getState) => {
    fetch('http://localhost:3001',
    {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({username: user.username.value, password: user.password.value})
    }).then(res=> res.json()).then((result)=>{
      dispatch({type:"POPULATE_LOGGED_USER", content: result})
    }).catch(error=>console.log(error))
  }
}

export default http_request_get_user
