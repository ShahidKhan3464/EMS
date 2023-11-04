import React from 'react';
import moment from 'moment';
import { mainColor } from 'styles/global';
import { Document, Page, StyleSheet, View, Text, Font } from '@react-pdf/renderer';

import boldPoppins from 'assets/fonts/Poppins/Poppins-Bold.ttf';
import regularPoppins from 'assets/fonts/Poppins/Poppins-Regular.ttf';

Font.register({
    family: 'Poppins',
    fonts: [
        { src: boldPoppins, fontWeight: 'Bold' },
        { src: regularPoppins, fontWeight: 'Normal' },
    ]
})

const styles = StyleSheet.create({
    page: {
        width: '600px',
        padding: '10px',
        height: '400px',
    },

    title: {
        fontSize: '22px',
        fontWeight: 'Bold',
        fontStyle: 'normal',
        marginBottom: '5px',
        fontFamily: 'Poppins',
        color: `${mainColor}`,
    },

    table: {
        thead: {
            padding: '6px',
            display: 'flex',
            fontSize: '8px',
            color: '#FFFFFF',
            fontWeight: 'Bold',
            fontStyle: 'normal',
            flexDirection: 'row',
            fontFamily: 'Poppins',
            justifyContent: 'space-between',
            backgroundColor: `${mainColor}`,
        },

        tbody: {
            display: 'flex',
            padding: '0 6px',
            flexDirection: 'column',
            justifyContent: 'space-between',

            tr: {
                display: 'flex',
                padding: '6px 0',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: `1px solid #E0E0E0`,

                td: {
                    width: '10%',
                    fontSize: '8px',
                    fontStyle: 'normal',
                    fontWeight: 'Normal',
                    color: `${mainColor}`,
                    fontFamily: 'Poppins',
                }
            }
        }
    }
})

const Index = ({ data }) => {

    const getDateFormat = (dataStr) => {
        const originalDate = moment(dataStr)
        const formattedDate = originalDate.format("DD MMM YYYY hh.mm A")
        return formattedDate
    }

    return (
        <Document>
            <Page style={styles.page} >
                <Text style={styles.title}>Transactions</Text>

                <View style={styles.table}>
                    <View style={styles.table.thead}>
                        <View style={{ width: '10%' }}>
                            <Text>Transaction id</Text>
                        </View>
                        <View style={{ width: '12%' }}>
                            <Text>Customer name</Text>
                        </View>
                        <View style={{ width: '12%' }}>
                            <Text>Service provider</Text>
                        </View>
                        <View style={{ width: '15%' }}>
                            <Text>Advance payments</Text>
                        </View>
                        <View style={{ width: '10%' }}>
                            <Text>Price</Text>
                        </View>
                        <View style={{ width: '15%' }}>
                            <Text>Date & Time</Text>
                        </View>
                        <View style={{ width: '10%' }}>
                            <Text>Platform fee</Text>
                        </View>
                    </View>

                    <View style={styles.table.tbody}>
                        {data.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={styles.table.tbody.tr}
                                >
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{item.transactionId}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{item.customerName}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{item.providerName}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{item.advancePaymentPercentage}% advance</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>€{item.price}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{getDateFormat(item.date)}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>€{item.platformFee}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Index