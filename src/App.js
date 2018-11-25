import React, { Component } from "react";
import MyScroll from "./my-scroll";
import "./styles/index.less";
import data from "./data";

class App extends Component {
  state = {
    dataSource: [],
    isLoading: false
  };
  componentDidMount() {
    this.setState({
      dataSource: data
    });
  }
  onEndReached = () => {
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
        dataSource: this.state.dataSource.concat(data)
      });
    }, 1000);
  };
  render() {
    const row = (rowData, rowID) => (
      <div key={rowID} className="item">
        <img src={rowData.img} />
        <div className="desc">
          <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
            {rowData.des}
          </div>
          <div>
            <span style={{ fontSize: "30px", color: "#FF6E27" }}>
              {rowID + 1}
            </span>
          </div>
        </div>
      </div>
    );
    return (
      <MyScroll
        dataSource={this.state.dataSource}
        renderRow={row}
        renderFooter={() => (
          <div style={{ padding: 0, textAlign: "center" }}>
            {this.state.isLoading ? "Loading..." : "Loaded"}
          </div>
        )}
        pageSize={20}
        maxRenderCount={100}
        onEndReached={this.onEndReached}
      />
    );
  }
}

export default App;
