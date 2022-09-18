import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet,Image,FlatList,Scrolview,Button,Alert} from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import { CheckBox } from 'react-native-elements'
export default class HomeDrop extends Component {
    state = {
        data: [],
        data1:[],
        userData: [],
        filterData:[],
        products:[],
        search:'',
    }
    componentDidMount(item) {
        this.getData1()
        if(item!==null){
        this.getData()
        }
    }
    message=(stock)=>{
 if(stock>50){
   alert("hurry! only a few items left");
 }
    }
    message1=( )=>{
 
   alert("Do you want add item");

    }
handleSearch = (text) => {
       filterData=this.state.products
       console.log("res",filterData)
    if (text) {
      const newData = filterData.filter(function (item) {
        const itemData = item.brand
          ? item.brand.toUpperCase()
          : ''.toUpperCase() ||item.category
          ? item.category.toLowerCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ products: newData });
      this.setState({ search: text });
    } else {
      this.setState({ products: filterData });
      this.setState({ search: text });
    }
  };
  getData1 = () => {
     const apiURL="https://dummyjson.com/products?limit=100"
    fetch(apiURL).then((res)=>res.json())
    .then((resJson)=>{
      console.log("resJosn==>",resJson)
      this.setState({
        products:resJson.products
      })
      console.log('data>>>1', this.state.products)
    })
    }
    getData = () => {
     const apiURL="https://dummyjson.com/products/categories/"
    fetch(apiURL).then((res)=>res.json())
    .then((resJson)=>{
      console.log("resJosn==>",resJson)
      let list = resJson.map((item,index)=>{return{label:item , value:index+1};})
      this.setState({
        data: list,
        data1:resJson
      })
    })
    }
    getUserData = async (item) => {
        const apiURL="https://dummyjson.com/products/category/" +item
    fetch(apiURL).then((res)=>res.json())
            .then(result => {
              this.setState({
                    userData: result.products,
                })
            })
            .catch((err) => {
                console.log("err>>", err)
            })
    }
sortListById(){
 
     filterData=this.state.userData
     filterData.sort(function(a, b) {
      return a.rating - b.rating;
       
    });
    this.setState(previousState => (
      { filterData: previousState.filterData }
      
    ))
}
sortListById1(){
 
     filterData=this.state.userData
     filterData.sort(function(a, b) {
      return a.price - b.price;
       
    });
    this.setState(previousState => (
      { filterData: previousState.filterData }
      
    ))
}
sortListById3(){
 
     filterData=this.state.userData
     filterData.sort(function(a, b) {
      return a.discountPercentage - b.discountPercentage;
       
    });
    this.setState(previousState => (
      { filterData: previousState.filterData }
      
    ))
}
renderList2=({item}:any)=>{
  return(
          <View style={{backgroundColor:'white'}}>
     <View>
     <View style={{marginTop:10,color:'white',flexDirection:'row'}}>
      <Image source={{uri:item.thumbnail}} style={{ width: 140, height: 170,marginLeft:10,marginRight:10,borderRadius:7 }} />
     
       
     
      <View style={{marginLeft:12}}>
      <Rating
  type='star'
  ratingColor='#3498db'
  ratingBackgroundColor='#c8c7c8'
  ratingCount={5}
  imageSize={15}
  isDisabled={false}
  startingValue={item.rating}
 style={{marginTop:5,color:'gray',marginRight:125}}
/>
      <Text style={{marginLeft:2,color:'gray',marginTop:3}}>({item.rating})</Text>
      <Text style={{color:'gray'}}>{item.title}</Text>
      <Text style={{fontWeight:'bold',fontSize:20,marginLeft:1}}>{item.brand}</Text>
      <Text style={{color:item.discountPercentage>10?"red":"black",marginLeft:2}}>{item.price}$</Text>
      <Text style={{color:"black",marginLeft:2}}>{item.discountPercentage}</Text>
      <TouchableOpacity onPress={() => this.message(item.stock)}
      style={{backgroundColor:"green",width:100,height:40,alignItems:'center',borderRadius:15}}
      >
      <Text style={{color:'blue',marginLeft:8,fontWeight:'bold',fontSize:20,alignItems:'center',marginTop:2}}>Buy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.message1()}
      style={{backgroundColor:"green",width:140,height:40,alignItems:'center',borderRadius:15,marginTop:10}}
      >
      <Text style={{color:'blue',marginLeft:8,fontWeight:'bold',fontSize:20,alignItems:'center',marginTop:2}}>Add to Card</Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>
      </View>
    )
  }
    renderList1=({item})=>{
  return(
    
         <TouchableOpacity
     onPress={()=>this.getUserData(item)}
     >
    <View>
  <View 
  style={{marginTop:10,backgroundColor:'black',alignItems:'center',margin:5,height:30,width:100,borderRadius:20}} >
      <Text style={{color:'white',alignItems:'center',marginTop:5}}>{item}</Text>
       </View>
      </View>
       </TouchableOpacity>
    )
  }
     renderList=({item})=>{ 
  return(
   
    <View style={{backgroundColor:'white'}}>
     <View>
     <View style={{marginTop:10,color:'white',flexDirection:'row'}}>
      <Image source={{uri:item.thumbnail}} style={{ width: 140, height: 170,marginLeft:10,marginRight:10,borderRadius:7 }} />
     
       
     
      <View style={{marginLeft:12}}>
      <Rating
  type='star'
  ratingColor='#3498db'
  ratingBackgroundColor='#c8c7c8'
  ratingCount={5}
  imageSize={15}
  isDisabled={false}
  startingValue={item.rating}
 style={{marginTop:5,color:'gray',marginRight:125}}
/>
      <Text style={{marginLeft:2,color:'gray',marginTop:3}}>({item.rating})</Text>
      <Text style={{color:'gray'}}>{item.title}</Text>
      <Text style={{fontWeight:'bold',fontSize:20,marginLeft:1}}>{item.brand}</Text>
      <Text style={{color:item.discountPercentage>10?"red":"black",marginLeft:2}}>{item.price}$</Text>
      <Text style={{color:"black",marginLeft:2}}>{item.discountPercentage}</Text>
      <TouchableOpacity onPress={() => this.message(item.stock)}
      style={{backgroundColor:"green",width:100,height:40,alignItems:'center',borderRadius:15}}
      >
      <Text style={{color:'blue',marginLeft:8,fontWeight:'bold',fontSize:20,alignItems:'center',marginTop:2}}>Buy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.message1()}
      style={{backgroundColor:"green",width:140,height:40,alignItems:'center',borderRadius:15,marginTop:10}}
      >
      <Text style={{color:'blue',marginLeft:8,fontWeight:'bold',fontSize:20,alignItems:'center',marginTop:2}}>Add to Card</Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>
      </View>
    )
  }
    render() {
        return (
            <SafeAreaView style={{backgroundColor:'white',flex:1}}>

         <View style={{backgroundColor:'white',marginBottom:2,marginTop:30}} >
         <View style={{flexDirection:'row'}}>
         <TouchableOpacity>
         <Icon2  style={{marginTop:8,marginLeft:20,fontWeight:'bold'}}name="chevron-thin-left" size={15}/>
          </TouchableOpacity>
            <Text style={{fontSize:20,fontWeight:'bold',marginLeft:80}}>Welcome</Text>
            </View>
         </View>

            <View style={{backgroundColor:'white'}}>
              
                <FlatList
                horizontal={true}
       data={this.state.data1}
       renderItem={this.renderList1}
        />
                </View>
                <View style={{backgroundColor:'white',height:30,flexDirection:'row'}}>
    <Text style={{marginTop:2,marginLeft:20}}>Filters</Text>
    <TextInput
    style={{marginLeft:20,width:250}}
            value={this.state.search}
            onChangeText={(text)=>this.handleSearch(text)}
            name="search_item"
            underlineColorAndroid="transparent"
            placeholder="Search..."
          />
         
            </View>
            <View style={{backgroundColor:'white',height:30,flexDirection:'row'}}>
    <Text style={{marginTop:2,marginLeft:20}}>Sort by</Text>
    <TouchableOpacity onPress={() => this.sortListById()}
    style={{marginLeft:25,marginTop:2,}}
    >
    <Text style={{color:'red'}}>Rating</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.sortListById3()}
    style={{marginLeft:25,marginTop:2}}
    >
    <Text style={{color:'red'}}>Discount</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.sortListById1()}
    style={{marginLeft:25,marginTop:2}}
    >
    <Text style={{color:'red'}} >Price</Text>
    </TouchableOpacity>
         
            </View>
                <View >
                    <FlatList
                        data={this.state.userData}
                        renderItem={this.renderList}
                        keyExtractor={(item) => item.id}
                    />
                    <FlatList
                        data={this.state.products}
                        renderItem={this.renderList2}
                    />
                </View>

            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    
})
