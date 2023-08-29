import React, { Component } from 'react'
import Viewreportmoves from './Viewreportmoves'
import Viewattend from './Viewattend'

export class ViewStuData extends Component {
  render() {
    const navbarStyle = {
      backgroundColor: '#ce93d8',
    };
    return (
        
            <div class="container">
                <div className="card shadow my-2">
                <div className="card-header " style={navbarStyle}>
                <h3 className="text-light">
                                Student's Data
                            </h3>
                            </div>
            <div class="row align-items-start">
              <div class="col">
                <Viewreportmoves />
              </div>
              <div class="col">
                <Viewattend />
              </div>
              </div>
          {/* <div className="col-md-9">
            <div className="my-5">
                <Movesreported />
                <Myattend />
            </div> */}
            </div>
          </div>
    )
  }
}

export default ViewStuData