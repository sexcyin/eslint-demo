import React, { Component } from "react";
import MyScroll from "./my-scroll";
import "./styles/index.less";

class App extends Component {
  state = {
    dataSource: []
  };
  onEndReached = () => {};
  render() {
    const row = (rowData, rowID) => {
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
      </div>;
    };
    return (
      <MyScroll
        dataSource={this.state.dataSource}
        renderRow={row}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: "center" }}>
            {this.state.isLoading ? "Loading..." : "Loaded"}
          </div>
        )}
        pageSize={20}
        onEndReached={this.onEndReached}
      />
    );
  }
}

export default App;
