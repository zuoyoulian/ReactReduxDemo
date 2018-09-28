## 安装 React Redux
Redux不包含React库，需要单独安装React 绑定库 [react-redux](https://github.com/reactjs/react-redux)

```
npm install --save react-redux
```
或

```
yarn add react-redux
```

## 组件
React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。

||UI 组件|容器组件|
|---:   |:---  |:---   |
|作用|只负责 UI 呈现（骨架、样式）|描述如何运行（数据获取、状态更新）|
|直接使用 Redux|否|是|
|数据来源|props|监听 Redux state|
|数据修改|从props调用回调函数|向 Redux 发送 actions|
|调用方式|手动|通常由 React Redux 生成|


## connect方法  
React-Redux 提供`connect`方法，用于从 UI 组件生成容器组件。`connect`的意思，就是将这两种组件连起来。  

```
import { connect } from 'react-redux';

const connectFirst = connect()(First);

export default connectFirst;
```
上面代码中 First 是 UI 组件，connectFirst 是由 React-Redux 通过connect方法自动生成的容器组件。

* **connect方法声明：**

```
connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options
)
```

* **connect方法作用：**
连接React组件与 Redux store  

* **connect参数说明：**  

1、mapStateToProps(state, ownProps) : stateProps
这个函数允许我们将 store 中的数据作为 props 绑定到组件上。  

```
function mapStateToProps(state) {
  return {
    userName: state.user.userName,
    userGender: state.user.userGender,
  }
}

const connectFirst = connect(mapStateToProps)(First);

export default connectFirst;
```  

（1）第一个参数就是 store 的 state，我们从中摘取了 userName 和 userGender 属性。  
不必将 state 中的数据原封不动地传入组件，可以根据 state 中的数据，动态地输出组件需要的（最小）属性。 

（2）第二个参数 ownProps，是组件自己的 props。有时，ownProps 也会对其产生影响。 
当 state 变化，或者 ownProps 变化的时候，mapStateToProps 都会被调用，计算出一个新的 stateProps，（在与 ownProps merge 后）更新给组件。  
 
2、mapDispatchToProps(dispatch, ownProps): dispatchProps  
这个函数的功能是将 action 作为 props 绑定到组件上，也会成为组件的 props。 

```
import { addUserName, addUserGender } from './redux/action';

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ addUserName, addUserGender}, dispatch)
};

export default connect(null, mapDispatchToProps)(Second);
``` 

3、mergeProps(stateProps, dispatchProps, ownProps): props  
通常情况下不传这个参数。  
这个函数的作用是将 ownProps、stateProps 和 dispatchProps merge 之后作为 props 绑定到组件上。
如果省略，默认使用 Object.assign({}, ownProps, stateProps, dispatchProps)。  

4、options(Object)  
这个参数的作用是定制 connector 的行为。  
在项目中常用的是`withRef`，如果为`true` 被 stores 包裹的组件可以使用 `ref` 获取实例，并且可以调用 `getWrappedInstance()` 方法。默认值是 `false`

```
export default connect(null, null, null, { withRef: true })(TodoList)
```


## Provider 组件  
connect 方法生成容器组件以后，需要让容器组件拿到 store 的 state 和 dispatch 才能生成 UI 组件的参数。
React-Redux 提供Provider组件，可以让容器组件拿到 store 对象。  

```
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import store from './redux/store';

import First from './First';
import Second from './Second';
import Third from './Third';

const AppNavigator = StackNavigator(
  {
      First: { screen: First },
      Second: { screen: Second },
      Third: { screen: Third },
  },
  { headerMode: 'float' },
);

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
```
Provider 的 Props  
* store(Redux Store)  应用中唯一的 Redux Store   
* children(ReactElement)  应用的 root 组件    

Provider 在 App 外包了一层，这样 App 的所有子组件就默认都可以拿到 state 了，原理是 React 组件的 context 属性。  

**Provider源码：**

```
class Provider extends Component {
    getChildContext() {
      return { [storeKey]: this[storeKey], [subscriptionKey]: null }
    }

    constructor(props, context) {
      super(props, context)
      this[storeKey] = props.store;
    }

    render() {
      return Children.only(this.props.children)
    }
}
```
在 Provider 的源码中可以看到store放在了上下文对象context上面。

## react-redux流程图

![流程图](https://upload-images.jianshu.io/upload_images/1064933-b40a784022679503.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
