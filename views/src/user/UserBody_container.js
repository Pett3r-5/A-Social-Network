import { connect } from 'react-redux'
import UserBody from './UserBody'

const mapStateToProps = (state) => ({
  data: {
    posts: state.loggedin.posts,
    friends: state.loggedin.amigos
  }
})

const UserBodyContainer = connect(mapStateToProps)(UserBody)

export default UserBodyContainer
