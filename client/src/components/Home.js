// import React, { Component } from 'react'


// export class Home extends Component {
//   render() {
//     return (
//       <div>
//        <p class="h1">Welcome to Reporting And Allotment Automation...
//       </p>
//       <p class="h1"> Please login Acording to your Role to Access Facilities...</p>
//       </div>
//     )
//   }
// }

// export default Home


import React, { Component } from 'react';

export class Home extends Component {
  render() {
    const titleStyle = {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#3498db',
      textShadow: '2px 2px 4px #000000',
    };

    const subTitleStyle = {
      fontSize: '24px',
      color: '#e74c3c',
      fontStyle: 'italic',
      textShadow: '1px 1px 2px #000000',
    };

    return (
      <div>
        <p style={titleStyle}>Welcome to Reporting And Allotment Automation...</p>
        <p style={subTitleStyle}>Please login According to your Role to Access Facilities...</p>
      </div>
    );
  }
}

export default Home;
