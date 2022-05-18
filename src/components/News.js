import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  updateHandle = async () => {
    this.props.setProgress(0)
    let NewsUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=27b1b41774c34c3d87efd30a83857a07&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(NewsUrl);
    this.props.setProgress(30)
    let parsedata = await data.json();
    this.props.setProgress(60)
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  };

  async componentDidMount() {
    this.updateHandle();
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let NewsUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=27b1b41774c34c3d87efd30a83857a07&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(NewsUrl);
    let parsedata = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
      <div style={{marginTop: "90px"}}>
        <h1 className="text-center my-4">{`News-Monkey's Top ${this.capitalizeFirstLetter(
          this.props.category
        )} Heading`}</h1>
</div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* {this.state.loading && <Spinner/>} */}
              {this.state.articles.map((e) => {
                return (
                  <div key={e.url} className="col-md-4">
                    <NewsItem
                      title={e.title ? e.title : ""}
                      description={e.description ? e.description : ""}
                      imageUrl={
                        e.urlToImage
                          ? e.urlToImage
                          : "https://img.jagranjosh.com/images/2022/February/722022/potentially_hazardous_asteroid_2001_CB21.jpg"
                      }
                      url={e.url}
                      author={e.author}
                      date={e.publishedAt}
                      source={e.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
