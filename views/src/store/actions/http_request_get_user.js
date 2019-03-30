import populate_user from './populate_user'


const http_request_get_user = (user) => {
  return (dispatch, getState) => {
    fetch('http://localhost:3001',
    {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({_id: user._id})
    }).then(res=> res.json()).then((result)=>{
      dispatch(populate_user(result))
    }).catch(error=>console.log(error))
  }
}

export default http_request_get_user
