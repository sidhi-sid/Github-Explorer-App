import React from 'react';
import Search from './components/Search'
import './App.css';
import UserCard from './components/UserCard'

class App extends React.Component {
  state={
    user:null,
    error:null,
    loading:false
  }
  fetchUserData= async username=>{
  //fetch github api
  this.setState({loading:true},async()=>{
  try{
    const res = await fetch(`https://api.github.com/users/${username}`);
    if(res.ok){
      const data=await res.json();
      return this.setState({
        user:data,
        loading:false
      });
    }
    
    const error=(await res.json()).message;

    this.setState({
      error,
      loading:false
    })

  }catch(err){
    this.setState({
      error:"There was some error",
      loading:false
    })
  }
})
}
  


  render(){
    const {error,user}=this.state
    const {loading}=this.state
    return (
      <div>
    <Search fetchData={this.fetchUserData}/>
    {(loading && (<p>Loading...</p>))}
    {error && <p className="text-danger">{error}</p>}
    {!loading && !error && user && <UserCard user={user}/>}
      </div>
    
    )
    
  } 
}

export default App;
