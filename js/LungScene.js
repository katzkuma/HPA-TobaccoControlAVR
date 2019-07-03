'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroImage,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      scale : [1, 1, 1]
    };


    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this._onSwipe = this._onSwipe.bind(this);
  }

  //onFuse={{callback:this._onFuse, timeToFuse:3000}} 
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroImage source={require('./res/myimg.jpg')} 
                   position={[0, -1, -1]} scale={[.25, .25, .25]} 
                   onClick={this._onClick}
                   onClickState={this._onClickState}
                   onDrag={this._onDrag}
                   onHover={this._onHoverDoSomething}
                   onScroll={this._onScroll}
                   onSwipe={this._onSwipe}
                   onTouch={this._onTouch}
                   /> 

        <ViroText text={this.state.text} scale={this.state.scale} position={[0, 0, -4]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  _onClick(source) {
      this.setState({
      text : "We just Clicked the image!"
    });
  }

  _onDrag(draggedToPosition, source) {
    this.setState({
      text : "Drag",
      scale : [draggedToPosition[0]*2, draggedToPosition[1]*2, 1]
    });
  }

  _onSwipe(swipeState, source) {
    if(swipeState == 1) {
        console.log("Swiped up");
    } else if(swipeState == 2) {
        console.log("Swiped down");
    } else if(swipeState == 3) { 
       console.log("Swiped left");
    } else if(swipeState == 4) { 
       console.log("Swiped right");
    }
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  uttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
});

module.exports = HelloWorldSceneAR;
