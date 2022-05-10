import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import { GetListing } from "../src/api/fetchListing";
import Loader from "../components/LoaderComponent";
import Icon from 'react-native-vector-icons/FontAwesome';

const ExporeScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [listings, setListings] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetListing()
            setListings(data.listings)
            setIsLoading(false)
        }
        fetchData()
    }, [])



    const Item = ({ listing }) => (
        <View style={{ ...styles.card }}>
            <View style={{ ...styles.item_horizontal }}>
                <View style={{ ...styles.item_container, minWidth: 50, marginRight: 20 }}>
                    {listing.offering ?
                        <View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0, 1)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                borderRadius: 5,
                                marginBottom: 5
                            }}>
                                <Text style={{ borderColor: "#000000" }}>Offering</Text>
                            </View>
                            <Text style={styles.title}>{listing.offering.name}</Text>
                            {listing.offering.author ? <Text style={styles.author}>{listing.offering.author.name}</Text> : <></>}
                        </View> :
                        <></>}
                </View>
                <View style={{ ...styles.item_container, margin: 0, padding: 0 }}>
                    <Icon name="chevron-left" size={20} color="#900"></Icon>
                    <Icon name="chevron-right" size={20} color="#900"></Icon>
                </View>
                <View style={{ ...styles.item_container, minWidth: 40, marginLeft: 0 }}>
                    {listing.demanding ?
                        <View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0, 1)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                borderRadius: 5,
                                marginBottom: 5
                            }}>
                                <Text style={{ borderColor: "#000000" }}>Demanding</Text>
                            </View>
                            <Text style={styles.title}>{listing.demanding.name}</Text>
                            {listing.demanding.author ? <Text>{listing.demanding.author.name}</Text> : <></>}
                        </View> :
                        <></>}
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: '#777777',
                    borderTopWidth: 1,
                    ...styles.item_container
                }}
            >
                <Text>{listing.listed_by.name}</Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (<View>
        <Item listing={item} />
    </View>
    );

    const listView = (
        <FlatList
            data={listings}
            renderItem={renderItem}
            keyExtractor={(item) => item.objectId}
        />
    )

    return (<>
        {isLoading ? <Loader /> : { ...listView }}
    </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item_horizontal: {
        padding: 10,
        margin: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontStyle: "italic"
    },
    author: {
        fontSize: 12,
        fontStyle: "italic"
    },
    item_container: {
        flex: 1
    },
    card: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
});


export default ExporeScreen