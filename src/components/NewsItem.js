import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, author, date, source } =
      this.props;

    return (
      <div className="card my-4">
        <div style={{position: "absolute",
                     right: "0",
                     display: "flex"
                     }}>
          <span
            className="badge rounded-pill bg-danger"
          >
            {source}
          </span>
        </div>
        <img
          src={imageUrl}
          className="card-img-top"
          style={{ height: `200px` }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title.slice(0, 45)}...</h5>
          <p className="card-text">{description.slice(0, 88)}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} On {new Date(date).toGMTString()}{" "}
            </small>
          </p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}
