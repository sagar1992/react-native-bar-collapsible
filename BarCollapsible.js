"use strict";

import React, { PropTypes, Component } from "react";
import { Animated, View, Text, TouchableHighlight } from "react-native";

import Icon from "react-native-vector-icons/Entypo";

import styles from "./style";

class BarCollapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      icon: "angle-right",
      onPressed: null,
      title: "",
      children: null,
      show: props.showOnStart || false
    };
  }

  componentDidMount() {
    if (this.props.clickable) {
      this.setState({
        icon: this.props.icon,
        onPressed: this.props.onPressed,
        title: this.props.title
      });
    } else if (this.props.collapsible) {
      Animated.timing(this.state.fadeAnim, { toValue: 1 }).start();
      const openIcon = this.props.iconOpened || "minus";
      const activeIcon = this.props.iconActive || "plus";
      this.setState({
        icon: this.props.showOnStart ? openIcon : activeIcon,
        iconCollapsed: this.props.iconCollapsed || "plus",
        iconOpened: this.props.iconOpened || "minus",
        title: this.props.title
      });
    } else {
      this.setState({
        title: this.props.title
      });
    }

    this._tintColor = this.props.tintColor || "#FFF";
    this._iconSize = this.props.iconSize || 20;
  }

  render() {
    if (this.props.clickable) {
      return this._renderClickable();
    } else if (this.props.collapsible) {
      return this._renderCollapsible();
    } else {
      return this._renderDefault();
    }
  }

  _renderDefault() {
    return (
      <View style={styles.bar}>
        <Text style={[styles.title, this.props.titleStyle]}>
          {this.state.title}
        </Text>
      </View>
    );
  }

  _renderClickable() {
    return (
      <TouchableHighlight
        style={styles.barWrapper}
        underlayColor="transparent"
        onPress={this.state.onPressed}
      >
        <View style={[styles.bar, this.props.style]}>
          <Icon
            name={this.state.icon}
            size={this._iconSize}
            color={this._tintColor}
            style={[styles.icon]}
          />
          <Text style={[styles.title, this.props.titleStyle]}>
            {this.state.title}
          </Text>

        </View>
      </TouchableHighlight>
    );
  }

  _renderCollapsible() {
    return (
      <View>
        <TouchableHighlight
          style={styles.barWrapper}
          underlayColor="transparent"
          onPress={() => {
            this._toggleView();
          }}
        >
          <View style={[styles.bar, this.props.style]}>
            <Icon
              name={this.state.icon}
              size={this._iconSize}
              color={this._tintColor}
              style={styles.icon}
            />
            <Text style={[styles.title, this.props.titleStyle]}>
              {this.state.title}
            </Text>
          </View>
        </TouchableHighlight>
        {this.state.show &&
          <Animated.View
            style={{
              opacity: this.state.fadeAnim,
              paddingLeft: 10
            }}
          >
            {this.props.children}
          </Animated.View>}
      </View>
    );
  }

  _toggleView() {
    this.setState({
      show: !this.state.show,
      icon: this.state.show ? this.state.iconCollapsed : this.state.iconOpened
    });
  }
}

BarCollapsible.propTypes = {
  style: View.propTypes.style,
  titleStyle: Text.propTypes.style,
  tintColor: PropTypes.string
};

module.exports = BarCollapsible;
