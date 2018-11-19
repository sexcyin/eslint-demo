import React, { Component } from "react";
import MyScroll from "./my-scroll";
import "./styles/index.less"


class App extends Component {
  
  // getItems() {
  //   return (
  //     this.state.list.map((item,index) => {
  //       <div key={index} className="item">
  //         <img src={item.img} />
  //         <div className="des">
  //           <div>{item.des}</div>
  //           <div>
  //             <span>{index}</span>
  //           </div>
  //         </div>
  //       </div>
  //     })
  //   )
  // }
  render () {
    return (
      <MyScroll>
        
      </MyScroll>
    );
  }
}

export default App;
