import { store } from 'redux/store';

export const getToken = () => {
    const state = store.getState()
    const { data } = state.authReducers.adminSignIn
    return data.token ?? null
}

export const dateFormatOptions = {
    hour12: false,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    timeZone: 'UTC',
    weekday: 'short',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
}

export const truncatedString = (str) => {
    const truncatedText = str?.length > 30 ? `${str.slice(0, 25)}...` : str
    return truncatedText
}

export const capitalizeFirstLetter = (str) => {
    return str?.charAt(0).toUpperCase() + str?.toLowerCase().substring(1)
}

export const getPricingOption = (option) => {
    if (option === 'PER_HOUR') {
        return '(Pricing per hour)'
    }

    else if (option === 'PER_CAPACITY') {
        return '(Pricing per capacity)'
    }

    else if (option === 'PER_EVENT') {
        return '(Pricing per event)'
    }
}

export const shortestFormatNumber = (number) => {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + "B";
    }
    else if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + "M";
    }
    else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + "K";
    }
    else {
        return number
    }
}

export const payloadData = {
    page: 1,
    pageSize: 5,
    condition: {},
    attributes: {},
    sortColumn: "id",
    order: { id: "DESC" },
}

export const graphOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    interaction: {
        padding: 15,
        boxWidth: 0,
        boxHeight: 0,
        mode: 'index',
        caretSize: 10,
        bodySpacing: 10,
        cornerRadius: 10,
        intersect: false,
        bodyAlign: 'right',
        bodyColor: '#C29137',
        titleMarginBottom: 10,
        titleColor: '#CFCFCF',
        backgroundColor: '#090D1F',
        titleFont: {
            size: 12,
            weight: 'normal',
            family: 'Poppins',
        },
        bodyFont: {
            size: 16,
            weight: 'bold',
            family: 'Poppins',
        },
        callbacks: {
            title: () => 'INCOME',
            label: (context) => {
                let label = context.dataset.label || ''
                if (label) {
                    label += ': '
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(context.parsed.y)
                }
                return label
            },
            afterBody: (context) => {
                const monthIndex = context[0].dataIndex
                if (monthIndex === 0) {
                    return []
                }
                else {
                    const tooltipItems = []
                    const currentIncome = context[0].parsed.y
                    const dataset = context[0].chart.data.datasets[0]
                    const expenses = dataset.data
                    const previousIncome = expenses[monthIndex - 1]
                    const profit = currentIncome - previousIncome
                    const profitPercentage = ((profit / previousIncome) * 100).toFixed(0)

                    if (profit > 0) {
                        if (previousIncome === 0) {
                            tooltipItems.push(`${profit}%`)
                        }
                        else {
                            tooltipItems.push(`+ ${profitPercentage}%`)
                        }
                    }
                    else if (profit < 0) {
                        tooltipItems.push(`${profitPercentage}%`)
                    }
                    // else {
                    //     tooltipItems.push(`${profitPercentage}%`)
                    // }
                    return tooltipItems
                }
            },
        }
    },
    scales: {
        y: {
            grid: { display: false },
            border: { display: false },
            ticks: {
                color: 'rgba(251, 251, 252, 0.5)',
                font: {
                    size: 12,
                    style: 'normal',
                    family: 'Poppins',
                },
            },
        },
        x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
                color: 'rgba(218, 219, 220, 0.5)',
                font: {
                    size: 12,
                    style: 'normal',
                    family: 'Poppins',
                },
            },
        },
    },
}

export const statusColors = {
    ACTIVE: {
        color: '#43B750',
        background: 'rgba(67, 183, 80, 0.20)',
    },
    INACTIVE: {
        color: '#FB4646',
        background: 'rgba(236, 60, 70, 0.15)',
    },
    AVAILABLE: {
        color: '#43B750',
        background: 'rgba(67, 183, 80, 0.20)',
    },
    UNAVAILABLE: {
        color: '#FB4646',
        background: 'rgba(236, 60, 70, 0.15)',
    },
    REFUNDED: {
        color: '#43B750',
        background: 'rgba(67, 183, 80, 0.20)',
    },
    COMPLETED: {
        color: '#43B750',
        background: 'rgba(67, 183, 80, 0.20)',
    },
    IN_PROGRESS: {
        color: '#43B750',
        background: 'rgba(67, 183, 80, 0.20)',
    },
    PENDING: {
        color: '#3576FB',
        background: 'rgba(53, 118, 251, 0.20)',
    },
    CLOSED: {
        color: '#F58700',
        background: 'rgba(245, 135, 0, 0.20)',
    },
    UPDATED: {
        color: '#43B750',
        background: 'rgba(67, 183, 80, 0.20)'
    }
}

export const cities = [
    'Bucharest',
    'Cluj-Napoca',
    'Timişoara',
    'Braşov',
    'Iaşi',
    'Constanţa',
    'Craiova',
    'Galaţi',
    'Ploieşti',
    'Oradea',
    'Brăila',
    'Arad',
    'Piteşti',
    'Sibiu',
    'Bacău',
    'Târgu-Mureş',
    'Baia Mare',
    'Buzău',
    'Botoşani',
    'Satu Mare',
    'Râmnicu Vâlcea',
    'Drobeta-Turnu Severin',
    'Suceava',
    'Piatra Neamţ',
    'Reşiţa',
    'Târgu Jiu',
    'Târgovişte',
    'Focşani',
    'Bistriţa',
    'Tulcea',
    'Slatina',
    'Călăraşi',
    'Alba Iulia',
    'Vaslui',
    'Giurgiu',
    'Deva',
    'Hunedoara',
    'Zalău',
    'Sfântu-Gheorghe',
    'Bârlad',
    'Popeşti-Leordeni',
    'Roman',
    'Turda',
    'Voluntari',
    'Media',
    'Slobozia',
    'Alexandria',
    'Miercurea-Ciuc',
    'Lugoj',
    'Bragadiru',
    'Medgidia',
    'Oneşti',
    'Sighetu Marmaţiei',
    'Petroşani',
    'Mangalia',
    'Tecuci',
    'Năvodari',
    'Odorheiu Secuiesc',
    'Râmnicu Sărat',
    'Paşcani',
    'Dej',
    'Reghin',
    'Câmpina',
    'Pantelimon',
    'Mioveni',
    'Câmpulung',
    'Caracal',
    'Săcele',
    'Făgăraş',
    'Feteşti',
    'Sighişoara',
    'Borşa',
    'Roşiori de Vede',
    'Curtea de Argeş',
    'Sebeş',
    'Huşi',
    'Fălticeni',
    'Olteniţa',
    'Turnu Măgurele',
    'Caransebeş',
    'Dorohoi',
    'Rădăuţi',
    'Vulcan',
    'Zărneşti',
    'Lupeni',
    'Aiud',
    'Petrila',
    'Cisnădie',
    'Câmpia Turzii',
    'Buftea',
    'Târnăveni',
    'Moineşti',
    'Otopeni',
    'Codlea',
    'Cugir',
    'Carei',
    'Gherla',
    'Scobinţi',
    'Blaj',
    'Floreşti',
    'Comăneşti',
    'Motru',
    'Târgu Neamţ',
    'Moreni',
    'Toflea',
    'Târgu Secuiesc',
    'Gheorgheni',
    'Orăştie',
    'Balş',
    'Băicoi',
    'Drăgăşani',
    'Salonta',
    'Băileşti',
    'Calafat',
    'Filiaşi',
    'Câmpulung Moldovenesc',
    'Corabia',
    'Adjud',
    'Breaza',
    'Râşnov',
    'Bocşa',
    'Marghita',
    'Baia-Sprie',
    'Vişeu de Sus',
    'Luduş',
    'Urziceni',
    'Vicovu de Sus',
    'Chitila',
    'Negreşti-Oaş',
    'Buhuşi',
    'Brad',
    'Vatra Dornei',
    'Măgurele',
    'Mizil',
    'Pucioasa',
    'Zimnicea',
    'Ovidiu',
    'Topliţa',
    'Gura Humorului',
    'Jimbolia',
    'Găeşti',
    'Dărmăneşti',
    'Ocna Mureş',
    'Bolintin Vale',
    'Avrig',
    'Pecica',
    'Simeria',
    'Sântana',
    'Valu lui Traian',
    'Moldova Nouă',
    'Cumpăna',
    'Sânnicolau Mare',
    'Jilava',
    'Dăbuleni',
    'Vălenii de Munte',
    'Comarnic',
    'Darabani',
    'Rovinari',
    'Scorniceşti',
    'Târgu Lăpuş',
    'Matca',
    'Săcueni',
    'Videle',
    'Oraviţa',
    'Mărăşeşti',
    'Târgu Ocna',
    'Călan',
    'Beclean',
    'Boldeşti-Scăeni',
    'Dolhasca',
    'Sângeorz-Băi',
    'Hârlău',
    'Drăgăneşti-Olt',
    'Cristuru Secuiesc',
    'Poiana Mare',
    'Beiuş',
    'Flămânzi',
    'Urlaţi',
    'Oţelu Roşu',
    'Strehaia',
    'Târgu Frumos',
    'Orşova',
    'Sinaia',
    'Jibou',
    'Sovata',
    'Costeşti',
    'Ianca',
    'Lipova',
    'Topoloveni',
    'Murfatlar',
    'Năsăud',
    'Nehoiu',
    'Pechea',
    'Covasna',
    'Poienile de sub Munte',
    'Aleşd',
    'Valea lui Mihai',
    'Haţeg',
    'Titu',
    'Liteni',
    'Podu Iloaiei',
    'Salcea',
    'Odobeşti',
    'Huedin',
    'Ineu',
    'Babadag',
    'Cajvana',
    'Seini',
    'Bumbeşti-Jiu',
    'Buşteni',
    'Sângeorgiu de Mureş',
    'Agnita',
    'Săbăoani',
    'Iernut',
    'Baraolt',
    'Tăşnad',
    'Bicaz',
    'Roznov',
    'Tăuţii Măgheruş',
    'Băbeni',
    'Negreşti',
    'Recaş',
    'Întorsura Buzăului',
    'Măcin',
    'Tomeşti',
    'Techirghiol',
    'Târgu Cărbuneşti',
    'Roşu',
    'Chişineu Criş',
    'Borcea',
    'Siret',
    'Mihăileşti',
    'Domneşti',
    'Prim Decembrie',
    'Budeşti',
    'Vlăhiţa',
    'Câmpeni',
    'Mogoşoaia',
    'Călimăneşti',
    'Fieni',
    'Modelu',
    'Dumbrăviţa',
    'Anina',
    'Chirnogi',
    'Curtici',
    'Nădlac',
    'Dumbrăveni',
    'Segarcea',
    'Amara',
    'Brăneşti',
    'Pătârlagele',
    'Pogoanele',
    'Ulmeni',
    'Turceni',
    'Cehu Silvaniei',
    'Ghimbav',
    'Murgeni',
    'Buziaş',
    'Ungheni',
    'Săveni',
    'Pâncota',
    'Sărmaşu',
    'Răcari',
    'Panciu',
    'Tălmaciu',
    'Fundulea',
    'Livada',
    'Făget',
    'Teiuş',
    'Lehliu-Gară',
    'Horezu',
    'Dancu',
    'Piatra Olt',
    'Bujor',
    'Baloteşti',
    'Deta',
    'Ardud',
    'Lunca Cetăţuii',
    'Dragalina',
    'Bălan',
    'Roseţi',
    'Cornetu',
    'Slănic',
    'Sebiş',
    'Berceni',
    'Săvineşti',
    'Frasin',
    'Gătaia',
    'Potcoava',
    'Fundeni',
    'Giroc',
    'Curcani',
    'Miercurea Nirajului',
    'Glina',
    'Copşa Mică',
    'Sâncraiu de Mureş',
    'Baia de Aramă',
    'Vânju-Mare',
    'Geoagiu',
    'Dobroeşti',
    'Rupea',
    'Abrud',
    'Isaccea',
    'Băile Herculane',
    'Tunari',
    'Milişăuţi',
    'Valea Lupului',
    'Cavnic',
    'Fierbinţi-Târg',
    'Ulmeni',
    'Volovăţ',
    'Săliştea de Sus',
    'Bălceşti',
    'Agigea',
    'Berbeşti',
    'Cernele',
    'Bucov',
    'Predeal',
    'Cristeşti',
    'Clinceni',
    'Başcov',
    'Ghiroda',
    'Doiceşti',
    'Chiajna',
    'Azuga',
    'Voitinel',
    'Aninoasa',
    'Bechet',
    'Valea Mare-Podgoria',
    'Floreşti',
    'Victoria',
    'Bucecea',
    'Ciocăneşti',
    'Cenad',
    'Slănic-Moldova',
    'Perişoru',
    'Ungheni-Prut',
    'Pleaşa',
    'Baia de Arieş',
    'Fundeni',
    'Ciorogârla',
    'Miercurea Sibiului',
    'Radovanu',
    'Sfântu Ilie',
    'Gălbinaşi',
    'Ipoteşti',
    'Dor Mărunt',
    'Blejoiu',
    'Pârcovaci',
    'Făurei',
    'Vasilaţi',
    'Mânăstirea',
    'Ocna Sibiului',
    'Cornu de Jos',
    'Mărgineni',
    'Sântana de Mureş',
    'Adjudeni',
    'Chiselet',
    'Ocnele Mari',
    'Căpăţâneşti',
    'Căzăneşti',
    'Mărăcineni',
    'Bărcăneşti',
    'Ploeştiori',
    'Dragomireşti',
    'Malu Spart',
    'Brăneşti',
    'Cernica',
    'Copăcenii de Jos',
    'Tânganu',
    'Băneşti',
    'Tămăşeni',
    'Dărăşti-Ilfov',
    'Iazu',
    'Tătărani',
    'Goranu',
    'Mărăcineni',
    'Braniştea',
    'Buciumeni',
    'Fântânele',
    'Frumuşani',
    'Bereşti-Târg',
    'Bălăceanca',
    'Două Mai',
    'Căţelu',
    'Palanca',
    'Stancea',
    'Holboca',
    'Dragomireşti-Deal',
    'Nana',
    'Rasova',
    'Gârcina',
    'Filipeştii de Târg',
    'Decindeni',
    'Teiş',
    'Corbeanca',
    'Viforâta',
    'Băile Govora',
    'Bogdan Vodă',
    'Solca',
    'Ciurea',
    'Răzvani',
    'Aninoasa',
    'Cojasca',
    'Vaşcău',
    'Luna de Sus',
    'Maxut',
    'Valea Roşie',
    'Dârvari',
    'Malu Alb',
    'Crivăţ',
    'Miroslava',
    'Tonea',
    'Unirea',
    'Cuza Vodă',
    'Nucet',
    'Lipăneşti',
    'Urleta',
    'Grădiştea',
    'Dragomireşti',
    'Independenţa',
    'Asău',
    'Stoeneşti',
    'Nazna',
    'Valea Râmnicului',
    'Tamaşi',
    'Remuş',
    'Săsar',
    'Râncăciov',
    'Potoceni',
    'Cornetu',
    'Româneşti',
    'Lipia',
    'Argeşelu',
    'Jegălia',
    'Sohatu',
    'Căscioarele',
    'Mislea',
    'Colibaşi',
    'Olteni',
    'Lehliu',
    'Măneuţi',
    'Sântion',
    'Dorolţ',
    'Dudu',
    'Racoviţa',
    'Plătăreşti',
    'Bogata',
    'Luica',
    'Săruleşti-Gară',
    'Băile Tuşnad',
    'Ostratu',
    'Lazu',
    'Dorobanţu',
    'Islaz',
    'Plopeni',
    'Dragomireşti-Vale',
    'Lunga',
    'Vlad Ţepeş',
    'Sânleani',
    'Lieşti',
    'Săteni',
    'Moţăeni',
    'Săftica',
    'Valea Argovei',
    'Bucovăţ',
    'Mitreni',
    'Dedrad',
    'Valea Vişeului',
    'Adjudu Vechi',
    'Corlăteşti',
    'Breazu',
    'Nicolae Bălcescu',
    'Aghireş',
    'Piteasca',
    'Gâldău',
    'Radu Vodă',
    'Ighişu Nou',
    'Pasărea',
    'Odăile',
    'Progresu',
    'Vânători',
    'Teliucu Inferior',
    'Cristur',
    'Feteşti',
    'Dumbrava',
    'Drajna Nouă',
    'Goruni',
    'Hăghiac',
    'Nicolae Bălcescu',
    'Dorobanţu',
    'Ulmi',
    'Vâlcelele',
    'Ceacu',
    'Uiasca',
    'Dâmbovicioara',
    'Chiţorani',
    'Sălcioara',
    'Izvoarele',
    'Cătina',
    'Rasa',
    'Traian',
    'Căldăraru',
    'Budeasa Mare',
    'Aprozi',
    'Straja',
    'Peştişu Mare',
    'Valea Mare-Pravăţ',
    'Ocina de Sus',
    'Valea Mare',
    'Chicerea',
    'Negoeşti',
    'Belciugatele',
    'Bughea de Jos',
    'Scobâlţeni',
    'Tămădău Mare',
    'Vălureni',
    'Alexandru Odobescu',
    'Cornu de Sus',
    'Sultana',
    'Glâmbocu',
    'Curteni',
    'Bobolia',
    'Sălcuţa',
    'Valea Stânii',
    'Poiana Copăceni',
    'Vărăşti',
    'Ileana',
]

export const locations = cities.map(city => {
    return {
        text: city,
        value: city.toLowerCase()
    }
})