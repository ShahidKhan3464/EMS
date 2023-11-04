import { combineReducers } from "redux";
import authReducers from "./auth/reducers";
import helpReducers from "./help/reducers";
import profileReducers from "./profile/reducers";
import reportsReducers from "./reports/reducers";
import servicesReducers from "./services/reducers";
import bookingsReducers from "./bookings/reducers";
import customersReducers from "./customers/reducers";
import priceGuideReducers from "./priceGuide/reducers";
import cardCounterReducers from "./cardsCounter/reducers";
import transactionsReducers from "./transactions/reducers";
import notificationsReducers from "./notifications/reducers";
import serviceProvidersReducers from "./serviceProviders/reducers";

const rootReducer = combineReducers({
    authReducers: authReducers,
    helpReducers: helpReducers,
    reportsReducers: reportsReducers,
    profileReducers: profileReducers,
    bookingsReducers: bookingsReducers,
    servicesReducers: servicesReducers,
    customersReducers: customersReducers,
    priceGuideReducers: priceGuideReducers,
    cardCounterReducers: cardCounterReducers,
    transactionsReducers: transactionsReducers,
    notificationsReducers: notificationsReducers,
    serviceProvidersReducers: serviceProvidersReducers,
})

export default rootReducer