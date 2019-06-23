import React, { useState } from 'react'
import Button from './Button'


export default class App extends React.Component {
  state={
    count: 0
  }

  handleIncrease = () =>{
    this.setState({
      count: this.state.count+1
    })
  }

  handleDecrease = ()=>{
    this.setState({
      count: this.state.count-1
    })
  }

  render() {
    return (
      <div>
        <h1>Count {this.state.count}</h1>
        <Button onIncrease={this.handleIncrease} onDecrease={this.handleDecrease}/>
      </div>
    )
  }
}



// const App = props => {
//   const [countState, countSetState] = useState(0)
//   const styleCenter = {
//     textAlign: 'center'
//   }

//   state = {
//     count: 0
//   }

//   const handleIncrease = () => {
//     this.setState({
//       count: count + 1
//     })
//   }

//   const handleDecrease = () => {
//     this.setState({
//       count: count - 1
//     })
//   }

//   return (
//     <div style={styleCenter}>
//       <h1>Count {countState}</h1>
//       <Button
//         onIncrease={}
//         onDecrease={() => countSetState(countState - 1)}
//       />
//     </div>
//   )
// }

// export default App
