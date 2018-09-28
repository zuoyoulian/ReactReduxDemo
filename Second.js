/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addUserName, addUserGender } from './redux/action'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


const names = ['赵大', '孙二', '张三', '李四', '王五', '赵六', '田七']
const genders = ['男', '女']

type Props = {};
class Second extends Component<Props> {
  static navigationOptions = () => {
    return {
        headerTitle: "修改信息",
    }
  }

  render() {
    // 随机生成姓名、性别
    const name = names[parseInt(Math.random()*7, 10)]
    const gender = genders[parseInt(Math.random()*2, 10)]

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ width: 100, height: 50, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => this.props.addUserName(name)}
        >
          <Text>{`用户名： ${name}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 100, height: 50, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
          onPress={() => this.props.addUserGender(gender)}
        >
          <Text>{`性别：${gender}`}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ addUserName, addUserGender}, dispatch)
}

export default connect(null, mapDispatchToProps)(Second)

