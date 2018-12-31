import { connect } from 'react-redux'
import UserBody from './UserBody'

const mapStateToProps = (state) => ({
  posts: state.loggedin.posts
})

const UserBodyContainer = connect(mapStateToProps)(UserBody)

export default UserBodyContainer
