export const FETCH_PRLANGS_PENDING = 'FETCH_PRLANGS_PENDING';
export const FETCH_PRLANGS_SUCCESS = 'FETCH_PRLANGS_SUCCESS';
export const FETCH_PRLANGS_ERROR = 'FETCH_PRLANGS_ERROR';
export const FETCH_PRHISTORY_PENDING = 'FETCH_PRHISTORY_PENDING';
export const FETCH_PRHISTORY_SUCCESS = 'FETCH_PRHISTORY_SUCCESS';
export const FETCH_PRHISTORY_ERROR = 'FETCH_PRHISTORY_ERROR';
export const FETCH_LANG_PRS_STATS_PENDING = 'FETCH_LANG_PRS_STATS_PENDING';
export const FETCH_LANG_PRS_STATS_SUCCESS = 'FETCH_LANG_PRS_STATS_SUCCESS';
export const FETCH_LANG_PRS_STATS_ERROR = 'FETCH_LANG_PRS_STATS_ERROR';
export const FETCH_STARS_PENDING = 'FETCH_STARS_PENDING';
export const FETCH_STARS_SUCCESS = 'FETCH_STARS_SUCCESS';
export const FETCH_STARS_ERROR = 'FETCH_STARS_ERROR';
export const FETCH_LANGS_COUNT_PENDING = 'FETCH_LANGS_COUNT_PENDING';
export const FETCH_LANGS_COUNT_SUCCESS = 'FETCH_LANGS_COUNT_SUCCESS';
export const FETCH_LANGS_COUNT_ERROR = 'FETCH_LANGS_COUNT_ERROR';
export const FETCH_NEIGHBOURS_PENDING = 'FETCH_NEIGHBOURS_PENDING';
export const FETCH_NEIGHBOURS_SUCCESS = 'FETCH_NEIGHBOURS_SUCCESS';
export const FETCH_NEIGHBOURS_ERROR = 'FETCH_NEIGHBOURS_ERROR';
export const FETCH_OFFERS_PENDING = 'FETCH_OFFERS_PENDING';
export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_ERROR = 'FETCH_OFFERS_ERROR';
export function fetchPRLangsPending() {
    return {
        type: FETCH_PRLANGS_PENDING
    }
}
export function fetchPRHistoryPending() {
    return {
        type: FETCH_PRHISTORY_PENDING
    }
}

export function fetchPRLangsSuccess(stats) {
    return {
        type: FETCH_PRLANGS_SUCCESS,
        stats: stats
    }
}
export function fetchPRHistorySuccess(stats) {
    return {
        type: FETCH_PRHISTORY_SUCCESS,
        stats: stats
    }
}

export function fetchPRLangsError(error) {
    return {
        type: FETCH_PRLANGS_ERROR,
        error: error
    }
}
export function fetchPRHistoryError(error) {
    return {
        type: FETCH_PRHISTORY_ERROR,
        error: error
    }
}
export function fetchLangPrsStatsPending(){
    return {
        type: FETCH_LANG_PRS_STATS_PENDING
    }
}
export function fetchLangPrsStatsSuccess(stats){
    return {
        type: FETCH_LANG_PRS_STATS_SUCCESS,
        stats: stats
    }
}
export function fetchLangPrsStatsError(error){
    return {
        type: FETCH_LANG_PRS_STATS_ERROR,
        error: error
    }

}
export function fetchStarsPending(){
    return {
        type: FETCH_STARS_PENDING
    }
}
export function fetchStarsSuccess(stats){
    return {
        type: FETCH_STARS_SUCCESS,
        stats: stats
    }
}
export function fetchStarsError(error){
    return {
        type: FETCH_STARS_ERROR,
        error: error
    }

}
export function fetchLangsCountPending(){
    return {
        type: FETCH_LANGS_COUNT_PENDING
    }
}
export function fetchLangsCountSuccess(stats){
    return {
        type: FETCH_LANGS_COUNT_SUCCESS,
        stats: stats
    }
}
export function fetchLangsCountError(error){
    return {
        type: FETCH_LANGS_COUNT_ERROR,
        error: error
    }

}
export function fetchNeighboursPending(){
    return {
        type: FETCH_NEIGHBOURS_PENDING
    }
}
export function fetchNeighboursSuccess(neighbours){
    return {
        type: FETCH_NEIGHBOURS_SUCCESS,
        neighbours: neighbours
    }
}
export function fetchNeighboursError(error){
    return {
        type: FETCH_NEIGHBOURS_ERROR,
        error: error
    }

}
export function fetchOffersPending(){
    return {
        type: FETCH_OFFERS_PENDING
    }
}
export function fetchOffersSuccess(offers){
    return {
        type: FETCH_OFFERS_SUCCESS,
        offers: offers
    }
}
export function fetchOffersError(error){
    return {
        type: FETCH_OFFERS_ERROR,
        error: error
    }

}