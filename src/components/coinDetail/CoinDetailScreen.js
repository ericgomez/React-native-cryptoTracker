import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  SectionList,
  FlatList,
  StyleSheet,
} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };

  //Metodo para obtener una imagen desde la API
  getSymbolIcon = coinNameId => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
    }
  };

  //Metodo para obtener las secciones
  getSections = coin => {
    const sections = [
      {
        title: 'Market cap',
        //Pasamos un array a data
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        //Pasamos un array a data
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        //Pasamos un array a data
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  //Metodo para obtener todos los mercados donde estan las monedas
  getMarkets = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

    const markets = await Http.instance.get(url);

    this.setState({markets});
  };

  componentDidMount() {
    const {coin} = this.props.route.params;

    // Agregamos el titulo al Screen con el titulo indicado
    this.props.navigation.setOptions({title: coin.symbol});

    this.getMarkets(coin.id);

    // Seteamos el estado de coin
    this.setState({coin});
  }
  render() {
    const {coin, markets, isFavorite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{uri: this.getSymbolIcon(coin.nameid)}}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>

          <Pressable
            style={[
              // Arreglo de estylos
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add favorite'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.itemText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={styles.marketsTitle}>Markets</Text>

        <FlatList
          style={styles.list}
          horizontal={true}
          data={markets}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 70,
    paddingLeft: 16,
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
