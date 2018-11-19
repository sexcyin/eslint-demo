import React, { Component } from "react";
import data from "./data";

const MAX_COUNT = 100,
  ITEM_HEIGHT = 95;


class MyScroll extends Component {
  state = {
    baseData: [],
    list: [],
    maxIndex: 100
  }
  componentDidMount() {
    document.addEventListener('scroll', this.scrollHandler);
    this.setState({
      baseData: data
    })
  }
  scrollHandler = (e) => {
    const { maxIndex } = this.state;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚动的高度
    let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;// 文档的总高度
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;// 浏览器视口的高度
    let max = Math.ceil(document.documentElement.offsetHeight/ITEM_HEIGHT);
    if (scrollTop + clientHeight === scrollHeight) {
      console.log('滚动到底了');
      const { baseData } = this.state;
      if (max >= maxIndex) {
        setTimeout(() => {
          this.setState({
            maxIndex: maxIndex + 20,
            baseData: baseData.concat(data)
          })
        }, 1000);
        document.getElementById('topdiv').style.height = (maxIndex - 80) * ITEM_HEIGHT + 'px';
      } else {
        this.setState({
          baseData: baseData.concat(data)
        })
      }
    }
  }
  getListData () {
    const { maxIndex, baseData } = this.state;
    let list = [];
    console.log(maxIndex,'maxindex')
    for (let i = maxIndex - 100; i < maxIndex; i++) {
      if (baseData[i]) list.push(baseData[i]);
    }
    console.log(list,list.length,'list.length')
    return list;
  }
  render () {
    const { maxIndex } = this.state;
    let minIndex = maxIndex - 100;
    const list = this.getListData()
    return (
      <div>
        <div id="topdiv" style={{height:'0'}}></div>
        <div className="list">
          {
            list.map((item,index) =>
              <div key={minIndex+index} className="item">
                <img src={item.img} />
                <div className="desc">
                  <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{item.des}</div>
                  <div>
                    <span style={{ fontSize: '30px', color: '#FF6E27' }}>{minIndex + index + 1}</span>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default MyScroll;
