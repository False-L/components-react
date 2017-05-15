import React from 'react'
import ReactDOM from 'react-dom'

 class App extends React.Component{
   constructor(props){
     super(props)
     this.state={show:false}
     this.sideChange=this.sideChange.bind(this)
   }
  componentDidMount(){
  }
  sideChange(){
    let sideState=!this.state.show
    this.setState({show:sideState})
  }
  render(){
    return (
      <div className="app">
         <div className={this.state.show?"sidebar show":"sidebar"} onClick={this.sideChange}>
          <Sidebar />
          </div>
          <div className={this.state.show?"overlayClass":"dino"} onClick={this.sideChange}>
            diss
           </div> 
          <div className="content">
            {this.props.children}
          </div>
      </div>
    )
  }
}

export default App
