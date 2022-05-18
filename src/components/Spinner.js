import React, { Component } from 'react';
import LoadingImage from '../Images/loading.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className='my-4 text-center'>
        <img src={LoadingImage} alt="loading" />
      </div>
    )
  }
}
