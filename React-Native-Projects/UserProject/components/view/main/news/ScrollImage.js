import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions, FlatList, RefreshControl, TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper'

//获取屏宽
const DevWidth = Dimensions.get('window').width;
export default class ScrollImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
        };
    }

    componentDidUpdate() {
        const ScrollView = this.refs.scrollView;
        ScrollView.scrollBy(0, false)

    }


    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    ref="scrollView"
                    height={DevWidth*0.4}
                    // onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                    dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    activeDot={<View style={{ backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{
                        bottom: -23, left: null, right: 10
                    }}
                    autoplay = {true}
                    loop={true}
                    scrollEnabled={true}
                    showsButtons={true}
                >
                    {
                         this.props.headerNews.map((item, index) =>
                            <View key={index} style={styles.bannerItem} title={<Text style={styles.text} numberOfLines={1}>{item.title}</Text>}>
                                <TouchableOpacity activeOpacity={0.5} onPress={() =>this.bannerDetail(index)}>
                                    <Image source={{uri: item.imgsrc}} style={styles.itemImage}/>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </Swiper>
            </View>
        )
    }

    bannerDetail(index) {
        let item = this.props.headerNews[index];
        //console.log(this.props.navigation);
        this.props.navigation.navigate('NewsDetail',
            {
              itemId: item.id,
              itemTitle: item.title
            });
    }
}

const styles = StyleSheet.create({
    bannerItem: {
        width: DevWidth,
    },
    itemImage: {
        width: DevWidth,
        height: DevWidth * 0.4,
    },
    container: {
        height: DevWidth * 0.4,
        width: DevWidth,
        marginBottom: 30,
    },
    text: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
