import React, { Component } from 'react';
import '../styles/hero.css';  // Make sure the path is correct

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHero: 'snkrhero1', // initial hero background
    };
  }

  componentDidMount() {
    // Initialize automatic image switching every 5 seconds
    this.interval = setInterval(this.handleButtonClick, 5000);
  }

  componentWillUnmount() {
    // Clear the interval when the component is removed
    clearInterval(this.interval);
  }

  // Function to handle button click
  handleButtonClick = () => {
    const nextHero = {
      snkrhero1: 'snkrhero2',
      snkrhero2: 'snkrhero3',
      snkrhero3: 'snkrhero4',
      snkrhero4: 'snkrhero1', // loop back to the first
    };

    this.setState({
      currentHero: nextHero[this.state.currentHero],
    });
  };

  // Function to handle dot click
  handleDotClick = (heroName) => {
    this.setState({
      currentHero: heroName,
    });
  };

  render() {
    // Define an array of hero names for simplicity
    const heroNames = ['snkrhero1', 'snkrhero2', 'snkrhero3', 'snkrhero4'];

    return (

<div className='container-fluid'>
    <div className='row col-12'>
      <div className={`hero-container ${this.state.currentHero}`}>
   
              <div className="pagination">
                {heroNames.map((name, index) => (
                  <div 
                    key={index} 
                    className={`pagedot ${this.state.currentHero === name ? 'active' : ''}`} 
                    onClick={() => this.handleDotClick(name)}
                  ></div>
                ))}
              </div>

<div className='dot'>.</div>

            </div>

            </div>
            </div>
     
    );
  }
}

export default Hero;
