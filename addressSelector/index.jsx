import React, { Component, PropTypes } from 'react'
import style from './index.less'
import address_data from './address_data.json'

export default class extends Component{
  constructor(props){
    super(props)
    this.state={
      province_name:'请选择',
      province_id:'',
      city_name:'',
      city_id:'',
      zone_name:'',
      zone_id:'',
      itemNum:0,
      detail_address:''
    }
    this.onSelect=this.onSelect.bind(this)
  }
  componentDidMount(){

  }
  onSelectProvince(va,num){
      this.setState({
        province_name: va,
        province_id:num,
        itemNum:1,
        city_name:'请选择',
        zone_name:''
      })
  }
  onSelectCity(va,num){
      this.setState({
        city_name: va,
        city_id:num,
        itemNum:2,
        zone_name:'请选择'
      })
  }
  onSelectZone(va,num){
      this.setState({
        zone_name: va,
        zone_id:num,
        itemNum:0,
        detail_address:''
      },()=>{
        this.props.onChange(this.state)
        this.props.onClose();
      })
  }
  onSelect(num){
    this.setState({
      itemNum:num
    })
  }
  render(){
    return(
      <div className={style.adpicker}>
        <div className={style.pickerHeader}>
          <div onClick={this.onSelect().bind(this,0)}>
          <span className={[style.selectedProvince,(this.state.itemNum==0?style.selectedAddressActive:'')].join(' ')}>
            {this.state.province_name?this.state.province_name+'  ':' '}
            </span>
          </div>
          <span className={[style.selectedCity,(this.state.itemNum===1?style.selectedAddressActive:'')].join(' ')}>
             {this.state.city_name?this.state.city_name+"  ":''}
            </span>
          <span className={[style.selectedZone,(this.state.itemNum===2?style.selectedAddressActive:'')].join(' ')}>
            {this.state.zone_name?this.state.zone_name:''}
            </span>
        </div>

        <div className={[style.addressList,(this.state.itemNum===0?style.addressActive:'')].join(' ')}>
          <ul>
        {address_data.map((address,index)=>{
          if(address['level']===1)
          return <li className={style.addressItem} key={index} value={address['name']} >
            <button onClick={this.onSelectProvince.bind(this,address['name'],address['sheng'])}>{address['name']}</button>
          </li>
        })}
          </ul>
        </div>
        <div className={[style.cityList,(this.state.itemNum===1?style.addressActive:'')].join(' ')}>
          <ul>
          {address_data.map((address,index)=>{
            if(address['level']===2&&address['sheng']===this.state.province_id)
            return <li className={style.addressItem} key={index} value={address['name']} >
              <button onClick={this.onSelectCity.bind(this,address['name'],address['di'])}>{address['name']}</button>
            </li>
          })}
          </ul>
        </div>

        <div className={[style.zoneList,(this.state.itemNum === 2 ? style.addressActive:'')].join(' ')}>
          <ul>
          {address_data.map((address,index)=>{
            if((address['level']===3&&address['sheng']===this.state.province_id)&& address['di']===this.state.city_id)
            return <li className={style.addressItem} key={index} value={address['name']} >
              <button onClick={this.onSelectZone.bind(this,address['name'],address['xian'])} >{address['name']}</button>
            </li>
          })}
          </ul>
        </div>

      </div>
    )
  }
}
