import axios from 'axios'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import Post from '../Post/Post'
//DO I NEED TO IMPORT A DIFF COMPONENT CONTAINING MAPPED STATE? HERE OR MAPTOSTATEPROPS BELOW?

class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            posts: [],
            searchInput: '',
            userPosts: true
        }
    }

//component did mount below
    componentDidMount() {
        console.log('cdm', this.props)
        // if (!this.props.) IF STATEMENT HERE

        axios.get('/api/posts/').then((res) => {
            this.setState({
                posts: res.data
            })
        })
    }


    handleInput = (e) => {
        console.log('hi from input', e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    // handleSearch() {

    // }

    handleCheckbox = (e) =>{
        console.log('im the checkbox', e.target.checked)
        this.setState({ userPosts: e.target.checked })
    }

    handleClick = () => {
        const {userInput: content } = this.state
        axios.post('/api/posts', {content}).then((res) => {
            this.setState({
                posts: res.data,
                userInput: ''
            })
        })
    }

    handleEdit = (postid, content) => {
        axios.put(`/api/posts/${postid}`, {content}).then((res) => {
            this.setState({
                posts: res.data
            })
        })
    }

    handleDelete = (postid) => {
        axios.delete(`/api/posts/${postid}`).then((res) => {
            this.setState({
                posts: res.data
            })
        })
    }
  
    
    render() {
console.log(this.state.posts)
        const mappedPosts = this.state.posts.map((post, index) => {
            // console.log('posts data test', post)
            return (
                <Post
                post={post}
                key={post.id}
                handlClick={this.handleClick}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete} />
                // <div>
                //     <h3> {post.title} </h3>
                //     <div>
                //         <p> by {post.author_id} </p>
                //         <p> src={post.img} </p>
                //     </div>
                // </div>
            )
        })
        // console.log('mappedPosts', mappedPosts)

        return (
            <div>
                Dashboard
                <div className='dashboard-search-bar'>
                    <div className='search-area'>
                        <input type='text' placeholder='Search by Title' name='searchInput' onChange={ (e) => { this.handleInput(e) } } />
                        {/* // PLACE SEARCH BUTTON HERE AS IMG TAG  */}
                     <img className="search-button"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAeJJREFUSA2tlM0rBGEcx3dWEREp4oBVrvsXLJEoTsR/QDk6ydt1E2ccuIniKGeEi4MLbY6SAzaRUt5C1uer9pkZM7PM2m99muf5vT0zz/yeJxLxUSaTKYch2IJzeIF7SMECdPikeUzWTwuJI9iSUA0HcAhpKIVm6IEWkG/UsqwUz9yiaAmswScsQ31QBr4uOIEnGAyKM3aCVFjB/caYY0CcXmYVPqA7MBTnCOiN/1Q4W4h4C/Rf9D9qs3bzxKifdwNLxhhiQF4V3MGiJw2juuIN6jzOPxrInYRnKHOlYNBnbbuMISfkx0Dqc6ZGmcRB7Za3aMcLkq9BtYxUXC2nPv6vVMPVvir+Ajog/5VqvDqLqPgVxJzGsGP2uoicBlAtIxXfh15jyW+QIK0CdCXYYtV2kDpta7gRuRtwBpYnE+MeHEOxx/mLgZxW0Oke9g3FEYdHWAHv6r5ZkQixTZCGXdAW+wvnALzDJlT6R9lWYhKgwtKM7QkYEaSrVJfQLYxDozOUeRTaYB20FTuQBGnKGes7JqgG5kHXr3QJR3AKDyDp5+lO+t4KnhMguRYI3F8CdSh0T+tI6+TpgKiP1W7HHPkMTyPiJ5jMwTS+WeMo1EALgOT6gkLVVwdlF9CXFF4sMAapL60vtT4ftHlFAAAAAElFTkSuQmCC"
                    
                    onClick={() => this.handleSearch()} />
                    
                      <button className='reset-button'> Reset </button>
                    </div>
                    <div className='my-posts-checkbox'>
                    <p> My Posts </p>
                    <input type='checkbox' onChange={this.handleCheckbox} />
                    </div>
                </div>

                <div className='posts'>
                    <ul> {mappedPosts} </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Dashboard)