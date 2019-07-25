'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroSphere,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      // sliderValue: this.props.arSceneNavigator.viroAppProps.sliderValue
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene ref="arscene" onTrackingUpdated={this._onInitialized} >
        <ViroNode position={[0, -.6, -1]} dragType="FixedToWorld" onDrag={() => { }} >
          <ViroText text={this.props.arSceneNavigator.viroAppProps.title} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
          <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{ name: "rotate", run: true, loop: true }} />
          <ViroAmbientLight color={"#aaaaaa"} />
          <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
            position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
          {<Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
            require('./res/emoji_smile/emoji_smile_normal.png'),
            require('./res/emoji_smile/emoji_smile_specular.png')]}
            position={[-.5, .5, -1]}
            scale={[.2, .2, .2]}
            type="VRX" />}

          <Viro3DObject
            source={require('./res/lung.obj')}
            resources={[require('./res/lung.mtl')]}
            position={[0, -1, -1]}
            scale={[this.props.arSceneNavigator.viroAppProps.sliderValue/1000, this.props.arSceneNavigator.viroAppProps.sliderValue/1000, this.props.arSceneNavigator.viroAppProps.sliderValue/1000]}
            materials={["grid"]}
            // animation={{ name: "animateColor", run: true, loop: true }}
            dragType="FixedDistance" onDrag={() => { }}
            type="OBJ" />

          {/* <Viro3DObject onLoadEnd={this._onModelLoad}
            source={require('./res/blackpanther/object_bpanther_anim.vrx')}
            resources={[require('./res/blackpanther/object_bpanther_Base_Color.png'),
            require('./res/blackpanther/object_bpanther_Metallic.png'),
            require('./res/blackpanther/object_bpanther_Mixed_AO.png'),
            require('./res/blackpanther/object_bpanther_Normal_OpenGL.png'),
            require('./res/blackpanther/object_bpanther_Roughness.png')]}
            position={[.3, -.7, -1.2]}
            scale={[.5, .5, .5]}
            // animation={{name:this.state.animationName, run:this.state.modelAnim, loop:this.state.loopState, onFinish:this._onFinish,}}
            animation={{
              name: '01',
              run: true,
              loop: true,
              delay: 1000
            }}
            type="VRX" /> */}

          <Viro3DObject 
            source={require('./res/coth.vrx')}
            // resources={[require('./res/sea lion.jpg')]}
            position={[.3, -.7, -1.2]}
            scale={[.5, .5, .5]}
            // animation={{name:this.state.animationName, run:this.state.modelAnim, loop:this.state.loopState, onFinish:this._onFinish,}}
            animation={{
              name: 'Take 001',
              run: true,
              loop: true,
              delay: 1000
            }}
            type="VRX" />

        </ViroNode>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "This is a lung"
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
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  break: {
    diffuseColor: "#5c4444"
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 500, //.25 seconds
  },
  animateColor: {
    properties: {
      material: "break"
    },
    duration: 10000
  },
});

module.exports = HelloWorldSceneAR;
