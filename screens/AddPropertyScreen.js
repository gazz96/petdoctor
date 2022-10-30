import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Gap, HeaderWithBackButton, Loading } from '../components'
// library
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, JenisFasilitas } from '../constant';
import { useHookstate } from '@hookstate/core';
import { DoctorAction } from '../actions';
import { SelectCityContext, UserContext } from '../context';

import SelectDropdown from 'react-native-select-dropdown'
import CheckBox from '@react-native-community/checkbox';


import * as ImagePicker from 'react-native-image-picker';
import { Image } from 'react-native';
import Toast from 'react-native-toast-message';


const AddPropertyScreen = ({ navigation }) => {
  const cityContext = SelectCityContext();
  const user = UserContext();
  const [isLoading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [previewThumbnail, setPreviewThumbnail] = useState('');

  const form = useHookstate({
    user_id: '',
    title: '',
    overview: '',
    tipe_listing: '',
    tipe_bangunan: '',
    tipe_pasar: '',
    luas_tanah: '',
    luas_bangunan: '',
    jumlah_lantai: '',
    listrik: '',
    sertifikat: '',
    kota_id: '',
    alamat: '',
    kamar_tidur: '',
    kamar_mandi: '',
    garasi: '',
    car_port: '',
    fasilitas: '',
    harga: '',
    thumbnail: '',
    gallery: '',
    harga: 0,
    tipe_sewa : ''
  })

  const isFasilitasChecked = (value) => {
    let tempFasilitas = form.fasilitas.get();
    let tempFasilitasArr = tempFasilitas.split(',');

    let isFind = false;
    tempFasilitasArr.map((fasilitas, index) => {
      if( fasilitas == value) {

        isFind = index;
      }
    })

    return isFind;
  }

  const changeFasilitas = (value) => {
    let index = isFasilitasChecked(value);
    let tempFasilitas = form.fasilitas.get();
    let tempFasilitasArr = tempFasilitas.split(',');
    if(!index) {
      tempFasilitasArr.push(value);
    }else{
      tempFasilitasArr.splice(index, 1)
    }
    form.fasilitas.set(tempFasilitasArr.join(','));
  }

  const tipeListingOptions = [
    {
      label: 'Dijual',
      value: 'jual'
    },
    {
      label: 'Disewa',
      value: 'sewa'
    }
  ]

  const tipeSewaOptions = ['Tahun', 'Bulan']

  const tipePasarOptions = [
    {
      label: 'Baru',
      value: 'Baru'
    },
    {
      label: 'Seken',
      value: 'Seken'
    }
  ]

  const sertifikatOptions = ['PPJB', 'SHM', 'Girik', 'HPL'];

  const listrikOptions = [
    '450',
    '900',
    '1300',
    '1300+',
    'Listrik Pintar'
  ];

  const TipeBangunanOptions = ['Apartemen', 'Coworking', 'Gudang', 'Kantor', 'Ruko', 'Pabrik', 'Tanah', 'Rumah'];

  const saveProperty = async() => {
    setLoading(true)
    try {
      
      form.user_id.set(108);
      //form.user_id.set(user.get().id)
      form.kota_id.set(cityContext.get().id)
      if(form.tipe_listing.get() == 'jual'){
        form.tipe_sewa.set('')
      }

      let fd = new FormData();
      const keys = form.keys;

      for(let key in keys){
        console.log(keys[key] , form[keys[key]].get())
        fd.append(keys[key], form[keys[key]].get())
      }
      const request = await DoctorAction.create(fd);
      Toast.show({
        type: 'success',
        text1: 'Informasi',
        text2: 'Berhasil Menyimpan Properti'
      });

    }catch(error)
    {
      console.log('error save property', error);
    }
    finally{
      setLoading(false)
      setPreviewThumbnail('')
       form.kota_id.set('')
       cityContext.id.set('')
       cityContext.nama.set('')
       form.fasilitas.set('');
    }
  }



  const uploadGallery = async() => {
  }

  const includeExtra = true;
  const launchImageLibrary = () => {
    let options =  {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    };
    
    ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        let assets = response.assets;
        assets.map((asset, index) => {
          form.thumbnail.set({
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName
          })
          setPreviewThumbnail(asset.uri)
        })
      }
    });

  }

  return (
    <View style={{flex:1, backgroundColor: Colors.white}}>
      <ScrollView style={styles.container}>
        <Gap height={20}/>
        <HeaderWithBackButton title="Tambah Properti" onPress={() => navigation.goBack()}/>
        <Gap height={50}/>
        {
          isLoading ? <Loading/> : 
          <View>
            <View>
              <Text style={styles.formLabel}>Nama</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.title.set(text)}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Deskripsi</Text>
              <TextInput style={styles.formTextarea} multiline={true} onChangeText={text => form.overview.set(text)}/>
            </View>
            <Gap height={20}/>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <View style={{ width: '100%' }}>
                <Text style={styles.formLabel}>Tipe Listing</Text>
                <SelectDropdown buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={tipeListingOptions} onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  form.tipe_listing.set(selectedItem.value);
                  return selectedItem.label
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.label
                }}/>
              </View>
              <Gap height={20}/>
              {
                form.tipe_listing.get() == 'sewa' ? 
                  <View  style={{ width: '100%' }}>
                    <Text style={styles.formLabel}>Tipe Sewa</Text>
                    <SelectDropdown buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={tipeSewaOptions} onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      form.tipe_sewa.set(selectedItem);
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item
                    }}/>
                    <Gap height={20}/>
                  </View>
                :<></>
              }
              <View  style={{ width: '100%' }}>
                <Text style={styles.formLabel}>Tipe Bangunan</Text>
                <SelectDropdown buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={TipeBangunanOptions} 
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      form.tipe_bangunan.set(selectedItem);
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}/>
              </View>
            </View>
            <Gap height={20}/>

            <View style={{ width: '100%'}}>
              <Text style={styles.formLabel}>Tipe Pasar</Text>
              <SelectDropdown buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{ height: 40 }} rowTextStyle={{ height: 40 }} data={tipePasarOptions} onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    form.tipe_pasar.set(selectedItem.value);
                    return selectedItem.label;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.label;
                  }}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Luas Tanah (m²)</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.luas_tanah.set(text)}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Luas Bangunan (m²)</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.luas_bangunan.set(text)}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Jumlah Lantai</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.jumlah_lantai.set(text)}/>
            </View>
            <Gap height={20}/>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{ width: '48%' }}>
                <Text style={styles.formLabel}>Listrik (VA)</Text>
                {/* <TextInput style={styles.formControl} onChangeText={text => form.listrik.set(text)}/> */}
                <SelectDropdown buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={listrikOptions} 
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      form.listrik.set(selectedItem);
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}/>
        
              </View>

              <View style={{ width: '48%' }}>
                <Text style={styles.formLabel}>Sertifikat Kepemilikan</Text>
                {/* <TextInput style={styles.formControl} onChangeText={text => form.sertifikat.set(text)}/> */}
                <SelectDropdown buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={sertifikatOptions} 
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      form.sertifikat.set(selectedItem);
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}/>
              </View>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Kota</Text>
              <TextInput style={styles.formControl} onFocus={() => navigation.navigate("Add Property Select City")}  value={cityContext.nama.get()}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Alamat</Text>
              <TextInput style={styles.formTextarea} multiline={true} onChangeText={text => form.overview.set(text)}/>
            </View>
            <Gap height={20}/>
          
            <View>
              <Text style={styles.formLabel}>Fasilitas</Text>
              {
                JenisFasilitas.map((fasilitas, index) => (
                <View key={index} style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                  <CheckBox key={index} value={Boolean(isFasilitasChecked(fasilitas.label))} onChange={() => {
                    changeFasilitas(fasilitas.label)
                  }}/>
                  <Text>{fasilitas.label}</Text>
                </View>))
              }
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Harga</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.harga.set(text)}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Thumbnail</Text>
              {
                !previewThumbnail ? 
                <Text style={styles.formInputFile} onPress={() => {
                  launchImageLibrary()
                }}>
                  <Icon name={'plus'} size={16} color={Colors.dark} solid/>
                </Text> : 
                <TouchableOpacity onPress={() => {
                  launchImageLibrary()
                }}>

                  <Image source={{ uri: previewThumbnail }} style={{width: 150, height: 150, borderRadius: 10}} resizeMode="cover"/>
                </TouchableOpacity>
              }
              
            </View>
            {/* <Gap height={20}/>
            <View>
              <Text style={styles.formLabel}>Gallery</Text>
              <Text style={styles.formInputFile}>
                <Icon name={'plus'} size={16} color={Colors.dark} solid/>
              </Text>
            </View> */}
            <Gap height={40}/>
          </View>
        }
        
      </ScrollView>
      <Pressable style={{paddingHorizontal: 16, backgroundColor: Colors.white, paddingVertical: 20 }}>
        <Text style={styles.btnPrimary} onPress={() => {
          saveProperty()
        }}>Simpan Properti</Text>
      </Pressable>
    </View>
  )
}

export default AddPropertyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: '500',
    fontSize: 18, 
    color: Colors.dark
  },
  separator: {
    borderBottomWidth: 1, borderBottomColor: Colors.muted
  },
  formLabel: {
    fontSize: 12,
    color: Colors.dark,
    fontWeight: 'bold',
    marginBottom: 5
  },
  formControl: {
    borderColor: Colors.muted,
    borderRadius: 10,
    backgroundColor: Colors.light,
    paddingHorizontal: 16,
    height: 40
  },
  formInputFile: {
    width: 150,
    height: 150,
    backgroundColor: Colors.light, 
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 150
  },
  btnPrimary: {
    height: 40, 
    paddingHorizontal: 20, 
    color: Colors.white, 
    backgroundColor: Colors.primary, 
    borderRadius: 10, 
    lineHeight: 40, 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  formTextarea: {
    minHeight: 150,
    borderColor: Colors.muted,
    borderRadius: 10,
    backgroundColor: Colors.light,
    paddingHorizontal: 16,
    textAlignVertical: 'top'
  }
})