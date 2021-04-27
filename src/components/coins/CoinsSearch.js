import React, {Component} from 'react';
import {View, TextInput, Platform, StyleSheet} from 'react-native';
import Colors from './../../res/colors';

class CoinsSearch extends Component {
  // Estado basio para guardar los cambios
  state = {
    query: '',
  };

  handleText = query => {
    this.setState({query});

    // Eventos que pasamos por props
    if (this.props.onChange) {
      //Pasamos el Query
      this.props.onChange(query);
    }
  };

  render() {
    const query = this.state;
    return (
      <View>
        <TextInput
          style={[
            // Estilos segun la plataforma iOS o Android
            styles.textInput,
            Platform.OS === 'ios'
              ? styles.textInputiOS
              : styles.textInputAndroid,
          ]}
          onChangeText={this.handleText}
          value={query}
          placeholder="Buscar critpomoneda"
          placeholderTextColor="#fff"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputiOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinsSearch;
