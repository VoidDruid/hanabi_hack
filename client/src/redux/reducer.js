import {FETCH_PRLANGS_PENDING, FETCH_PRLANGS_SUCCESS, FETCH_PRLANGS_ERROR,
    FETCH_PRHISTORY_PENDING, FETCH_PRHISTORY_SUCCESS, FETCH_PRHISTORY_ERROR,
    FETCH_LANG_PRS_STATS_PENDING, FETCH_LANG_PRS_STATS_SUCCESS, FETCH_LANG_PRS_STATS_ERROR,
    FETCH_STARS_PENDING, FETCH_STARS_SUCCESS, FETCH_STARS_ERROR,
    FETCH_LANGS_COUNT_PENDING, FETCH_LANGS_COUNT_SUCCESS,FETCH_LANGS_COUNT_ERROR,
    FETCH_NEIGHBOURS_PENDING, FETCH_NEIGHBOURS_SUCCESS, FETCH_NEIGHBOURS_ERROR,
    FETCH_OFFERS_PENDING, FETCH_OFFERS_SUCCESS, FETCH_OFFERS_ERROR
} from "./actions";

const initialState = {
    pending: false,
    stats: {},
    neighbours: [],
    offers:[],
    error: null
}

export function statsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PRLANGS_PENDING: 
            return Object.assign({}, {
                ...state,
                pending: true
            });
        case FETCH_PRLANGS_SUCCESS:
            return Object.assign({}, {
                ...state,
                pending: false,   
            },Object.assign(state.stats, {PRLangs:action.stats})
            )
        case FETCH_PRLANGS_ERROR:
            return Object.assign({},{
                ...state,
                pending: false,
                error: action.error
            })
            case FETCH_PRHISTORY_PENDING: 
            return Object.assign({}, {
                ...state,
                pending: true
            });
        case FETCH_PRHISTORY_SUCCESS:
            return Object.assign({}, {
                ...state,
                pending: false,   
            },Object.assign(state.stats, {PRHistory:action.stats})
            )
        case FETCH_PRHISTORY_ERROR:
            return Object.assign({},{
                ...state,
                pending: false,
                error: action.error
            })
        case FETCH_LANG_PRS_STATS_PENDING: 
        return Object.assign({}, {
            ...state,
            pending: true
        });
        case FETCH_LANG_PRS_STATS_SUCCESS:
            return Object.assign({}, {
                ...state,
                pending: false,   
            },Object.assign(state.stats, {LangsPRsStats:action.stats})
            )
        case FETCH_LANG_PRS_STATS_ERROR:
            return Object.assign({},{
                ...state,
                pending: false,
                error: action.error
            })
            case FETCH_STARS_PENDING: 
            return Object.assign({}, {
                ...state,
                pending: true
            });
            case FETCH_STARS_SUCCESS:
                return Object.assign({}, {
                    ...state,
                    pending: false,   
                },Object.assign(state.stats, {Stars:action.stats})
                )
            case FETCH_STARS_ERROR:
                return Object.assign({},{
                    ...state,
                    pending: false,
                    error: action.error
                })
            case FETCH_LANGS_COUNT_PENDING: 
            return Object.assign({}, {
                ...state,
                pending: true
            });
            case FETCH_LANGS_COUNT_SUCCESS:
                return Object.assign({}, {
                    ...state,
                    pending: false,   
                },Object.assign(state.stats, {LangsRepoCount:action.stats})
                )
            case FETCH_LANGS_COUNT_ERROR:
                return Object.assign({},{
                    ...state,
                    pending: false,
                    error: action.error
                })
            case FETCH_NEIGHBOURS_PENDING: 
            return Object.assign({}, {
                ...state,
                pending: true
            });
            case FETCH_NEIGHBOURS_SUCCESS:
                return Object.assign({}, {
                    ...state,
                    pending: false,
                    
                }, {neighbours:action.neighbours})
            case FETCH_NEIGHBOURS_ERROR:
                return Object.assign({},{
                    ...state,
                    pending: false,
                    error: action.error
                })
                case FETCH_OFFERS_PENDING: 
                return Object.assign({}, {
                    ...state,
                    pending: true
                });
                case FETCH_OFFERS_SUCCESS:
                    return Object.assign({}, {
                        ...state,
                        pending: false,
                        
                    }, {offers:action.offers})
                case FETCH_OFFERS_ERROR:
                    return Object.assign({},{
                        ...state,
                        pending: false,
                        error: action.error
                    })
            
        default: 
            return state;
    }
}

export const getStats = state => state.stats;
export const getNeighbours = state => state.stats.neighbours;
export const getStatsPending = state => state.pending;
export const getStatsError = state => state.error;
export const getOffers = state => state.offers;