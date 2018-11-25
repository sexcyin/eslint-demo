import React, { Component } from "react";
import data from "./data";

const ITEM_HEIGHT = 95;

class MyScroll extends Component {
  state = {
    maxIndex: 100
  };
  prevScrollTop = 0;
  prevTopDivHeight = 0;
  prevFootDivHeight = 0;
  componentDidMount() {
    document.addEventListener("scroll", this.scrollHandler);
  }
  scrollHandler = e => {
    const { pageSize, maxRenderCount } = this.props;
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
          maxIndex: maxIndex + pageSize
        });
        this.prevTopDivHeight  = this.prevTopDivHeight + pageSize * ITEM_HEIGHT;
        document.getElementById("topdiv").style.height = this.prevTopDivHeight + "px";
        this.prevFootDivHeight = this.prevFootDivHeight - pageSize * ITEM_HEIGHT;
        document.getElementById("footdiv").style.height = this.prevFootDivHeight + "px";
        console.log(this.prevFootDivHeight,this.prevTopDivHeight,'down')
      }
    } else {
      console.log('向上');
      if (topDivHeight > 0 && scrollTop - topDivHeight <= clientHeight) {
        console.log('快到topdiv了');
        this.setState({
          maxIndex: maxIndex - pageSize
        });
        this.prevTopDivHeight  = this.prevTopDivHeight - pageSize * ITEM_HEIGHT;
        document.getElementById("topdiv").style.height = this.prevTopDivHeight + "px";
        this.prevFootDivHeight = this.prevFootDivHeight + pageSize * ITEM_HEIGHT;
        document.getElementById("footdiv").style.height = this.prevFootDivHeight + "px";
        console.log(this.prevFootDivHeight,this.prevTopDivHeight,'up')
      }
    }
    this.prevScrollTop = scrollTop;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("滚动到底了");
      if (max >= maxIndex) {
        this.props.onEndReached();
        this.setState({
          maxIndex: maxIndex + pageSize
        });
        this.prevTopDivHeight = (maxIndex - maxRenderCount + pageSize) * ITEM_HEIGHT;
        document.getElementById("topdiv").style.height = this.prevTopDivHeight + "px";
      } else {
        this.props.onEndReached();
      }
    }
  };
  getListData() {
    const { dataSource, maxRenderCount } = this.props;
    const { maxIndex } = this.state;
    let list = [];
    console.log(maxIndex, "maxindex");
    for (let i = maxIndex - maxRenderCount; i < maxIndex; i++) {
      if (dataSource[i]) list.push(dataSource[i]);
    }
    console.log(list)
    return list;
  }
  render() {
    const { renderRow, maxRenderCount, renderFooter } = this.props;
    const { maxIndex } = this.state;
    return (
      <div>
        <div id="topdiv"/>
        <div className="list">
          {
            this.getListData().map((item,index) => (
              renderRow(item, maxIndex - maxRenderCount + index)
            ))
          }
          {renderFooter()}
        </div>
        <div id="footdiv"/>
      </div>
    );
  }
}

export default MyScroll;
