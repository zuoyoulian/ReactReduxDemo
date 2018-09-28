/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

type Props = {
  userName: string,
  userGender: string,
};

class First extends Component<Props> {
  static navigationOptions = () => {
    return {
        headerTitle: "首页",
    }
  }

  state = {
    userName: this.props.userName,
    userGender: this.props.userGender,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ userName: nextProps.userName, userGender: nextProps.userGender })
  }

  render() {
    
    const { userName = '', userGender = '' } = this.state;

    return (
      <View style={styles.container}>

        <Text>{`用户名：  ${userName}`}</Text>
        <Text>{`性别：    ${userGender}`}</Text>

        <TouchableOpacity
          style={{ width: 200, height: 50, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => this.props.navigation.navigate('Second')}
        >
          <Text>修改信息 mapDispatchToProps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: 200, height: 50, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
          onPress={() => this.props.navigation.navigate('Third')}
        >
          <Text>修改信息 无mapDispatchToProps</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    userName: state.user.userName,
    userGender: state.user.userGender,
  }
}

const connectFirst = connect(mapStateToProps)(First);

export default connectFirst;

