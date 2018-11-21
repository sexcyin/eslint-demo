import React, { Component } from "react";
import data from "./data";

const MAX_COUNT = 100,
  ITEM_HEIGHT = 95;

class MyScroll extends Component {
  state = {
    baseData: [],
    list: [],
    maxIndex: 100
  };
  prevScrollTop = 0;
  prevTopDivHeight = 0;
  prevFootDivHeight = 0;
  componentDidMount() {
    document.addEventListener("scroll", this.scrollHandler);
    this.setState({
      baseData: data
    });
  }
  scrollHandler = e => {
    const { maxIndex } = this.state;
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop; //滚动的高度
    let scrollHeight =
      document.body.scrollHeight || document.documentElement.scrollHeight || document.documentElement.offsetHeight; // 文档的总高度
    let clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight; // 浏览器视口的高度
    let topDivHeight = document.getElementById('topdiv').offsetHeight;
    let footDivHeight = document.getElementById('footdiv').offsetHeight;
    let max = Math.ceil(scrollHeight / ITEM_HEIGHT);
    if (scrollTop > this.prevScrollTop) {
      console.log('向下');
      if (footDivHeight > 0 && scrollHeight - footDivHeight - scrollTop <= clientHeight) {
        console.log('快到footdiv了');
        this.setState({
          maxIndex: maxIndex + 20
        });
        this.prevTopDivHeight  = this.prevTopDivHeight + 20 * ITEM_HEIGHT;
        document.getElementById("topdiv").style.height = this.prevTopDivHeight + "px";
        this.prevFootDivHeight = this.prevFootDivHeight - 20 * ITEM_HEIGHT;
        document.getElementById("footdiv").style.height = this.prevFootDivHeight + "px";
        console.log(this.prevFootDivHeight,this.prevTopDivHeight,'down')
      }
    } else {
      console.log('向上');
      if (topDivHeight > 0 && scrollTop - topDivHeight <= clientHeight) {
        console.log('快到topdiv了');
        this.setState({
          maxIndex: maxIndex - 20
        });
        this.prevTopDivHeight  = this.prevTopDivHeight - 20 * ITEM_HEIGHT;
        document.getElementById("topdiv").style.height = this.prevTopDivHeight + "px";
        this.prevFootDivHeight = this.prevFootDivHeight + 20 * ITEM_HEIGHT;
        document.getElementById("footdiv").style.height = this.prevFootDivHeight + "px";
        console.log(this.prevFootDivHeight,this.prevTopDivHeight,'up')
      }
    }
    this.prevScrollTop = scrollTop;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("滚动到底了");
      const { baseData } = this.state;
      if (max >= maxIndex) {
        setTimeout(() => {
          this.setState({
            maxIndex: maxIndex + 20,
            baseData: baseData.concat(data)
          });
        }, 1000);
        this.prevTopDivHeight = (maxIndex - 100 + 20) * ITEM_HEIGHT;
        document.getElementById("topdiv").style.height = this.prevTopDivHeight + "px";
      } else {
        setTimeout(() => {
          this.setState({
            baseData: baseData.concat(data)
          });
        }, 1000);
      }
    }
    
  };
  getListData() {
    const { maxIndex, baseData } = this.state;
    let list = [];
    console.log(maxIndex, "maxindex");
    for (let i = maxIndex - 100; i < maxIndex; i++) {
      if (baseData[i]) list.push(baseData[i]);
    }
    console.log(list, list.length, "list.length");
    return list;
  }
  render() {
    const { maxIndex } = this.state;
    let minIndex = maxIndex - 100;
    const list = this.getListData();
    return (
      <div>
        <div id="topdiv"/>
        <div className="list">
          {list.map((item, index) => (
            <div key={minIndex + index} className="item">
              <img src={item.img} />
              <div className="desc">
                <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
                  {item.des}
                </div>
                <div>
                  <span style={{ fontSize: "30px", color: "#FF6E27" }}>
                    {minIndex + index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div style={{textAlign: 'center'}}>loading</div>
        </div>
        <div id="footdiv"/>
      </div>
    );
  }
}

export default MyScroll;
