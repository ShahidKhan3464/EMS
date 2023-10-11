import React from 'react';
import moment from 'moment';
import { lightGrey, mainColor } from 'styles/global';
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
        height: '400px',
        backgroundColor: '#2C2C2C',
    },

    header: {
        padding: '5px 40px',
        backgroundColor: '#514C42',

        logo: {
            gap: '5px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',

            logoImage: {
                width: '30px',
                height: '40px'
            },

            text: {
                fontSize: '28px',
                fontWeight: 'Bold',
                fontStyle: 'normal',
                color: `${mainColor}`,
                fontFamily: 'Poppins',
            }
        }
    },

    content: {
        backgroundColor: '#2C2C2C',

        body: {
            padding: '5px 40px',

            heading: {
                fontSize: '28px',
                fontWeight: 'Bold',
                textAlign: 'center',
                fontStyle: 'normal',
                color: `${lightGrey}`,
                fontFamily: 'Poppins',
            },

            amount: {
                fontSize: '40px',
                fontWeight: 'Bold',
                textAlign: 'center',
                fontStyle: 'normal',
                marginBottom: '5px',
                color: `${mainColor}`,
                fontFamily: 'Poppins',
            },

            trscHistory: {
                todayDate: {
                    display: 'flex',
                    paddingTop: '10px',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    value: {
                        fontSize: '12px',
                        color: '#C2C2C3',
                        fontStyle: 'normal',
                        fontWeight: 'Normal',
                        fontFamily: 'Poppins',
                    }
                },

                detail: {
                    gap: '10px',
                    display: 'flex',
                    padding: '10px 0',
                    flexDirection: 'column',
                    borderTop: `1px solid ${mainColor}`,
                    borderBottom: `1px solid ${mainColor}`,

                    layout: {
                        gap: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        key: {
                            width: '50%',
                            fontSize: '12px',
                            color: '#C2C2C3',
                            fontStyle: 'normal',
                            fontWeight: 'Normal',
                            fontFamily: 'Poppins',
                        },

                        value: {
                            width: '50%',
                            color: '#F2F3F4',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 'Normal',
                            fontFamily: 'Poppins',
                        }
                    },
                },

                advancePayment: {
                    gap: '10px',
                    display: 'flex',
                    padding: '10px 0',
                    flexDirection: 'column',
                    borderBottom: `1px solid ${mainColor}`,

                    layout: {
                        gap: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        key: {
                            width: '50%',
                            fontSize: '12px',
                            color: '#C2C2C3',
                            fontStyle: 'normal',
                            fontWeight: 'Normal',
                            fontFamily: 'Poppins',
                        },

                        value: {
                            width: '50%',
                            color: '#F2F3F4',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 'Normal',
                            fontFamily: 'Poppins',
                        }
                    },
                }
            }
        },

        footer: {
            text: {
                color: '#F2F3F4',
                fontSize: '14px',
                textAlign: 'center',
                fontStyle: 'normal',
                fontWeight: 'Normal',
                fontFamily: 'Poppins',
            }
        }
    }
})

const Index = ({ data }) => {

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.header.logo}>
                        {/* <Image source={svgLogo} style={styles.header.logo.logoImage} alt="logo" /> */}
                        <Text style={styles.header.logo.text}>Be ArtEvent</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.content.body}>
                        <Text style={styles.content.body.heading}>Transaction receipt</Text>
                        <Text style={styles.content.body.amount}>€100</Text>

                        <View style={styles.content.body.trscHistory}>
                            <View style={styles.content.body.trscHistory.detail}>
                                <View style={styles.content.body.trscHistory.detail.layout}>
                                    <Text style={styles.content.body.trscHistory.detail.layout.key}>Transaction id</Text>
                                    <Text style={styles.content.body.trscHistory.detail.layout.value}>{data.id}</Text>
                                </View>

                                <View style={styles.content.body.trscHistory.detail.layout}>
                                    <Text style={styles.content.body.trscHistory.detail.layout.key}>Service provider name</Text>
                                    <Text style={styles.content.body.trscHistory.detail.layout.value}>{data.serPro}</Text>
                                </View>

                                <View style={styles.content.body.trscHistory.detail.layout}>
                                    <Text style={styles.content.body.trscHistory.detail.layout.key}>Service name</Text>
                                    <Text style={styles.content.body.trscHistory.detail.layout.value}>Musicholic</Text>
                                </View>

                                <View style={styles.content.body.trscHistory.detail.layout}>
                                    <Text style={styles.content.body.trscHistory.detail.layout.key}>Customer name</Text>
                                    <Text style={styles.content.body.trscHistory.detail.layout.value}>{data.name}</Text>
                                </View>

                                <View style={styles.content.body.trscHistory.detail.layout}>
                                    <Text style={styles.content.body.trscHistory.detail.layout.key}>Date</Text>
                                    <Text style={styles.content.body.trscHistory.detail.layout.value}>{moment(data?.date).format('DD MMM YYYY')}</Text>
                                </View>

                                <View style={styles.content.body.trscHistory.detail.layout}>
                                    <Text style={styles.content.body.trscHistory.detail.layout.key}>Time</Text>
                                    <Text style={styles.content.body.trscHistory.detail.layout.value}>{moment(data?.date, 'HH:mm').format('hh:mm A')}</Text>
                                </View>
                            </View>

                            <View style={styles.content.body.trscHistory.advancePayment}>
                                <View style={styles.content.body.trscHistory.advancePayment.layout}>
                                    <Text style={styles.content.body.trscHistory.advancePayment.layout.key}>Advance payment</Text>
                                    <Text style={styles.content.body.trscHistory.advancePayment.layout.value}>5% ($15)</Text>
                                </View>
                                <View style={styles.content.body.trscHistory.advancePayment.layout}>
                                    <Text style={styles.content.body.trscHistory.advancePayment.layout.key}>Platform received amount</Text>
                                    <Text style={styles.content.body.trscHistory.advancePayment.layout.value}>$10</Text>
                                </View>
                            </View>

                            <View style={styles.content.body.trscHistory.todayDate}>
                                <Text style={styles.content.body.trscHistory.todayDate.value}>{moment().format('DD MMM YYYY')}</Text>
                                <Text style={styles.content.body.trscHistory.todayDate.value}>{moment().format('h:mm A')}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.content.footer}>
                        <Text style={styles.content.footer.text}>© 2023 TIRminator. All right reserved</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Index