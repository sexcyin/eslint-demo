import React, { Component } from "react";
import "./styles/index.less";
import ReactTinyListView from "react-tiny-list-view";
import data from "./data";

class App extends Component {
  state = {
    dataSource: [],
    isLoading: false,
    hasMore: true
  };
  loadCount = 0;
  componentDidMount() {
    this.setState({
      dataSource: data
    });
  }
  onEndReached = () => {
    if (this.loadCount >= 7) {
      this.setState({
        hasMore: false,
        isLoading: false
      })
      return false;
    }
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
        dataSource: this.state.dataSource.concat(data)
      });
      this.loadCount++;
    }, 1000);
    return true;
  };
  render() {
    const { hasMore, isLoading } = this.state;
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
      <ReactTinyListView
        dataSource={this.state.dataSource}
        renderRow={row}
        renderFooter={() => (
          <div style={{ padding: 0, textAlign: "center" }}>
            {hasMore ? (isLoading ? "Loading..." : "Loaded") : "No More"}
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
