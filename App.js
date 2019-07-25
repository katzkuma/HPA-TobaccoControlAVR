/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  StatusBar,
  Slider,
} from 'react-native';

// import Slider from '@react-native-community/slider';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "8B6F56A8-7440-4A2F-A2F4-1352BB26BD42",
}

// Sets the default scene you want for AR and VR
// var InitialARScene = require('./js/HelloWorldSceneAR');
var InitialARScene = require('./js/HelloWorldSceneAR');
var InitialVRScene = require('./js/HelloWorldScene');
var InitialLungScene = require('./js/LungScene');
var InitialAnimationScene = require('./js/AnimationScene.js');


var UNSET = "UNSET";
var Animation_NAVIGATOR_TYPE = "ANIMATION";
var Lung_NAVIGATOR_TYPE = "LUNG";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      viroAppProps: {sliderValue: 15, title: "HPA AR Test"}
      // viroAppProps: {sliderValue: this.state.sliderValue, title: "HPA AR Test"}
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getLungNavigator = this._getLungNavigator.bind(this);
    this._getAnimationNavigator = this._getAnimationNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType == Lung_NAVIGATOR_TYPE) {
      return this._getLungNavigator();
    } else if (this.state.navigatorType == Animation_NAVIGATOR_TYPE) {
      return this._getAnimationNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(Animation_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>Lung</Text>
          </TouchableHighlight>

          {/* <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(Lung_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>Lung</Text>
          </TouchableHighlight> */}

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>VR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the AnimationSceneNavigator which will start the Lung experience
  _getAnimationNavigator() {
    return (

      <View style={localStyles.flex}>
        <StatusBar hidden={true} />
        <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{ scene: InitialAnimationScene, passProps:{sliderValue:this.state.viroAppProps.sliderValue} }} viroAppProps={this.state.viroAppProps} />

        <View style={localStyles.botMenu}>
          <View style={tempstyles.container}>
            <Text style={{ color: 'black' }}>Value of slider is : {this.state.viroAppProps.sliderValue}</Text>
            <Slider
              maximumValue={100}
              minimumValue={0}
              minimumTrackTintColor="#307ecc"
              maximumTrackTintColor="#000000"
              step={1}
              value={this.state.viroAppProps.sliderValue}
              onValueChange={(sliderValue) => this.setState({ viroAppProps: {sliderValue} })}>
            </Slider>
          </View>
        </View>
      </View>
    );
  }

  // Returns the LungSceneNavigator which will start the Lung experience
  _getLungNavigator() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{ scene: InitialLungScene }} />
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }} />
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }} onExitViro={this._exitViro} />
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    })
  }
}


const tempstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  }
});


var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  flex: {
    flex: 1,
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "black",
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  botMenu: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ViroSample
